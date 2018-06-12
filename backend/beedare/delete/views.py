import sqlalchemy
from flask import jsonify, request

from beedare import db
from beedare.models import User, Dare, Hive, UserDares, Comment, Message
from . import *


@delete_blueprint.route('/hive', methods=["POST"])
def delete_hive():
    content = request.get_json()
    try:
        result = db.session.query(Hive).filter_by(id=content['hive_id']).first()
    except KeyError as e:
        return jsonify({"error": str(e) + " not given or invalid"}), 401
    if result is not None:
        db.session.delete(result)
        try:
            db.session.commit()
        except sqlalchemy.exc.IntegrityError:
            return jsonify({"error": "commit failed"}), 401
        return jsonify({
            "success": True
        }), 200
    return jsonify({"error": "'hive' not given or invalid"}), 401


@delete_blueprint.route('/message', methods=["POST"])
def delete_message():
    content = request.get_json()
    try:
        result = db.session.query(Message).filter_by(id=content['message_id']).first()
    except KeyError as e:
        return jsonify({"error": str(e) + " not given or invalid"}), 401
    if result is not None:
        db.session.delete(result)
        try:
            db.session.commit()
        except sqlalchemy.exc.IntegrityError:
            return jsonify({"error": "commit failed"}), 401
        return jsonify({
            "success": True
        }), 200
    return jsonify({"error": "'user' not given or invalid"}), 401


@delete_blueprint.route('/comment', methods=["POST"])
def delete_comment():
    content = request.get_json()
    try:
        result = db.session.query(Comment).filter_by(id=content['comment_id']).first()
    except KeyError as e:
        return jsonify({"error": str(e) + " not given or invalid"}), 401
    if result is not None:
        db.session.delete(result)
        try:
            db.session.commit()
        except sqlalchemy.exc.IntegrityError:
            return jsonify({"error": "commit failed"}), 401
        return jsonify({
            "success": True
        }), 200
    return jsonify({"error": "'user' not given or invalid"}), 401


@delete_blueprint.route('/dare', methods=["POST"])
def delete_dare():
    content = request.get_json()
    try:
        result = db.session.query(Dare).filter_by(content['dare_id']).first()
    except KeyError as e:
        return jsonify({"error": str(e) + " not given or invalid"}), 401
    if result is not None:
        db.session.delete(result)
        try:
            db.session.commit()
        except sqlalchemy.exc.IntegrityError:
            return jsonify({"error": "commit failed"}), 401
        return jsonify({
            "success": True
        }), 200
    return jsonify({"error": "'user' not given or invalid"}), 401


@delete_blueprint.route('/accepted_dare', methods=["POST"])
def delete_accepted_dare():
    content = request.get_json()
    try:
        result = db.session.query(UserDares).filter_by(id=content['dare_id']).first()
    except KeyError as e:
        return jsonify({"error": str(e) + " not given or invalid"}), 401
    if result is not None:
        db.session.delete(result)
        try:
            db.session.commit()
        except sqlalchemy.exc.IntegrityError:
            return jsonify({"error": "commit failed"}), 401
        return jsonify({
            "success": True
        }), 200
    return jsonify({"error": "'user' not given or invalid"}), 401


@delete_blueprint.route('/profile', methods=["POST"])
def profile():
    content = request.get_json()
    try:
        result = db.session.query(User).filter_by(id=content['user_id']).first()
    except KeyError as e:
        return jsonify({"error": str(e) + " not given or invalid"}), 401
    if result is not None:
        db.session.delete(result)
        try:
            db.session.commit()
        except sqlalchemy.exc.IntegrityError:
            return jsonify({"error": "commit failed"}), 401
        return jsonify({
            "success": True
        }), 200
    return jsonify({"error": "'user' not given or invalid"}), 401
