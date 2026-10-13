import os

from flask import Flask

from routes.home import home_bp
from routes.planners import planner_bp

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Static files live in /public so Vercel serves them from its CDN
# and Flask serves the same files when running locally.
app = Flask(
    __name__,
    template_folder=os.path.join(BASE_DIR, "templates"),
    static_folder=os.path.join(BASE_DIR, "public"),
    static_url_path="",
)

# Register Blueprints
app.register_blueprint(home_bp)
app.register_blueprint(planner_bp)


if __name__ == "__main__":
    app.run(debug=True)
