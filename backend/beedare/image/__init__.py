from flask import Blueprint

image_blueprint = Blueprint('image', __name__)

from . import views
