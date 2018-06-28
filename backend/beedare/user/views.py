import sqlalchemy
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
                friend_list.append(
                    {
                        'friend': friend.follower_id,
                    }
                )
        except KeyError as e:
            return jsonify({"error": str(e) + " not given or invalid"}), 401
        response = jsonify({
            "friends": friend_list,
        })
        return response, 200
    return jsonify({}), 401


@profile_blueprint.route('/score/<username>/<token>', methods=['GET'])
def getScore(username, token):
    from beedare import neoconn
    try:
        user_data = db.session.query(User).filter_by(username=username).first()
    except KeyError as e:
        return jsonify({"error": str(e) + " not given or invalid"}), 401
    if request.method == "GET" and user_data.check_loginrequired(token):
        # get scores from neo4j
        return jsonify({"score": neoconn.get_user_score(username)}), 200
    return jsonify({}), 401


@profile_blueprint.route('/delete/message/<message_id>/<username>/<token>', methods=["GET"])
def delete_message(message_id, username, token):
    try:
        result = User.query.filter_by(username=username).first()
    except KeyError as e:
        return jsonify({"error": str(e) + " not given or invalid"}), 401
    if request.method == "GET" and result.check_loginrequired(token):
        message = Message.query.filter_by(id=message_id).first()
        if message is not None:
            try:
                db.session.delete(result)
                db.session.commit()
            except sqlalchemy.exc.IntegrityError:
                return jsonify({"error": "commit failed"}), 401
            return jsonify({
                "success": True
            }), 200
        return jsonify({"error": "'message id' not given or invalid"}), 401
    return jsonify({"error": "'user' not given or invalid"}), 401

@profile_blueprint.route('/delete/friend/<friend>/<username>/<token>', methods=["GET"])
def delete_friend(friend, username, token):
    try:
        result = User.query.filter_by(username=username).first()
    except KeyError as e:
        return jsonify({"error": str(e) + " not given or invalid"}), 401
    if request.method == "GET" and result.check_loginrequired(token):
        from beedare import neoconn
        friend_relation = Friend.query.filter_by(follower_id=friend).filter_by(followed_id=username).first()
        if friend_relation is not None:
            try:
                db.session.delete(friend_relation)
                db.session.commit()
                neoconn.discconnect_users(username, friend.username)
            except sqlalchemy.exc.IntegrityError:
                return jsonify({"error": "commit failed"}), 401
            return jsonify({
                "success": True
            }), 200
        return jsonify({"error": "'message id' not given or invalid"}), 401
    return jsonify({"error": "'user' not given or invalid"}), 401


@profile_blueprint.route('/accept/friend/<friend>/<username>/<token>', methods=["GET"])
def add_friend(friend, username, token):
    try:
        result = User.query.filter_by(username=username).first()
    except KeyError as e:
        return jsonify({"error": str(e) + " not given or invalid"}), 401
    if request.method == "GET" and result.check_loginrequired(token):
        from beedare import neoconn
        friend = User.query.filter_by(id=friend).first()  # could also be done with the username of the friend
        if friend is not None:
            try:
                friend_conn = Friend(friend.id, result.id)
                db.session.add(friend_conn)
                db.session.commit()
                neoconn.connect_users(username, friend.username)
            except sqlalchemy.exc.IntegrityError:
                return jsonify({"error": "commit failed"}), 401
            return jsonify({
                "success": True
            }), 200
        return jsonify({"error": "'message id' not given or invalid"}), 401
    return jsonify({"error": "'user' not given or invalid"}), 401


@profile_blueprint.route('/messages/<username>/<token>', methods=["GET"])
def get_messages(username, token):
    try:
        result = User.query.filter_by(username=username).first()
    except KeyError as e:
        return jsonify({"error": str(e) + " not given or invalid"}), 401
    if request.method == "GET" and result.check_loginrequired(token):
        messages = Message.query.filter_by(recipient_id=result.id).all()  # could also be done with the username of the friend
        if messages is not None:
            try:
                message_list = []
                for message in messages:
                    if message.friendRequest:
                        message_list.append(
                            {
                                'id': message.id,
                                'title': message.title,
                                'body': message.body,
                                'sender': message.sender,
                                'friendsRequest': True
                            }
                        )
                    else:
                        message_list.append(
                            {
                                'id': message.id,
                                'title': message.title,
                                'body': message.body,
                                'sender': message.sender,
                                'friendsRequest': False
                            }
                        )
                return jsonify({"messages": message_list}), 200
            except sqlalchemy.exc.IntegrityError:
                return jsonify({"error": "commit failed"}), 401
        return jsonify({"error": "'User had no messages"}), 401
    return jsonify({"error": "'user' not given or invalid"}), 401


@profile_blueprint.route('/friend/<friend>/<username>/<token>', methods=["GET"])
def is_friend(friend, username, token):
    try:
        result = User.query.filter_by(username=username).first()
    except KeyError as e:
        return jsonify({"error": str(e) + " not given or invalid"}), 401
    if request.method == "GET" and result.check_loginrequired(token):
        from beedare import neoconn
        friend = User.query.filter_by(id=friend).first()  # could also be done with the username of the friend
        # if neoconn.is_friend(username, friend.username):
        #     return jsonify({
        #         "friends": neoconn.is_friend(username, friend.username)
        #     }), 200
        if friend is not None:
            return jsonify({
                "friends": True
            })
        else:
            return jsonify({
                "friends": False
            })
    return jsonify({"error": "'user' not given or invalid"}), 401
