from . import *


@admin.route('/')
def index():
    return "Admin"
