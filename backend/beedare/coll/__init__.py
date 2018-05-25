from flask import Blueprint

coll_blueprint = Blueprint('coll', __name__)

from . import views
