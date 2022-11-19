from flask import Flask
from app.extensions import db, session, cors
from app.config import ApplicationConfig

def create_app():
    app = Flask(__name__)
    app.config.from_object(ApplicationConfig)
    
    # Initialize flask extension objects
    initialize_extensions(app)
    
    # Register routes
    register_blueprints(app)
    
    
    return app

### Helper Functions ###
def register_blueprints(app):
    with app.app_context():
        from routes.auth import auth
        app.register_blueprint(auth)
        from routes.cms import cms
        app.register_blueprint(cms)
    
    
def initialize_extensions(app):
    db.init_app(app)
    session.init_app(app)
    cors.init_app(app, supports_credentials=True)