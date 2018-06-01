from flask import jsonify

from backend.beedare import db
from backend.beedare.models import User, Dare, Hive, UserDares, Comment, Message
from . import *


@delete_blueprint.route('/hive/<hive_id>')
def delete_hive(hive_id):
    result = db.session.query(Hive).filter_by(id=hive_id).first()
    if result is not None:
        hive = db.session.query(Hive).filter_by(hive_id)
        db.session.delete(hive)
        return jsonify({
            "success": True
        }), 200
    return jsonify({"error": "user_not_found"}), 401


@delete_blueprint.route('/message/<message_id>')
def delete_message(message_id):
    result = db.session.query(Message).filter_by(id=message_id).first()
    if result is not None:
        message = db.session.query(Message).filter_by(message_id)
        db.session.delete(message)
        return jsonify({
            "success": True
        }), 200
    return jsonify({"error": "user_not_found"}), 401


@delete_blueprint.route('/comment/<comment_id>')
def delete_comment(comment_id):
    result = db.session.query(Comment).filter_by(id=comment_id).first()
    if result is not None:
        comment = db.session.query(Comment).filter_by(comment_id)
        db.session.delete(comment)
        return jsonify({
            "success": True
        }), 200
    return jsonify({"error": "user_not_found"}), 401


@delete_blueprint.route('/dare/<dare_id>')
def delete_dare(dare_id):
    result = db.session.query(Dare).filter_by(id=dare_id).first()
    if result is not None:
        dare = db.session.query(Dare).filter_by(dare_id)
        db.session.delete(dare)
        return jsonify({
            "success": True
        }), 200
    return jsonify({"error": "user_not_found"}), 401


@delete_blueprint.route('/accepted_dare/<dare_id>')
def delete_accepted_dare(dare_id):
    result = db.session.query(UserDares).filter_by(id=dare_id).first()
    if result is not None:
        user_dare = db.session.query(UserDares).filter_by(dare_id)
        db.session.delete(user_dare)
        return jsonify({
            "success": True
        }), 200
    return jsonify({"error": "user_not_found"}), 401


@delete_blueprint.route('/profile/<user_id>')
def profile(user_id):
    result = db.session.query(User).filter_by(id=user_id).first()
    if result is not None:
        user = db.session.query(User).filter_by(user_id)
        db.session.delete(user)
        return jsonify({
            "success": True
        }), 200
    return jsonify({"error": "user_not_found"}), 401
