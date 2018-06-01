from flask import Flask
from flask_login import LoginManager
from flask_sqlalchemy import SQLAlchemy
from backend.config import config, MailConfig

db = SQLAlchemy()  # Database instance used for SQLAlchemy
login_manager = LoginManager()


def create_app(config_type):
    app = Flask(__name__)
    app.config.from_object(config[config_type])
    app.config.from_object(MailConfig)
    db.init_app(app)
    login_manager.init_app(app)

    from backend.beedare.admin import admin
    from backend.beedare.auth import auth_blueprint
    from backend.beedare.coll import coll_blueprint
    from backend.beedare.landing import landing
    from backend.beedare.main import main
    from backend.beedare.search import search_blueprint
    from backend.beedare.user import profile_blueprint
    from backend.beedare.delete import delete_blueprint
    from backend.beedare.hive import hive_blueprint
    from backend.beedare.score import score_blueprint
    from backend.beedare.submit import submit_blueprint

    app.register_blueprint(main, url_prefix='/')
    app.register_blueprint(admin, url_prefix='/admin')
    app.register_blueprint(landing, url_prefix='/landing')
    app.register_blueprint(auth_blueprint, url_prefix='/auth')
    app.register_blueprint(coll_blueprint, url_prefix='/coll')
    app.register_blueprint(search_blueprint, url_prefix='/search')
    app.register_blueprint(profile_blueprint, url_prefix='/profile')
    app.register_blueprint(delete_blueprint, url_prefix='/delete')
    app.register_blueprint(hive_blueprint, url_prefix='/hive')
    app.register_blueprint(score_blueprint, url_prefix='/score')
    app.register_blueprint(submit_blueprint, url_prefix='/submit')

    return app
