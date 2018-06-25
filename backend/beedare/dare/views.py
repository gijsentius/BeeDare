from beedare.dare import dares_blueprint
from flask import jsonify, request
from . import *
from beedare.models import Dare, User, UserDares
from beedare import db
import sqlalchemy


@dares_blueprint.route('/', methods=["GET"])
def show_dares():
    try:
        result = db.session.query(Dare).all()
    except KeyError as e:
        return jsonify({"error": str(e) + " not given or invalid"}), 401
    if result is not None:
        list = []
        for item in result:
            list.append(
            {
                "name": item.name,
                "id": item.id,
                "images": item.image,
                "body": item.body,
                "body_html": item.body_html,
                "value": item.value

            })
        return jsonify(
            list
        ), 200
    return jsonify({}), 401

@dares_blueprint.route('/delete/<dareid>')
def delete_dare(dareid):
    try:
        dare = Dare.query.filter_by(id=dareid).first()
    except KeyError as e:
        return jsonify({"error": str(e) + " not given or invalid"}), 401
    if dare is not None:
        db.session.delete(dare)
        db.session.commit()
        return jsonify(
            {"result": "It worked! Dare is deleted"}
        ), 200
    return jsonify({}), 401


@dares_blueprint.route('/opendares/<username>/<token>', methods=["GET"])
def openDaresUser(username, token):
    try:
        user_data = db.session.query(User).filter_by(username=username).first()
    except KeyError as e:
        return jsonify({"error": str(e) + " not given or invalid"}), 401
    if request.method == "GET" and user_data.check_loginrequired(token):
        open_dares_list = []
        try:
            user_dares = UserDares.query.filter_by(owner_id=user_data.id).all()
            for opendare in user_dares:
                dare = Dare.query.filter_by(id=opendare.id).first()
                open_dares_list.append({
                    "name": dare.name,
                    "id": dare.id,
                    "images": dare.image,
                    "body": dare.body,
                    "body_html": dare.body_html,
                    "value": dare.value
                })
        except KeyError as e:
            return jsonify({"error": str(e) + " not given or invalid"}), 401
        return jsonify(
            open_dares_list
        ), 200
    return jsonify({}), 401


@dares_blueprint.route('/accept/<dareid>/<username>/<token>', methods=["GET"])
def accept_dare(dareid, username, token):
    try:
        user_data = User.query.filter_by(username=username).first()
    except KeyError as e:
        return jsonify({"error": str(e) + " not given or invalid"}), 401
    if request.method == "GET" and user_data.check_loginrequired(token):
        try:
            user_dare = UserDares(id=dareid, owner_id=user_data.id, achieved=False)
        except KeyError as e:
            return jsonify({"error": str(e) + " not given or invalid"}), 401
        if user_dare is not None:
            db.session.add(user_dare)
            db.session.commit()
            return jsonify(
                {"result": "It worked! Dare is accepted"}
            ), 200
    return jsonify({}), 401
