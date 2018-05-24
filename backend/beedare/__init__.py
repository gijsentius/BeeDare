from flask import Flask

from backend.beedare.admin import admin
from backend.beedare.auth import *
from backend.beedare.auth.views import *
from backend.beedare.coll import *
from backend.beedare.coll.views import friends, challenges
from backend.beedare.landing import landing
from backend.beedare.main import main
from backend.beedare.search import search
from backend.beedare.user import *
from backend.beedare.user.views import hive, news

app = Flask(__name__)

app.register_blueprint(main, url_prefix='/')
app.register_blueprint(admin, url_prefix='/admin')
app.register_blueprint(landing, url_prefix='/')
app.register_blueprint(login, url_prefix='/profile')
app.register_blueprint(register, url_prefix='/profile')
app.register_blueprint(friends, url_prefix='/coll')
app.register_blueprint(challenges, url_prefix='/coll')
app.register_blueprint(search, url_prefix='/')
app.register_blueprint(user, url_prefix='/profile')
app.register_blueprint(hive, url_prefix='/profile')
app.register_blueprint(news, url_prefix='/profile')

