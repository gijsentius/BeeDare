from flask import jsonify, request
from flask_login import login_required

from backend.beedare import db
from backend.beedare.models import User, Hive, ColonyMembers, Dare, Message, Friends, UserDares
from . import *


@profile_blueprint.route('/user', methods=['POST'])
def user():
    content = request.get_json()
    try:
        user_data = db.session.query(User).filter_by(id=content['id']).first()
    except KeyError as e:
        return jsonify({"error": str(e) + " not given or invalid"}), 401
    if user_data is not None:
        try:
            friends = db.session.query(Friends).filter_by(follower_id=content['id']).all()
            dares = db.session.query(UserDares).filter_by(owner_id=content['id']).all()
        except KeyError as e:
            return jsonify({"error": str(e) + " not given or invalid"}), 401
        return jsonify({
            # TODO fix this
            'user data': [user_data.id, user_data.username, user_data.score, user_data.image, user_data.rank, user_data.email],
            'friends': [[item.id] for item in friends],
            'dares': [[item.id] for item in dares],
        }), 200
    return jsonify({}), 401


@profile_blueprint.route('/hive', methods=['POST'])
def hive():
    content = request.get_json()
    try:
        result = db.session.query(User).filter_by(id=content['id']).first()
    except KeyError as e:
        return jsonify({"error": str(e) + " not given or invalid"}), 401
    if result is not None:
        try:
            hive = db.session.query(Hive).filter_by(id=content['hive_id']).first()
            members = db.session.query(ColonyMembers).filter_by(follower_id=content['hive_id']).all()
            dares = db.session.query(UserDares).filter_by(id=content['hive_id']).all()
        except KeyError as e:
            return jsonify({"error": str(e) + " not given or invalid"}), 401
        response = jsonify({
            'hive': [hive.id, hive.have_name, hive.image, hive.total_score_members, hive.beekeeper],
            'members': [[item.id] for item in members],
            'dares': [[item.id] for item in dares],
        })
        return response, 200
    return jsonify({}), 401


@profile_blueprint.route('/newsfeed', methods=['POST'])
def news():
    content = request.get_json()
    try:
        user_data = db.session.query(User).filter_by(id=content['id']).first()
    except KeyError as e:
        return jsonify({"error": str(e) + " not given or invalid"}), 401
    if user_data is not None:
        try:
            messages = db.session.query(Message).filter_by(author_id=content['id']).all()
            hives = db.session.query(ColonyMembers).filter_by(follower_id=content['id']).all()
        except KeyError as e:
            return jsonify({"error": str(e) + " not given or invalid"}), 401

        response = jsonify({
            'user data': [user_data.id, user_data.username, user_data.score, user_data.image, user_data.rank, user_data.email],
            'messages': [[item.id] for item in messages],
            'hives': [[item.id] for item in hives],
        })
        return response, 200
    return jsonify({}), 401
