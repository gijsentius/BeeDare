from flask import Blueprint

user_info_blueprint = Blueprint('user_info', __name__)

from . import views
