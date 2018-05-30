from flask import request, jsonify
from flask_login import login_required

from backend.beedare import db
from backend.beedare.models import Friends
from . import *


@coll_blueprint.route('/friends/<user_id>', methods=["POST"])
@login_required
def friends(user_id):
    result = db.session.query(Friends).filter_by(followed_id=user_id)
    if result is not None:
        return jsonify({
            "result": result
        }), 200
    return jsonify({}), 401


@coll_blueprint.route('/challenges/<user_id>', methods=["POST"])
@login_required
def challenges(user_id):
    # result = db.session.query(User_Dares).filter_by(dare_id=user_id)
    # if result is not None:
    #    return jsonify({
    #        "result": result
    #   }), 200
    return jsonify({}), 401
