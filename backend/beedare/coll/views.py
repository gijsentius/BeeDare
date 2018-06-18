from flask import request, jsonify
from flask_login import login_required

from beedare import db
from beedare.models import Friend

from beedare.models import UserDares
from . import *


@coll_blueprint.route('/friends', methods=["POST"])
def friends():
    content = request.get_json()
    try:
        result = db.session.query(Friends).filter(Friends.follower_id.like("%" + content['id'] + "%")).all()
    except KeyError as e:
        return jsonify({"error": str(e) + " not given or invalid"}), 401
    return jsonify({
        "result": [[item.id] for item in result]
    }), 200


@coll_blueprint.route('/dares', methods=["POST"])
def dares():
    content = request.get_json()
    try:
        result = db.session.query(UserDares).filter(UserDares.owner_id.like("%" + content['id'] + "%")).all()
    except KeyError as e:
        return jsonify({"error": str(e) + " not given or invalid"}), 401
    return jsonify({
        "result": [[item.id] for item in result]
    }), 200
