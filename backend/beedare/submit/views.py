import datetime

from flask import jsonify

from beedare import db
from beedare.models import User, Dare, Hive, Message, Comment, UserDares
from . import *


@submit_blueprint.route('/message/<title>/<message>/<user_id>', methods=["POST"])
def add_message(message, title, user_id):
    result = db.session.query(User).filter_by(id=user_id).first()
    if result is not None:
        time = datetime.datetime.utcnow()
        comments = None
        message = Message(body=title, body_html=message, author_id=user_id, timestamp=time, comments=comments)
        db.session.add(message)
        db.session.commit()
        return jsonify({
            "body": title,
            "body_html": message,
            "timestamp": time,
            "author_id": user_id,
            "comments": comments
        }), 200
    return jsonify({"error": "user_not_found"}), 401


@submit_blueprint.route('/comment/<title>/<message>/<comment>/<user_id>', methods=["POST"])
def add_comment(title, message, comment, user_id):
    result = db.session.query(User).filter_by(id=user_id).first()
    if result is not None:
        time = datetime.datetime.utcnow()
        dis = False
        comment = Comment(body=title, body_html=message, timestamp=time, author_id=user_id, post_id=comment, disabled=dis)
        db.session.add(comment)
        db.session.commit()
        return jsonify({
            "body": title,
            "body_html": message,
            "timestamp": time,
            "author_id": user_id,
            "post_id": comment,
            "disabled": dis
        }), 200
    return jsonify({"error": "user_not_found"}), 401


@submit_blueprint.route('/dare/accept/<dare_id>/<user_id>', methods=["POST"])
def dare_accept(dare_id, user_id):
    result = db.session.query(User).filter_by(id=user_id).first()
    if result is not None:
        ach = False
        dare = UserDares(owner_id=user_id, id=dare_id, achieved=ach)
        db.session.add(dare)
        db.session.commit()
        return jsonify({
            "id": dare_id,
            "owner_id": user_id,
            "achieved": ach
        }), 200
    return jsonify({"error": "user_not_found"}), 401


@submit_blueprint.route('/dare/done/<dare_id>/<user_id>', methods=["POST"])
def dare_done(dare_id, user_id):
    result = db.session.query(User).filter_by(id=user_id).first()
    if result is not None:
        user_dare = db.session.query(UserDares).filter_by(id=dare_id)
        # TODO test
        user_dare.achieved=True
        db.session.add(user_dare)
        db.session.commit()
        return jsonify({
            "id": dare_id,
            "owner_id": user_id,
            "achieved": user_dare.achieved
        }), 200
    return jsonify({"error": "user_not_found"}), 401


@submit_blueprint.route('/dare/create/<dare>/<user_id>/<body>/<body_html>/<image>', methods=["POST"])
def dare_create(dare, user_id, body, body_html, image):
    result = db.session.query(User).filter_by(id=user_id).first()
    if result is not None:
        create_dare = Dare(name=dare, body=body, body_html=body_html, image=image)
        db.session.add(create_dare)
        db.session.commit()
        return jsonify({
            "name": dare,
            "body": body,
            "body_html": body_html,
            "image": image
        }), 200
    return jsonify({"error": "user_not_found"}), 401
