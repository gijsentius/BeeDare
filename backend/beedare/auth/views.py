import datetime

import sqlalchemy
from flask import request, redirect, url_for, jsonify, flash
from flask_login import logout_user, current_user

from beedare import db
from beedare.models import User
from . import *


@auth_blueprint.route('/login', methods=["GET"])
def login_new():
    return jsonify({}), 200


@auth_blueprint.route('/login', methods=['POST'])
def login():
    content = request.get_json()
    time = datetime.datetime.utcnow()
    try:
        result = db.session.query(User).filter_by(username=content['username']).first()
    except KeyError as e:
        return jsonify({"error": str(e) + " not given or invalid"}), 401
    if result is not None:
        if result.username == content['username']:
            # TODO password
            result.last_seen = time
            db.session.commit()
            return jsonify({"state": "succes"})
    else:
        return jsonify({"error": "Password incorrect"}), 401


@auth_blueprint.route('/register', methods=["GET"])
def register_new():
    return jsonify({}), 200


@auth_blueprint.route('/register', methods=['POST'])
def register():
    content = request.get_json()
    try:
        result = db.session.query(User).filter_by(email=content['email']).first()
    except KeyError as e:
        return jsonify({"error": str(e) + " not given or invalid"}), 401
    if result is not None:
        error = "Email already registered."
        return jsonify({"error": error}), 401
    else:
        try:
            # TODO password
            time = datetime.datetime.utcnow()
            user = User(first_name=content['firstname'], last_name=content['lastname'], email=content['email'],
                        username=content['username'], score=0, age_cat=content['age_cat'], location=content['location'],
                        image=['image'], last_seen=time, rank='New Bee')
        except KeyError as e:
            return jsonify({"error": str(e) + " not given or invalid"}), 401
        db.session.add(user)
        try:
            db.session.commit()
        except sqlalchemy.exc.IntegrityError:
            return jsonify({"error": "commit failed"}), 401
        return jsonify({
            "first_name": content['firstname'],
            "last_name": content['lastname'],
            "email": content['email'],
            "username": content['username'],
            "image": content['image'],
            "location": content['location'],
            "last_seen": time
        }), 200


@auth_blueprint.route('/logout')
def logout():
    logout_user()
    return jsonify({
        "logout": True
    }), 200


@auth_blueprint.route('/unconfirmed', methods=["GET"])
def unconfirmed():
    result = db.session.query(User)
    if result.is_anonymous or result.confirmed:
        return redirect(url_for('login'))
    return jsonify({
        "error": "Account not confirmed. Please confirm your account by mail."
    }), 401


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
