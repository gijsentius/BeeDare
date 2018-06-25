from flask import jsonify, request

from beedare import db
from beedare.models import User, Hive, ColonyMembers, Dare, Message, Friend, UserDares
from . import *


@profile_blueprint.route('/user/<username>/<token>', methods=['POST', 'GET'])
def user(username, token):
    try:
        user_data = db.session.query(User).filter_by(username=username).first()
    except KeyError as e:
        return jsonify({"error": str(e) + " not given or invalid"}), 401
    if request.method == "GET" and user_data.check_loginrequired(token):
        if user_data is not None:
            return jsonify(
                {
                    "first_name": user_data.first_name,
                    "username": user_data.username,
                    "last_name": user_data.last_name,
                    "email": user_data.email,
                    "image": user_data.image,
                    "id": user_data.id,
                    "rank": user_data.rank,
                }
            ), 200
    return jsonify({}), 401


@profile_blueprint.route('/user/edit/<username>/<token>', methods=['POST'])
def editData(username, token):
    content = request.form
    try:
        user = db.session.query(User).filter_by(username=username).first()
    except KeyError as e:
        return jsonify({"error": str(e) + " not given or invalid"}), 401
    if request.method == "POST" and user.check_loginrequired(token):
        if user is not None:
            try:
                user.first_name = content['firstName']
                user.last_name = content['lastName']
                user.username = content['userName']
                db.session.commit()
            except KeyError as e:
                return jsonify({"error": str(e) + " not given or invalid"}), 401
            response = jsonify({
                "succes": "Oui",
            })
            return response, 200
    return jsonify({}), 401


@profile_blueprint.route('/user/pwandeedit/<username>/<token>', methods=['POST'])
def editconfidential(username, token):
    content = request.form
    try:
        user = db.session.query(User).filter_by(username=username).first()
    except KeyError as e:
        return jsonify({"error": str(e) + " not given or invalid"}), 401
    if request.method == "POST" and user.check_loginrequired(token):
        try:
            user.email = content['email']
            user.password = content['lastName']
            user.username = content['userName']
            db.session.commit()
        except KeyError as e:
            return jsonify({"error": str(e) + " not given or invalid"}), 401
        response = jsonify({
            "Succes": "Oui",
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


@profile_blueprint.route('/newsfeed/<username>/<token>', methods=['GET'])
def news(username, token):
    try:
        user_data = User.query.filter_by(username=username).first()
    except KeyError as e:
        return jsonify({"error": str(e) + " not given or invalid"}), 401
    if request.method == "GET" and user_data.check_loginrequired(token):
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
