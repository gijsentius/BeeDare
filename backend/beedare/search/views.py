from flask import request, jsonify

from beedare import db
from beedare.models import User, Dare, Hive
from . import *


@search_blueprint.route('/', methods=['GET'])
def search():
    return jsonify({}), 200


@search_blueprint.route('/users/<query>', methods=['GET'])
def search_users(query):
    try:
        result = db.session.query(User).filter(User.username.like("%" + query + "%")).all()
    except KeyError as e:
        return jsonify({"error": str(e) + " not given or invalid"}), 401
    if result is not None:
        return jsonify({
            "result": [[item.username, item.first_name, item.last_name] for item in result]
        }), 200
    return jsonify({}), 401


@search_blueprint.route('/hives/<query>', methods=['GET'])
def search_hives(query):
    try:
        result = db.session.query(Hive).filter(Hive.hive_name.like("%" + query + "%")).all()
    except KeyError as e:
        return jsonify({"error": str(e) + " not given or invalid"}), 401
    if result is not None:
        return jsonify({
            "result": [[item.hive_name, item.image, item.total_score_members, item.beekeeper] for item in result]
        }), 200
    return jsonify({}), 401


@search_blueprint.route('/dares/<query>', methods=['GET'])
def search_challenges(query):
    try:
        result = db.session.query(Dare).filter(Dare.body.like("%" + query + "%")).all()
    except KeyError as e:
        return jsonify({"error": str(e) + " not given or invalid"}), 401
    if result is not None:
        return jsonify({
            "result": [[item.name, item.image, item.body] for item in result]
        }), 200
    return jsonify({}), 401
