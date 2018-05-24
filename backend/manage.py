from flask_migrate import Migrate, MigrateCommand
from flask_script import Manager
from flask_sqlalchemy import SQLAlchemy

from backend.beedare import app

db = SQLAlchemy(app)  # Database instance used for SQLAlchemy
migrate = Migrate(app, db)  # Migrate instance used for migrating the database

manager = Manager(app)  # Manager instance
manager.add_command('db', MigrateCommand)


@manager.command
def test():
    print("Hello World")


if __name__ == "__main__":
    manager.run()
