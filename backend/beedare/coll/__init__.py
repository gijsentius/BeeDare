from flask import Blueprint

coll = Blueprint('coll', __name__)

from . import views
