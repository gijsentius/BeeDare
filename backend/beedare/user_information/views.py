from flask import jsonify
from flask_login import login_required

from backend.beedare import db
from . import *


@user_info_blueprint.route('/change', methods=["POST"])
def change():
    return None

