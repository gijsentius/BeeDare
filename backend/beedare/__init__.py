from flask import Flask
from backend.beedare.main.controllers import *
from backend.beedare.admin.controllers import *
from backend.beedare.pages.controllers import *

app = Flask(__name__)

app.register_blueprint(main, url_prefix='/')
app.register_blueprint(admin, url_prefix='/admin')
app.register_blueprint(login, url_prefix='/login')
app.register_blueprint(profile, url_prefix='/profile')
app.register_blueprint(landing, url_proefix='/landing')
