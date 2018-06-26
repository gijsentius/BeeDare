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
            'user data': [user_data.id, user_data.username, user_data.score, user_data.image, user_data.rank,
                          user_data.email],
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


@profile_blueprint.route('/hive/edit/<hive_name>', methods=['POST'])
def editDataHive(hive_name):
    content = request.form
    try:
        hive = db.session.query(Hive).filter_by(hive_name=hive_name).first()
    except KeyError as e:
        return jsonify({"error": str(e) + " not given or invalid"}), 401
    if hive is not None:
        try:
            hive.hive_name = content['hive_name']
            hive.beekeeper = content['beekeeper']
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


@profile_blueprint.route('/hive/<hive_name>', methods=['GET'])
def hive(hive_name):
    try:
        hive = db.session.query(Hive).filter_by(hive_name=hive_name).first()
        keeper = db.session.query(User).filter_by(user_id=hive.beekeeper).first()
    except KeyError as e:
        return jsonify({"error": str(e) + " not given or invalid"}), 401
    response = jsonify({
        'hive': [hive.id, hive.hive_name, hive.image, hive.total_score_members, keeper.username],
    })
    return response, 200


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


@profile_blueprint.route('/friends/<user>', methods=['GET'])
def getFriends(user):
    friend_list = []
    try:
        friends = db.session.query(Friend).filter_by(followed_id=user).all()
    except KeyError as e:
        return jsonify({"error": str(e) + " not given or invalid"}), 401
    if hive is not None:
        try:
            for friend in friends:
                friend = db.session.query(User).filter_by(user_id=friend.follower_id).first()
                friend_list.append(
                    friend.username
                )
        except KeyError as e:
            return jsonify({"error": str(e) + " not given or invalid"}), 401
        response = jsonify({
            "friends": friend_list,
        })
        return response, 200
    return jsonify({}), 401
