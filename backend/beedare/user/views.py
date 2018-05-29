from flask import request, jsonify

from backend.beedare import db
from backend.beedare.models import User
from . import *


@profile_blueprint.route('/user/<user_id>', methods=['GET', 'POST'])
def user(user_id):
    if request.method == "POST":
        # is this necessary?
        if db.session.query(User).filter_by(id=user_id).first() is not None:
            # TODO query user data
            user_data = None
            # TODO query active friends
            friends = None
            # TODO query challenges
            challenges = None
            # TODO query other things
            things = None
            return jsonify({
                'user data': user_data,
                'friends': friends,
                'challenges': challenges,
                'things': things
            })
    return "User"


@profile_blueprint.route('/hive/<user_id>', methods=['GET', 'POST'])
def hive(user_id):
    if request.method == "POST":
        # is this necessary?
        if db.session.query(User).filter_by(id=user_id).first() is not None:
            # TODO query hive data
            hive = None
            # TODO query members
            members = None
            # TODO query challenges
            challenges = None
            # TODO query other things
            things = None
            return jsonify({
                'hive': hive,
                'members': members,
                'challenges': challenges,
                'things': things
            })
    return "Hive"


@profile_blueprint.route('/newsFeed/<user_id>', methods=['GET', 'POST'])
def news(user_id):
    if request.method == "POST":
        # is this necessary?
        if db.session.query(User).filter_by(id=user_id).first() is not None:
            # TODO query user data
            user_data = None
            # TODO query messages
            messages = None
            # TODO query hives
            hives = None
            # TODO query other things
            things = None
            return jsonify({
                'user data': user_data,
                'messages': messages,
                'hives': hives,
                'things': things
            })
    return "News feed"
