from flask import Blueprint
from backend.beedare import models


admin = Blueprint('admin', __name__)


@admin.route('/')
def index():
    return "Admin"
