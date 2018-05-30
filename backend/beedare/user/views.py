from flask import request, jsonify

from backend.beedare import db
from backend.beedare.models import User, Hive, ColonyMembers, Dare, Message
from . import *


@profile_blueprint.route('/user/<user_id>', methods=['POST'])
def user(user_id):
    # is this necessary?
    if db.session.query(User).filter_by(id=user_id) is not None:
        user_data = db.session.query(User).filter_by(id=user_id)
        # TODO query active friends
        friends = None
        # TODO query challenges
        challenges = None
        return jsonify({
            'user data': user_data,
            'friends': friends,
            'challenges': challenges,
        }), 200
    return jsonify({}), 401


@profile_blueprint.route('/hive/<hive_id>', methods=['POST'])
def hive(hive_id):
    # is this necessary?
    if db.session.query(User).filter_by(id=hive_id).first() is not None:
        hive = db.session.query(Hive).filter_by(id=hive_id)
        members = db.session.query(ColonyMembers).filter_by(follower_id=hive_id)
        challenges = db.session.query(Dare).filter_by(id=hive_id)
        response = jsonify({
            'hive': hive,
            'members': members,
            'challenges': challenges,
        })
        return response, 200
    return jsonify({}), 401


@profile_blueprint.route('/newsFeed/<user_id>', methods=['POST'])
def news(user_id):
    # is this necessary?
    if db.session.query(User).filter_by(id=user_id).first() is not None:
        user_data = db.session.query(User).filter_by(id=user_id)
        messages = db.session.query(Message).filter_by(id=user_id)
        hives = db.session.query(ColonyMembers).filter_by(follower_id=user_id)
        response = jsonify({
            'user data': user_data,
            'messages': messages,
            'hives': hives,
        })
        return response, 200
    return jsonify({}), 401
