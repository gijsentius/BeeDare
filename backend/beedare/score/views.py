from flask import jsonify, request

from backend.beedare import db
from backend.beedare.models import User, Dare, Hive
from . import *


@score_blueprint.route("/add", methods=["POST"])
def add():
    content = request.get_json()
    try:
        result = db.session.query(User).filter_by(id=content['id']).first()
    except KeyError as e:
        return jsonify({"error": str(e) + " not given or invalid"}), 401
    if result is not None:
        try:
            user = db.session.query(User).filter_by(id=content['id']).first()
        except KeyError as e:
            return jsonify({"error": str(e) + " not given or invalid"}), 401
        try:
            user.score += int(content['score'])
        except KeyError as e:
            return jsonify({"error": str(e) + " not given or invalid"}), 401
        db.session.commit()
        return jsonify({
            "user_id": content['id'],
            "score": user.score
        }), 200
    return jsonify({"error": "user_not_found"}), 401


@score_blueprint.route("/add_hive", methods=["POST"])
def add_hive():
    content = request.get_json()
    try:
        result = db.session.query(Hive).filter_by(id=content['hive_id'])
    except KeyError as e:
        return jsonify({"error": str(e) + " not given or invalid"}), 401
    if result is not None:
        try:
            hive = db.session.query(Hive).filter_by(id=content['hive_id'])
        except KeyError as e:
            return jsonify({"error": str(e) + " not given or invalid"}), 401
        try:
            hive.score += int(content['score'])
        except KeyError as e:
            return jsonify({"error": str(e) + " not given or invalid"}), 401
        db.session.commit()
        return jsonify({
            "hive_id": content['hive_id'],
            "score": hive.score
        }), 200
    return jsonify({"error": "user_not_found"}), 401
