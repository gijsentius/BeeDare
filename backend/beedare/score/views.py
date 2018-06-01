from flask import jsonify

from backend.beedare import db
from backend.beedare.models import User, Dare, Hive
from . import *


@score_blueprint("/add/<user_id>/<add_score>", methods=["POST"])
def add(user_id, add_score):
    result = db.session.query(User).filter_by(user_id=user_id)
    if result is not None:
        user = db.session.query(User).filter_by(id=user_id)
        # TODO test this!
        user.score += add_score
        db.session.add(user)
        db.session.commit()
        return jsonify({
            "user_id": user_id,
            "score": user.score
        }), 200
    return jsonify({"error": "user_not_found"}), 401


@score_blueprint("add_hive/<hive_id>/<add_score>", methods=["POST"])
def add_hive(hive_id, add_score):
    result = db.session.query(Hive).filter_by(id=hive_id)
    if result is not None:
        hive = db.session.query(Hive).filter_by(id=hive_id)
        # TODO test this!
        hive.score += add_score
        db.session.add(hive)
        db.session.commit()
        return jsonify({
            "hive_id": hive_id,
            "score": hive.score
        }), 200
    return jsonify({"error": "user_not_found"}), 401