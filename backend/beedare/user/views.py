from flask import jsonify, request
from flask_login import login_required
from sqlalchemy import update

from beedare import db
from beedare.models import User, Hive, ColonyMembers, Dare, Message, Friend, UserDares
from . import *


@profile_blueprint.route('/user', methods=['POST', 'GET'])
# @login_required
def user():
    content = request.get_json()
    try:
        user_data = db.session.query(User).all()
        # .filter_by(id=content['id']).first()
    except KeyError as e:
        return jsonify({"error": str(e) + " not given or invalid"}), 401
    if request.method == "GET":
        if user_data is not None:
            list = []
            for item in user_data:
                list.append(
                    {
                        "first_name": item.first_name,
                        "username": item.username,
                        "last_name": item.last_name,
                        "email": item.email,
                        "image": item.image,
                        "id": item.user_id,
                        "rank": item.rank,
                    })
            return jsonify(
                list
            ), 200
    try:
        user_data = db.session.query(User).filter_by(username=content['username']).first()
    except KeyError as e:
        return jsonify({"error": str(e) + " not given or invalid"}), 401
    if user_data is not None:
        try:
            friends = db.session.query(Friend).filter(Friend.follower_id.like("%" + str(user_data.id) + "%")).all()
            dares = db.session.query(UserDares).filter(UserDares.owner_id.like("%" + str(user_data.id) + "%")).all()
        except KeyError as e:
            return jsonify({"error": str(e) + " not given or invalid"}), 401
        return jsonify({
            # TODO fix this
            'user data': [user_data.id, user_data.username, user_data.score, user_data.image, user_data.rank, user_data.email],
            'friends': [[item.id] for item in friend],
            'dares': [[item.id] for item in dares],
        }), 200
    return jsonify({}), 401


@profile_blueprint.route('/user/edit/<username>', methods=['POST'])
def editData(username):
    content = request.form
    try:
        user = db.session.query(User).filter_by(username=username).first()
    except KeyError as e:
        return jsonify({"error": str(e) + " not given or invalid"}), 401
    if user is not None:
        try:
            user.first_name = content['firstName']
            user.last_name = content['lastName']
            user.username = content['userName']
            db.session.commit()
        except KeyError as e:
            return jsonify({"error": str(e) + " not given or invalid"}), 401
        response = jsonify({
            "succes": "succes",
        })
        return response, 200
    return jsonify({}), 401


@profile_blueprint.route('/user/pwandeedit/<username>', methods=['POST'])
def editconfidential(username):
    content = request.form
    try:
        user = db.session.query(User).filter_by(username=username).first()
    except KeyError as e:
        return jsonify({"error": str(e) + " not given or invalid"}), 401
    if user is not None:
        try:
            print(content)
            # user.email = content['email']
            # user.password = content['lastName']
            # user.username = content['userName']
            # db.session.commit()
        except KeyError as e:
            return jsonify({"error": str(e) + " not given or invalid"}), 401
        response = jsonify({
            "Result": "succes",
        })
        return response, 200
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
            members = db.session.query(ColonyMembers).filter(ColonyMembers.follower_id.like("%" + content['hive_id'] + "%")).all()
            dares = db.session.query(UserDares).filter(UserDares.id.like("%" + content['hive_id'] + "%")).all()
        except KeyError as e:
            return jsonify({"error": str(e) + " not given or invalid"}), 401
        response = jsonify({
            'hive': [hive.id, hive.have_name, hive.image, hive.total_score_members, hive.beekeeper],
            'members': [[item.id] for item in members],
            'dares': [[item.id] for item in dares],
        })
        return response, 200
    return jsonify({}), 401


@profile_blueprint.route('/newsfeed/<user>', methods=['GET'])
def news(user):
    try:
        user_data = User.query.filter_by(username=user).first()
    except KeyError as e:
        return jsonify({"error": str(e) + " not given or invalid"}), 401
    if user_data is not None:
        message_list = []
        try:
            friends = Friend.query.filter_by(follower_id=(user_data.id)).all()
            for friend in friends:
                friend_data = User.query.filter_by(id=friend.followed_id).first()
                messages = Message.query.filter_by(author_id=friend.followed_id).all()
                for message in messages:
                    message_list.append(
                        {
                            'author': friend_data.username,
                            'body': message.body,
                            'timestamp': message.timestamp
                        }
                    )
            # message_list.sort(key=lambda m: m.timestamp)
        except KeyError as e:
            return jsonify({"error": str(e) + " not given or invalid"}), 401
        response = jsonify({
            'messages': message_list,
        })
        return response, 200
    return jsonify({}), 401
