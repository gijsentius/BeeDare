from flask import Blueprint

delete_blueprint = Blueprint('delete', __name__)

from . import views
