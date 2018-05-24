from flask_migrate import Migrate, MigrateCommand
from flask_script import Manager
from flask_sqlalchemy import SQLAlchemy
from backend.beedare import app

""""
$ flask db init -> creates a migration repo
$ flask db migrate -> create initial migration (review the migration script after creation)
$ flask db upgrade -> applies the migration to the database

Each time the database model changes, repeat the migrate and upgrade commands

$ flask --help to see all commands 
"""

db = SQLAlchemy(app)  # Database instance used for SQLAlchemy
migrate = Migrate(app, db)  # Migrate instance used for migrating the database

manager = Manager(app)  # Manager instance
manager.add_command('db', MigrateCommand)


@manager.command
def test():
    print("Hello World")


if __name__ == "__main__":
    manager.run()
