from . import *


@profile.route('/user')
def user():
    return "User"


@profile.route('/hive')
def hive():
    return "Hive"


@profile.route('/newsFeed')
def news():
    return "News feed"
