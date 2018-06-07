from flask import request, jsonify

from beedare import db
from beedare.models import User, Dare, Hive
from . import *


@search_blueprint.route('/', methods=['GET'])
def search():
    return jsonify({}), 200


@search_blueprint.route('/users', methods=['POST'])
def search_users():
    content = request.get_json()
    try:
        result = db.session.query(User).filter_by(username=content['query']).all()
    except KeyError as e:
        return jsonify({"error": str(e) + " not given or invalid"}), 401
    if result is not None:
        return jsonify({
            "result": [[item.username, item.first_name, item.last_name] for item in result]
        }), 200
    return jsonify({}), 401


@search_blueprint.route('/hives', methods=['POST'])
def search_hives():
    content = request.get_json()
    try:
        result = db.session.query(Hive).filter_by(hive_name=content['query']).all()
    except KeyError as e:
        return jsonify({"error": str(e) + " not given or invalid"}), 401
    if result is not None:
        return jsonify({
            "result": [[item.hive_name, item.image, item.total_score_members, item.beekeeper] for item in result]
        }), 200
    return jsonify({}), 401


@search_blueprint.route('/challenges', methods=['POST'])
def search_challenges():
    content = request.get_json()
    try:
        result = db.session.query(Dare).filter_by(name=content['query']).all()
    except KeyError as e:
        return jsonify({"error": str(e) + " not given or invalid"}), 401
    if result is not None:
        return jsonify({
            "result": [[item.name, item.image, item.body] for item in result]
        }), 200
    return jsonify({}), 401
