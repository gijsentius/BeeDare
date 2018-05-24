from . import *


@profile.route('/user')
def userpage():
    return "User"


@profile.route('/hive')
def hivepage():
    return "Hive"


@profile.route('/newsFeed')
def news():
    return "News feed"
