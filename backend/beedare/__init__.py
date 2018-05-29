from flask import Flask
from flask_login import LoginManager
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()  # Database instance used for SQLAlchemy
login_manager = LoginManager()


def create_app():
    app = Flask(__name__)
    """Leave app init + app.config together like this to prevent warnings"""
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'  # Removes warning
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  # Removes warning

    db.init_app(app)
    login_manager.init_app(app)

    from backend.beedare.admin import admin
    from backend.beedare.auth import auth_blueprint
    from backend.beedare.coll import coll_blueprint
    from backend.beedare.landing import landing
    from backend.beedare.main import main
    from backend.beedare.search import search_blueprint
    from backend.beedare.user import profile_blueprint

    app.register_blueprint(main, url_prefix='/')
    app.register_blueprint(admin, url_prefix='/admin')
    app.register_blueprint(landing, url_prefix='/landing')
    app.register_blueprint(auth_blueprint, url_prefix='/auth')
    app.register_blueprint(coll_blueprint, url_prefix='/coll')
    app.register_blueprint(search_blueprint, url_prefix='/search')
    app.register_blueprint(profile_blueprint, url_prefix='/profile')

    return app
