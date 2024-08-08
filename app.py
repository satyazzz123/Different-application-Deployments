from flask import Flask, request, jsonify  # Import necessary modules from Flask
from pymongo import MongoClient  # Import MongoClient to interact with MongoDB
from datetime import datetime  # Import datetime to get the current time
import os  # Import os to access environment variables

# Initialize the Flask application
app = Flask(__name__)

# Fetch MongoDB credentials from environment variables
mongo_user = os.environ.get("MONGODB_USER", "your_username")
mongo_password = os.environ.get("MONGODB_PASSWORD", "your_password")
mongo_host = os.environ.get("MONGODB_HOST", "localhost")
mongo_dbname = os.environ.get("MONGODB_DBNAME", "flask_db")

# Set up the MongoDB client with authentication
client = MongoClient(f"mongodb://{mongo_user}:{mongo_password}@{mongo_host}:27018/{mongo_dbname}?authSource=admin")

# Connect to the database
db = client[mongo_dbname]

# Connect to the collection named 'data' within the 'flask_db' database
collection = db.data

# Define the route for the root URL
@app.route('/')
def index():
    # Return a welcome message with the current time
    return f"Welcome to the Flask app! The current time is: {datetime.now()}"

# Define the route for the '/data' endpoint
# This endpoint supports both GET and POST methods
@app.route('/data', methods=['GET', 'POST'])
def data():
    if request.method == 'POST':
        # If the request method is POST, get the JSON data from the request
        data = request.get_json()
        # Insert the data into the 'data' collection in MongoDB
        collection.insert_one(data)
        # Return a success message with status code 201 (Created)
        return jsonify({"status": "Data inserted"}), 201
    elif request.method == 'GET':
        # If the request method is GET, retrieve all documents from the 'data' collection
        # Convert the documents to a list, excluding the '_id' field
        data = list(collection.find({}, {"_id": 0}))
        # Return the data as a JSON response with status code 200 (OK)
        return jsonify(data), 200

# Run the Flask application
# The application will listen on all available IP addresses (0.0.0.0) and port 5000
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
