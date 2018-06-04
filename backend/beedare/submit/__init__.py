from flask import Blueprint

submit_blueprint = Blueprint('submit', __name__)

from . import views
