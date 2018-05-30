from flask import request, redirect, url_for, jsonify

from backend.beedare import db
from backend.beedare.models import User
from . import *


@auth_blueprint.route('/login', methods=["GET"])
def login_new():
    return jsonify({}), 200


@auth_blueprint.route('/login/<username>/<password>', methods=['GET', 'POST'])
def login(username, password):
    error = None
    if request.method == 'POST':
        result = db.session.query(User).filter_by(username=username).first()
        if result is not None:
            if result.password == password:
                # TODO is this right?
                db.session.clear()
                db.session['id'] = result.id
                # TODO return JSON?
                return redirect(url_for('/profile/user'))
            else:
                error = "Password incorrect"
        return jsonify({"error": error}), 401
    return jsonify({}), 401


@auth_blueprint.route('/register', methods=["GET"])
def register_new():
    return jsonify({}), 200


@auth_blueprint.route('/register/<firstname>/<lastname>/<email>/<password>/<username>', methods=['POST'])
def register(firstname, lastname, email, password, username):
    result = db.session.query(User).filter_by(email=email).first()
    if result is not None:
        error = "Email already registered."
        return jsonify({"error": error}), 401
    else:
        user = User()
        user.first_name = firstname
        user.last_name = lastname
        user.password = password
        user.email = email
        user.username = username
        db.session.add(user)
        db.session.commit()
        return jsonify({
            "first_name": firstname,
            "last_name": lastname,
            "password": password,
            "email": email,
            "username": username
        }), 200


@auth_blueprint.route('/logout', methods=["GET"])
def logout():
    db.session.clear()
    redirect(url_for('/login'))
