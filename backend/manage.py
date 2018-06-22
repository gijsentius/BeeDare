import os
from dotenv import load_dotenv


dotenv_path = os.path.join(os.path.dirname(__file__), '.env')
if os.path.exists(dotenv_path):
    load_dotenv(dotenv_path)

from flask_migrate import Migrate, MigrateCommand
from flask_script import Manager
from beedare import create_app, create_admin
from beedare import db

app = create_app(os.getenv('FLASK_CONFIG') or 'default')
admin = create_admin(app, db)
migrate = Migrate(app, db)  # Migrate instance used for migrating the database
manager = Manager(app)  # Manager instance
manager.add_command('db', MigrateCommand)


@manager.command
def test():
    from beedare.fill_database import addDataToDB
#     from beedare.makeOneUser import addUserWithPassToDB
    # from beedare.models import User
    # user = User(first_name="Dit is", last_name="Een Test")
    # db.session.add(user)
    # db.session.commit()
    addDataToDB()
#     addUserWithPassToDB()


if __name__ == "__main__":
    manager.run()
