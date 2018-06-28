import datetime

import sqlalchemy
from flask import request, redirect, url_for, jsonify, flash
from flask_login import logout_user, login_user, login_required, current_user

from beedare import db
from beedare.models import User

from beedare import login_manager
from . import *


@auth_blueprint.route('/login', methods=['POST'])
def login():
    content = request.form
    try:
        email = content['email']
        password = content['password']
        user = db.session.query(User).filter_by(email=email).first()
    except KeyError as e:
        return jsonify({"error": str(e) + " not given or invalid"}), 401
    if user is not None and user.check_password(password):
            login_user(user)
            user.ping()
            token = user.generate_loginrequired_token()
            next = request.args.get('next')
            return jsonify({"login": True,
                         "username": user.username, "Succes?": "Oui", "token": token})
    else:
        return jsonify({"login": False,
                        "username": "NotLoggedIn", "Succes?": "Non"}), 401


@auth_blueprint.route('/logout/<username>/<token>', methods=['GET'])
def logout(username, token):
    try:
        user = db.session.query(User).filter_by(username=username).first()
    except KeyError as e:
        return jsonify({"error": str(e) + " not given or invalid"}), 401
    if user.check_loginrequired(token):
        logout_user()
        return jsonify({
            "username": "NotLoggedIn",
            "login": False,
            "Succes?": "Oui",
        }), 200
    else:
        return jsonify({"error": "not correct user detected"}), 401


@auth_blueprint.route('/register', methods=["GET"])
def register_new():
    return jsonify({}), 200


@auth_blueprint.route('/register', methods=['POST'])
def register():
    content = request.form
    message = checkFormsInput(content)
    if not message:
        try:
            time = datetime.datetime.utcnow()
            user = User(first_name=content['firstname'], last_name=content['lastname'], email=content['email'],
                        username=content['username'], score=0, image='noneexistent',
                        last_seen=time, rank='New Bee')
            user.set_password(content['password'])
        except KeyError as e:
            return jsonify(message), 401
        db.session.add(user)
        try:
            db.session.commit()
            message.append({"message": "Succes!"})
        except sqlalchemy.exc.IntegrityError:
            return jsonify(message), 401
    return jsonify(
        message
    ), 200


@auth_blueprint.route('/unconfirmed', methods=["GET"])
def unconfirmed():
    result = db.session.query(User)
    if result.is_anonymous or result.confirmed:
        return redirect(url_for('login'))
    return jsonify({
        "error": "Account not confirmed. Please confirm your account by mail."
    }), 401


# LET OP!!!!!!!!!! current_user kunnen wij niet gebruiken want REST is stateless
@auth_blueprint.route('/confirm/<token>')
def confirm(token):
    if current_user.confirmed:
        return redirect(url_for('core.index'))
    if current_user.check_confirmation(token):
        current_user.confirm()
        try:
            db.session.commit()
        except sqlalchemy.exc.IntegrityError:
            return jsonify({"error": "commit failed"}), 401
        flash('You have confirmed your account. Thanks!')
    else:
        flash('The confirmation link is invalid or has expired.')
    return redirect(url_for('core.index'))


def checkFormsInput(formcontent):
    message = []
    if formcontent['email'] is "":
        message.append({"message": "No email filled in!"})
    if formcontent['password'] is "":
        message.append({"message": "No password filled in!"})
    if formcontent['confirmpassword'] is "":
        message.append({"message": "No confirm password filled in!"})
    if formcontent['username'] is "":
        message.append({"message": "No username filled in!"})
    if formcontent['firstname'] is "":
        message.append({"message": "No firstname filled in!"})
    if formcontent['lastname'] is "":
        message.append({"message": "No lastname filled in!"})
    if formcontent['password'] != formcontent['confirmpassword']:
        message.append({"message": "Password and confirmpassword are not the same!"})
    try:
        result = db.session.query(User).filter_by(email=formcontent['email']).first()
    except KeyError as e:
        return jsonify({"error": str(e) + " not given or invalid"}), 401
    if result is not None:
        error = "Email already registered."
        message.append({"message": error})
    try:
        username = db.session.query(User).filter_by(email=formcontent['username']).first()
    except KeyError as e:
        return jsonify({"error": str(e) + " not given or invalid"}), 401
    if username is not None:
        error = "Username already in use"
        message.append({"message": error})
    message.append({"test": "test"})
    return message

