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
    addDataToDB()

@manager.command
def test_neo4j():
    from beedare import neoconn
    # conn.create_user(username='jelmer')
    # conn.create_dare(code='test')
    neoconn.completed_dare(username='jelmer', dare='test')
    for dare in neoconn.get_completed_dares('jelmer'):
        print(dare)


if __name__ == "__main__":
    manager.run()
