from . import *


@profile_blueprint.route('/user')
def user():
    return "User"


@profile_blueprint.route('/hive')
def hive():
    return "Hive"


@profile_blueprint.route('/newsFeed')
def news():
    return "News feed"
