from flask_login import login_required

from . import *


@profile_blueprint.route('/user/<id>', methods=['POST'])
@login_required
def user(id):
    return "User"


@profile_blueprint.route('/hive/<id>', methods=['POST'])
@login_required
def hive(id):
    return "Hive"


@profile_blueprint.route('/newsFeed/<id>', methods=['POST'])
@login_required
def news(id):
    return "News feed"
