from flask import jsonify
from flask_login import login_required

from beedare import db
from beedare.models import User, Hive, ColonyMembers, Dare, Message, Friends
from . import *


@profile_blueprint.route('/user/<user_id>', methods=['POST'])
@login_required
def user(user_id):
    # is this necessary?
    if db.session.query(User).filter_by(id=user_id) is not None:
        user_data = db.session.query(User).filter_by(id=user_id)
        friends = db.session.query(Friends).filter_by(follower_id=user_id)
        # TODO query challenges
        dares = None
        return jsonify({
            'user data': user_data,
            'friends': friends,
            'dares': dares,
        }), 200
    return jsonify({}), 401


@profile_blueprint.route('/hive/<hive_id>', methods=['POST'])
@login_required
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
@login_required
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
