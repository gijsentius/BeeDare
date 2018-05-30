from flask import request, jsonify

from backend.beedare import db
from backend.beedare.models import User, Dare, Hive
from . import *


@search_blueprint.route('/', methods=['GET'])
def search():
    return jsonify({}), 200


@search_blueprint.route('/users/<query>', methods=['POST'])
def search_users(query):
    result = db.session.query(User).filter_by(username=query)
    if result is not None:
        return jsonify({
            "result": result
        }), 200
    return jsonify({}), 401


@search_blueprint.route('/hives/<query>', methods=['POST'])
def search_hives(query):
    result = db.session.query(Hive).filter_by(hive_name=query)
    if result is not None:
        return jsonify({
            "result": result
        }), 200
    return jsonify({}), 401


@search_blueprint.route('/challenges/<query>', methods=['POST'])
def search_challenges(query):
    result = db.session.query(Dare).filter_by(name=query)
    if result is not None:
        return jsonify({
            "result": result
        }), 200
    return jsonify({}), 401
