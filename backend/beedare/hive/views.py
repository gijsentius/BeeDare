import datetime

from flask import jsonify

from backend.beedare import db
from backend.beedare.models import User, Dare, Hive, ColonyMembers
from . import *


@hive_blueprint.route('/join/<user_id>/<hive_id>', methods=["POST"])
def join(user_id, hive_id):
    result = db.session.query(User).filter_by(id=user_id).first()
    if result is not None:
        time = datetime.datetime.utcnow()
        member = ColonyMembers(follower_id=user_id, hive_id=hive_id, timestamp=time)
        db.session.add(member)
        db.session.commit()
        return jsonify({
            "follower_id": user_id,
            "hive_id": hive_id,
            "timestamp": time
        }), 200
    return jsonify({"error": "user_not_found"}), 401


@hive_blueprint.route('/leave/<user_id>/<hive_id>', methods=["POST"])
def leave(user_id, hive_id):
    result = db.session.query(User).filter_by(id=user_id).first()
    if result is not None:
        member = db.query(ColonyMembers).filter_by(follower_id=user_id, hive_id=hive_id)
        db.session.remove(member)
        db.session.commit()
        return jsonify({"success": True}), 200
    return jsonify({"error": "user_not_found"}), 401


@hive_blueprint.route('/create/<hive_name>/<user_id>/<image>', methods=["POST"])
def create(hive_name, user_id, image):
    result = db.session.query(User).filter_by(id=user_id).first()
    if result is not None:
        hive = Hive(hive_name=hive_name, beekeeper=user_id, total_score_members=0, image=image)
        db.session.add(hive)
        db.session.commit()
        return jsonify({
            "hive_name": hive_name,
            "beekeeper": user_id,
            "total_score_members": 0,
            "image": image
        }), 200
    return jsonify({"error": "user_not_found"}), 401
