import datetime

import sqlalchemy
from flask import jsonify, request

from backend.beedare import db
from backend.beedare.models import User, Dare, Hive, ColonyMembers
from . import *


@hive_blueprint.route('/join', methods=["POST"])
def join():
    content = request.get_json()
    try:
        result = db.session.query(User).filter_by(id=content['user_id']).first()
        if result is not None:
            result = db.session.query(Hive).filter_by(id=content['hive_id']).first()
        else:
            return jsonify({"error": "'username' not given or invalid"}), 401
    except KeyError as e:
        return jsonify({"error": str(e) + " not given or invalid"}), 401
    if result is not None:
        time = datetime.datetime.utcnow()
        try:
            member = ColonyMembers(follower_id=content['user_id'], hive_id=content['hive_id'], timestamp=time)
        except KeyError as e:
            return jsonify({"error": str(e) + " not given or invalid"}), 401
        db.session.add(member)
        try:
            db.session.commit()
        except sqlalchemy.exc.IntegrityError:
            return jsonify({"error": "commit failed"}), 401
        return jsonify({
            "follower_id": content['user_id'],
            "hive_id": content['hive_id'],
            "timestamp": time
        }), 200
    return jsonify({"error": "'hive' not given or invalid"}), 401


@hive_blueprint.route('/leave', methods=["POST"])
def leave():
    content = request.get_json()
    try:
        result = db.session.query(User).filter_by(id=content['user_id']).first()
        if result is not None:
            result = db.session.query(Hive).filter_by(id=content['hive_id']).first()
        else:
            return jsonify({"error": "'username' not given or invalid"}), 401
    except KeyError as e:
        return jsonify({"error": str(e) + " not given or invalid"}), 401
    if result is not None:
        member = db.query(ColonyMembers).filter_by(follower_id=content['user_id'], hive_id=['hive_id'])
        db.session.delete(member)
        try:
            db.session.commit()
        except sqlalchemy.exc.IntegrityError:
            return jsonify({"error": "commit failed"}), 401
        return jsonify({"success": True}), 200
    return jsonify({"error": "'hive' not given or invalid"}), 401


@hive_blueprint.route('/create', methods=["POST"])
def create():
    content = request.get_json()
    try:
        result = db.session.query(User).filter_by(id=content['user_id']).first()
    except KeyError as e:
        return jsonify({"error": str(e) + " not given or invalid"}), 401
    if result is not None:
        try:
            hive = Hive(hive_name=content['hive_name'], beekeeper=content['user_id'], total_score_members=0)
        except KeyError as e:
            return jsonify({"error": str(e) + " not given or invalid"}), 401
        db.session.add(hive)
        try:
            db.session.commit()
        except sqlalchemy.exc.IntegrityError:
            return jsonify({"error": "commit failed"}), 401
        return jsonify({
            "hive_name": content['hive_name'],
            "beekeeper": content['user_id'],
            "total_score_members": 0
        }), 200
    return jsonify({"error": "user_not_found"}), 401
