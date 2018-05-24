from . import *


@coll_blueprint.route('/friends')
def friends():
    return 'Friends'


@coll_blueprint.route('/challenges')
def challenges():
    return 'Challenges'
