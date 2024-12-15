from flask import Flask, jsonify
from flask_cors import CORS  # Import CORS
import random
from datetime import datetime

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/')
def index():
    return "Hello World!"

@app.route('/temp', methods=['GET'])
def get_random_temperature():
    temperature = random.uniform(25, 50)
    current_time = datetime.now().strftime('%H:%M:%S.%f')[:-3]
    return jsonify({
        'temperature': round(temperature, 2),
        'unit': 'Celsius',
        'time': current_time
    })
    
@app.route('/humidity', methods=['GET'])
def get_random_soil_moisture():
    humidity = random.randint(30, 80)
    current_time = datetime.now().strftime('%H:%M:%S.%f')[:-3]
    return jsonify({
        "value": humidity,
        "unit": "percentage",
        "time": current_time
    })

@app.route('/soil', methods=['GET'])
def get_random_soil_moisture():
    soil_moisture = random.randint(30, 80)
    current_time = datetime.now().strftime('%H:%M:%S.%f')[:-3]
    return jsonify({
        "value": soil_moisture,
        "unit": "percentage",
        "time": current_time
    })

if __name__ == '__main__':
    app.run(debug=True, port=8080)
