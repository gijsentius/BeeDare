from flask import request, redirect, url_for, jsonify, flash
from flask_login import *

from backend.beedare import db
from backend.beedare.models import User
from . import *


@auth_blueprint.route('/login', methods=["GET"])
def login_new():
    return jsonify({}), 200


@auth_blueprint.route('/login/<username>/<password>', methods=['POST'])
def login(username, password):
    error = None
    result = db.session.query(User).filter_by(username=username).first()
    if result is not None:
        # TODO fix hash for password
        if result.username == username:
            # TODO is this right?
            # db.session.clear()
            # db.session['id'] = result.id
            # TODO return redirect
            # return redirect(url_for("profile.user"), code=200)
            return jsonify({"state": "succes"})
    else:
        error = "Password incorrect"
    return jsonify({"error": error}), 401


@auth_blueprint.route('/register', methods=["GET"])
def register_new():
    return jsonify({}), 200


@auth_blueprint.route('/register/<firstname>/<lastname>/<email>/<username>', methods=['POST'])
def register(firstname, lastname, email, username):
    result = db.session.query(User).filter_by(email=email)
    if result is not None:
        error = "Email already registered."
        return jsonify({"error": error}), 401
    else:
        user = User(first_name=firstname, last_name=lastname, email=email, username=username)
        db.session.add(user)
        db.session.commit()
        return jsonify({
            "first_name": firstname,
            "last_name": lastname,
            "email": email,
            "username": username
        }), 200


@auth_blueprint.route('/logout')
@login_required
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
@login_required
def confirm(token):
    if current_user.confirmed:
        return redirect(url_for('core.index'))
    if current_user.check_confirmation(token):
        current_user.confirm()
        db.session.commit()
        flash('You have confirmed your account. Thanks!')
    else:
        flash('The confirmation link is invalid or has expired.')
    return redirect(url_for('core.index'))
