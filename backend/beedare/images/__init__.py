from flask import Blueprint

image_blueprint = Blueprint('images', __name__)

from . import views
