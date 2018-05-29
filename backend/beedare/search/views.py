from . import *


@search_blueprint.route('/')
def search():
    return 'Search'


@search_blueprint.route('/users/<query>', methods=['POST'])
def search_users(query):
    return 'Users'


@search_blueprint.route('/hives/<query>', methods=['POST'])
def search_hives(query):
    return 'Hives'


@search_blueprint.route('/challenges/<query>', methods=['POST'])
def search_challenges(query):
    return 'Challenges'
