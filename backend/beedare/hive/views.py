import datetime

import sqlalchemy
from flask import jsonify, request

from beedare import db
from beedare.models import User, Dare, Hive, ColonyMembers
from . import *


@hive_blueprint.route('/join', methods=["POST"])
def join():
    content = request.form
    try:
        result = db.session.query(User).filter_by(id=content['user_id']).first()
        if result is not None:
            result = db.session.query(Hive).filter_by(id=content['hive_id']).first()
            member = db.session.query(ColonyMembers).filter_by(follower_id=content['user_id']).filter_by(
                hive_id=content['hive_id']).first()
        else:
            return jsonify({"error": "'username' not given or invalid"}), 401
    except KeyError as e:
        return jsonify({"error": str(e) + " not given or invalid"}), 401
    if result is not None and member is None:
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
            "timestamp": time,
            "success": "Hive joined!"
        }), 200
    return jsonify({"error": "'hive' not given or invalid"}), 401


@hive_blueprint.route('/leave', methods=["POST"])
def leave():
    content = request.form
    try:
        result = db.session.query(User).filter_by(id=content['user_id']).first()
        if result is not None:
            result = db.session.query(Hive).filter_by(id=content['hive_id']).first()
        else:
            return jsonify({"error": "'username' not given or invalid"}), 401
    except KeyError as e:
        return jsonify({"error": str(e) + " not given or invalid"}), 401
    if result is not None:
        member = db.session.query(ColonyMembers).filter_by(follower_id=content['user_id']).filter_by(
            hive_id=content['hive_id']).first()
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


@hive_blueprint.route('/hives', methods=["GET"])
def getHives():
    try:
        hives = db.session.query(Hive).all()
    except KeyError as e:
        return jsonify({"error": str(e) + " not given or invalid"}), 401
    if hives is not None:
        list = []
        for item in hives:
            keeper = db.session.query(User).filter_by(id=item.beekeeper).first()
            list.append(
                {
                    "hiveName": item.hive_name,
                    "images": item.image,
                    "totalScore": item.total_score_members,
                    "beekeeper": keeper.username,
                })
        return jsonify(
            list
        ), 200
    return jsonify({"error": "user_not_found"}), 401


@hive_blueprint.route('/hives/user/<user_id>', methods=["GET"])
def getHivesUser(user_id):
    try:
        joined = db.session.query(ColonyMembers).filter_by(follower_id=user_id).all()
        if joined is not None:
            list = []
            for item in joined:
                hive = db.session.query(Hive).filter_by(id=item.hive_id).first()
                keeper = db.session.query(User).filter_by(id=hive.beekeeper).first()
                list.append(
                    {
                        "hiveName": hive.hive_name,
                        "images": hive.image,
                        "totalScore": hive.total_score_members,
                        "beekeeper": keeper.username,
                    })
            return jsonify(
                list
            ), 200
    except KeyError as e:
        return jsonify({"error": str(e) + " not given or invalid"}), 401
    return jsonify({"error": "user_not_found"}), 401


@hive_blueprint.route('/members/<hive_id>', methods=["GET"])
def getMembers(hive_id):
    try:
        hives = db.session.query(ColonyMembers).filter_by(hive_id=hive_id).all()
    except KeyError as e:
        return jsonify({"error": str(e) + " not given or invalid"}), 401
    if hives is not None:
        list = []
        for item in hives:
            name = db.session.query(User).filter_by(id=item.follower_id).first()
            list.append(name.username)
        return jsonify({
            'items': list
        }), 200
    return jsonify({"error": "user_not_found"}), 401
