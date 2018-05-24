from . import *


@coll.route('/friends')
def friends():
    return 'Friends'


@coll.route('/challenges')
def challenges():
    return 'Challenges'
