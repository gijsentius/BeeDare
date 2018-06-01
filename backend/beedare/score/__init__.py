from flask import Blueprint

score_blueprint = Blueprint('score', __name__)

from . import views
