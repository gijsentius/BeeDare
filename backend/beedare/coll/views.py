from flask import request, jsonify
from flask_login import login_required

from backend.beedare import db
from backend.beedare.models import Friends, UserDares
from . import *


@coll_blueprint.route('/friends', methods=["POST"])
def friends():
    content = request.get_json()
    try:
        result = db.session.query(Friends).filter_by(followed_id=content['id']).all()
    except KeyError as e:
        return jsonify({"error": str(e) + " not given or invalid"}), 401
    return jsonify({
        "result": [[item.id] for item in result]
    }), 200


@coll_blueprint.route('/dares', methods=["POST"])
def dares():
    content = request.get_json()
    try:
        result = db.session.query(UserDares).filter_by(dare_id=content['id']).all()
    except KeyError as e:
        return jsonify({"error": str(e) + " not given or invalid"}), 401
    return jsonify({
        "result": [[item.id] for item in result]
    }), 200
