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


@dares_blueprint.route('/completeddares/<username>/<token>', methods=["GET"])
def completed_user_dares(username, token):
    try:
        user_data = db.session.query(User).filter_by(username=username).first()
    except KeyError as e:
        return jsonify({"error": str(e) + " not given or invalid"}), 401
    if request.method == "GET" and user_data.check_loginrequired(token):
        completed_dares_list = []
        try:
            user_dares = UserDares.query.filter_by(owner_id=user_data.id, achieved=True).all()
            for completedare in user_dares:
                dare = Dare.query.filter_by(id=completedare.id).first()
                if dare is not None:
                    completed_dares_list.append({
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
            completed_dares_list
        ), 200
    return jsonify({}), 401


@dares_blueprint.route('/opendares/<username>/<token>', methods=["GET"])
def open_dares_user(username, token):
    try:
        user_data = db.session.query(User).filter_by(username=username).first()
    except KeyError as e:
        return jsonify({"error": str(e) + " not given or invalid"}), 401
    if request.method == "GET" and user_data.check_loginrequired(token):
        open_dares_list = []
        try:
            user_dares = UserDares.query.filter_by(owner_id=user_data.id, achieved=False).all()
            for opendare in user_dares:
                dare = Dare.query.filter_by(id=opendare.id).first()
                if dare is not None:
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


@dares_blueprint.route('/delete/<dareid>/<username>/<token>', methods=["GET"])
def delete_dare(dareid, username, token):
    try:
        user_data = db.session.query(User).filter_by(username=username).first()
    except KeyError as e:
        return jsonify({"error": str(e) + " not given or invalid"}), 401
    if request.method == "GET" and user_data.check_loginrequired(token):
        try:
            userdare = UserDares.query.filter_by(id=dareid).first()
        except KeyError as e:
            return jsonify({"error": str(e) + " not given or invalid"}), 401
        if userdare is not None:
            db.session.delete(userdare)
            db.session.commit()
            return jsonify(
                {"result": "It worked! Dare is deleted"}
            ), 200
    return jsonify({}), 401


@dares_blueprint.route('/achieved/<dareid>/<username>/<token>', methods=["GET"])
def achieved_dare(dareid, username, token):
    from beedare import neoconn
    try:
        user_data = db.session.query(User).filter_by(username=username).first()
    except KeyError as e:
        return jsonify({"error": str(e) + " not given or invalid"}), 401
    if request.method == "GET" and user_data.check_loginrequired(token):
        try:
            neoconn.completed_dare(username, dareid)
            userdare = UserDares.query.filter_by(id=dareid).first()
        except KeyError as e:
            return jsonify({"error": str(e) + " not given or invalid"}), 401
        if userdare is not None:
            userdare.achieved = True
            db.session.commit()
            return jsonify(
                {"result": "It worked! Dare is deleted"}
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
