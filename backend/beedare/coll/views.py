from flask import request, jsonify
from flask_login import login_required

from beedare import db
from beedare.models import Friend, Message, User, Post

from beedare.models import UserDares
from . import *


@coll_blueprint.route('/friends', methods=["POST"])
def friends():
    content = request.form
    try:
        result = db.session.query(Friend).filter_by(followed_id=content['id']).all()
    except KeyError as e:
        return jsonify({"error": str(e) + " not given or invalid"}), 401
    return jsonify({
        "result": [[item.follower_id] for item in result]
    }), 200


@coll_blueprint.route('/dares', methods=["POST"])
def dares():
    content = request.get_json()
    try:
        result = db.session.query(UserDares).filter(UserDares.owner_id.like("%" + content['id'] + "%")).all()
    except KeyError as e:
        return jsonify({"error": str(e) + " not given or invalid"}), 401
    return jsonify({
        "result": [[item.id] for item in result]
    }), 200


@coll_blueprint.route('/messages/<id>', methods=["GET"])
def messages(id):
    try:
        list = []
        result = db.session.query(Post).filter_by(author_id=id).all()
        for item in result:
            author = db.session.query(User).filter_by(id=item.author_id).first()
            list.append(
                {'body': item.body, 'body_html': item.body_html, 'author': author.username, 'time': item.timestamp}
            )
    except KeyError as e:
        return jsonify({"error": str(e) + " not given or invalid"}), 401
    return jsonify({
        "result": list
    }), 200
