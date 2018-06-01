from flask import Blueprint

hive_blueprint = Blueprint('hive', __name__)

from . import views
