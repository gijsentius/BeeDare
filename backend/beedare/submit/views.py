import datetime

import sqlalchemy
from flask import jsonify, request

from beedare import db
from beedare.models import User, Dare, Hive, Message, Comment, UserDares
from . import *


@submit_blueprint.route('/message', methods=["POST"])
def add_message():
    content = request.get_json()
    try:
        result = db.session.query(User).filter_by(id=content['user_id']).first()
    except KeyError as e:
        return jsonify({"error": str(e) + " not given or invalid"}), 401
    if result is not None:
        time = datetime.datetime.utcnow()
        try:
            message = Message(body=content['title'], body_html=content['message'], author_id=content['user_id'],
                              timestamp=time)
        except KeyError as e:
            return jsonify({"error": str(e) + " not given or invalid"}), 401
        db.session.add(message)
        try:
            db.session.commit()
        except sqlalchemy.exc.IntegrityError:
            return jsonify({"error": "commit failed"}), 401
        return jsonify({
            "body": content['title'],
            "body_html": content['message'],
            "timestamp": time,
            "author_id": content['user_id'],
        }), 200
    return jsonify({"error": "user_not_found"}), 401


@submit_blueprint.route('/comment', methods=["POST"])
def add_comment():
    content = request.get_json()
    try:
        result = db.session.query(User).filter_by(id=content['user_id']).first()
    except KeyError as e:
        return jsonify({"error": str(e) + " not given or invalid"}), 401
    if result is not None:
        time = datetime.datetime.utcnow()
        dis = False
        try:
            comment = Comment(body=content['title'], body_html=content['message'], timestamp=time,
                              author_id=content['user_id'], post_id=content['comment'], disabled=dis)
        except KeyError as e:
            return jsonify({"error": str(e) + " not given or invalid"}), 401
        db.session.add(comment)
        try:
            db.session.commit()
        except sqlalchemy.exc.IntegrityError:
            return jsonify({"error": "commit failed"}), 401
        return jsonify({
            "body": content['title'],
            "body_html": content['message'],
            "timestamp": time,
            "author_id": content['user_id'],
            "disabled": dis
        }), 200
    return jsonify({"error": "user_not_found"}), 401


@submit_blueprint.route('/dare/accept', methods=["POST"])
def dare_accept():
    content = request.get_json()
    try:
        result = db.session.query(User).filter_by(id=content['user_id']).first()
    except KeyError as e:
        return jsonify({"error": str(e) + " not given or invalid"}), 401
    if result is not None:
        ach = False
        try:
            dare = UserDares(owner_id=content['user_id'], id=content['dare_id'], achieved=content['ach'])
        except KeyError as e:
            return jsonify({"error": str(e) + " not given or invalid"}), 401
        db.session.add(dare)
        try:
            db.session.commit()
        except sqlalchemy.exc.IntegrityError:
            return jsonify({"error": "commit failed"}), 401
        return jsonify({
            "id": content['dare_id'],
            "owner_id": content['user_id'],
            "achieved": ach
        }), 200
    return jsonify({"error": "user_not_found"}), 401


@submit_blueprint.route('/dare/done', methods=["POST"])
def dare_done():
    content = request.get_json()
    try:
        result = db.session.query(User).filter_by(id=content['user_id']).first()
    except KeyError as e:
        return jsonify({"error": str(e) + " not given or invalid"}), 401
    if result is not None:
        user_dare = db.session.query(UserDares).filter_by(id=content['dare_id'])
        # TODO test
        user_dare.achieved = True
        db.session.add(user_dare)
        try:
            db.session.commit()
        except sqlalchemy.exc.IntegrityError:
            return jsonify({"error": "commit failed"}), 401
        return jsonify({
            "id": content['dare_id'],
            "owner_id": content['user_id'],
            "achieved": user_dare.achieved
        }), 200
    return jsonify({"error": "user_not_found"}), 401


@submit_blueprint.route('/dare/create', methods=["POST"])
def dare_create():
    content = request.get_json()
    try:
        result = db.session.query(User).filter_by(id=content['user_id']).first()
    except KeyError as e:
        return jsonify({"error": str(e) + " not given or invalid"}), 401
    if result is not None:
        try:
            create_dare = Dare(name=content['dare'], body=content['body'], body_html=content['body_html'],
                               image=content['image'])
        except KeyError as e:
            return jsonify({"error": str(e) + " not given or invalid"}), 401
        db.session.add(create_dare)
        try:
            db.session.commit()
        except sqlalchemy.exc.IntegrityError:
            return jsonify({"error": "commit failed"}), 401
        return jsonify({
            "name": content['dare'],
            "body": content['body'],
            "body_html": content['body_html'],
            "image": content['image']
        }), 200
    return jsonify({"error": "user_not_found"}), 401


@submit_blueprint.route('/friend', methods=["POST"])
def add_friend():
    content = request.get_json()
    try:
        result = db.session.query(User).filter_by(id=content['user_id']).first()
        if result is not None:
            result = db.session.query(User).filter_by(id=content['friend_id']).first()
        else:
            return jsonify({"error": "user_not_found"}), 401
    except KeyError as e:
        return jsonify({"error": str(e) + " not given or invalid"}), 401
    if result is not None:
        time = datetime.datetime.utcnow()
        try:
            friend = Friend(follower_id=content['user_id'], followed_id=content['friend_id'], timestamp=time)
        except KeyError as e:
            return jsonify({"error": str(e) + " not given or invalid"}), 401
        db.session.add(friend)
        try:
            db.session.commit()
        except sqlalchemy.exc.IntegrityError:
            return jsonify({"error": "commit failed"}), 401
        return jsonify({
            "friend": content['friend_id'],
            "time": time
        }), 200
    return jsonify({"error": "friend_not_found"}), 401
