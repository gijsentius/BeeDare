from flask import request, jsonify

from backend.beedare import db
from backend.beedare.models import User, Dare, Hive
from . import *


@search_blueprint.route('/', methods=['GET'])
def search():
    # TODO
    return 'Search'


@search_blueprint.route('/users/<query>', methods=['POST'])
def search_users(query):
    if request.method == 'POST':
        result = db.session.query(User).filter_by(username=query)
        if result is not None:
            return jsonify({
                "result": result
            })
        return "No results found"
    return 'Users'


@search_blueprint.route('/hives/<query>', methods=['POST'])
def search_hives(query):
    if request.method == 'POST':
        result = db.session.query(Hive).filter_by(hive_name=query)
        if result is not None:
            return jsonify({
                "result": result
            })
        return "No results found"
    return 'Hives'


@search_blueprint.route('/challenges/<query>', methods=['POST'])
def search_challenges(query):
    if request.method == 'POST':
        result = db.session.query(Dare).filter_by(name=query)
        if result is not None:
            return jsonify({
                "result": result
            })
        return "No results found"
    return 'Challenges'
