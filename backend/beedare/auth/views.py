from flask import request, redirect, url_for, jsonify

from backend.beedare import db
from backend.beedare.models import User
from . import *


@auth_blueprint.route('/login', methods=["GET"])
def login_new():
    return jsonify({}), 200


@auth_blueprint.route('/login', methods=['POST'])
def login():
    content = request.get_json()
    try:
        result = db.session.query(User).filter_by(username=content['username']).first()
    except KeyError as e:
        return jsonify({"error": str(e) + " not given or invalid"}), 401
    if result is not None:
        if result.username == content['username']:
            # TODO password
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
            user = User(first_name=content['firstname'], last_name=content['lastname'], email=content['email'], username=content['username'], score=0)
        except KeyError as e:
            return jsonify({"error": str(e) + " not given or invalid"}), 401
        db.session.add(user)
        db.session.commit()
        return jsonify({
            "first_name": content['firstname'],
            "last_name": content['lastname'],
            "email": content['email'],
            "username": content['username']
        }), 200


@auth_blueprint.route('/logout', methods=["GET"])
def logout():
    # TODO Steve plz fix
    db.session.clear()
    redirect(url_for('login'))
