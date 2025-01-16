from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS

# In-memory status tracking
device_status = {
    "fan": False,  # Initially off
    "water_pump": False  # Initially off
}

# Fan Control
@app.route('/switch/fan/<action>', methods=['POST'])
def control_fan(action):
    if action not in ['on', 'off']:
        return jsonify({"error": "Invalid action"}), 400

    # Update the device status
    device_status['fan'] = (action == 'on')

    # Log the action
    print(f"Fan turned {'ON' if action == 'on' else 'OFF'}.")

    return jsonify({
        "id": 2,
        "message": f"Fan turned {'ON' if action == 'on' else 'OFF'}.",
        "status": device_status['fan']
    })

@app.route('/switch/fan/status', methods=['GET'])
def get_fan_status():
    return jsonify({
        "status": device_status['fan']
    })

# Water Pump Control
@app.route('/controller/pump/<action>', methods=['POST'])
def control_pump(action):
    if action not in ['on', 'off']:
        return jsonify({"error": "Invalid action"}), 400

    # Update the device status
    device_status['water_pump'] = (action == 'on')

    # Log the action
    print(f"Pump turned {'ON' if action == 'on' else 'OFF'}.")

    return jsonify({
        "id": 32,
        "message": f"Pump turned {'ON' if action == 'on' else 'OFF'}.",
        "status": device_status['water_pump']
    })

@app.route('/controller/pump/status', methods=['GET'])
def get_pump_status():
    return jsonify({
        "status": device_status['water_pump']
    })

if __name__ == '__main__':
    app.run(debug=True, port=3000)
