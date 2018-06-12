from flask import request, redirect, url_for, jsonify

from beedare import db
from beedare.models import User
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
            #db.session.clear()
            #db.session['id'] = result.id
            # TODO return redirect
            #return redirect(url_for("profile.user"), code=200)
            return jsonify({"state": "succes"})
    else:
        error = "Password incorrect"
    return jsonify({"error": error}), 401


@auth_blueprint.route('/register', methods=["GET"])
def register_new():
    return jsonify({}), 200


@auth_blueprint.route('/register/<firstname>/<lastname>/<email>/<username>', methods=['POST'])
def register(firstname, lastname, email,  username):
    result = db.session.query(User).filter_by(email=email).first()
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


@auth_blueprint.route('/logout', methods=["GET"])
def logout():
    db.session.clear()
    redirect(url_for('login'))
