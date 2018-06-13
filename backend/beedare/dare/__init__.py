from flask import Blueprint

dares_blueprint = Blueprint('dares', __name__)

from . import views