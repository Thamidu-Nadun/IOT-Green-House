#include <WiFi.h>
#include <WebServer.h>
#include <DHT.h>

#define DHTPIN 4 // Pin for DHT sensor
#define DHTTYPE DHT22 // DHT sensor type (DHT22)
DHT dht(DHTPIN, DHTTYPE);

const char* ssid = "esp32"; // Wi-Fi SSID
const char* password = "12345678"; // Wi-Fi password

WebServer server(80); // Web server on port 80

// Pin assignments
#define WATERPUMP_PIN 5      // Pin controlling the water pump
#define FAN_PIN 35           // Pin controlling the fan (via MOSFET or motor driver)

// Pin for soil moisture sensor
#define SOIL_MOISTURE_PIN 34 // Pin for soil moisture sensor (ADC pin)

// Global variables
float currentHumidity = 0.0;
float currentTemperature = 0.0;
int soilMoistureValue = 0;
int soilMoisturePercentage = 0;
bool fanStatus = false;
bool pumpStatus = false;

unsigned long lastSensorReadTime = 0;
const unsigned long sensorReadInterval = 2000; // 2 seconds

// Function to update sensor data
void updateSensorData() {
    currentHumidity = dht.readHumidity();
    currentTemperature = dht.readTemperature();

    // Read soil moisture sensor
    soilMoistureValue = analogRead(SOIL_MOISTURE_PIN);
    soilMoisturePercentage = map(soilMoistureValue, 0, 4095, 0, 100);

    // Print sensor data to Serial Monitor
    Serial.println("\n[Sensor Data Update]");
    Serial.print("Temperature: ");
    Serial.print(currentTemperature);
    Serial.println(" °C");

    Serial.print("Humidity: ");
    Serial.print(currentHumidity);
    Serial.println(" %");

    Serial.print("Soil Moisture: ");
    Serial.print(soilMoisturePercentage);
    Serial.println(" %");
}

// Function to send CORS headers
void sendCorsHeaders() {
    server.sendHeader("Access-Control-Allow-Origin", "*");
    server.sendHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    server.sendHeader("Access-Control-Allow-Headers", "Content-Type");
}

// Handle humidity endpoint
void handleHumidity() {
    sendCorsHeaders();
    String jsonResponse = "{\"humidity\": " + String(currentHumidity) + ", \"unit\": \"percentage\"}";
    server.send(200, "application/json", jsonResponse);
}

// Handle temperature endpoint
void handleTemperature() {
    sendCorsHeaders();
    String jsonResponse = "{\"temperature\": " + String(currentTemperature) + ", \"unit\": \"Celsius\"}";
    server.send(200, "application/json", jsonResponse);
}

// Handle fan control
void handleFanControl() {
    sendCorsHeaders();
    if (server.arg("action") == "on") {
        fanStatus = true;
        digitalWrite(FAN_PIN, HIGH); // Turn fan ON
    } else if (server.arg("action") == "off") {
        fanStatus = false;
        digitalWrite(FAN_PIN, LOW); // Turn fan OFF
    } else {
        server.send(400, "application/json", "{\"error\": \"Invalid action\"}");
        return;
    }

    String jsonResponse = "{\"message\": \"Fan turned " + String(fanStatus ? "ON" : "OFF") + "\", \"status\": " + String(fanStatus) + "}";
    server.send(200, "application/json", jsonResponse);
}

// Handle pump control
void handlePumpControl() {
    sendCorsHeaders();
    if (server.arg("action") == "on") {
        pumpStatus = true;
        digitalWrite(WATERPUMP_PIN, HIGH); // Turn pump ON
    } else if (server.arg("action") == "off") {
        pumpStatus = false;
        digitalWrite(WATERPUMP_PIN, LOW); // Turn pump OFF
    } else {
        server.send(400, "application/json", "{\"error\": \"Invalid action\"}");
        return;
    }

    String jsonResponse = "{\"message\": \"Pump turned " + String(pumpStatus ? "ON" : "OFF") + "\", \"status\": " + String(pumpStatus) + "}";
    server.send(200, "application/json", jsonResponse);
}

// Handle soil moisture endpoint
void handleSoilEndpoint() {
    sendCorsHeaders();
    String response = "{";
    response += "\"soil_moisture\": " + String(soilMoisturePercentage) + ",";
    response += "\"unit\": \"percentage\"";
    response += "}";

    server.send(200, "application/json", response);
}

// Handle fan status endpoint
void handleFanStatus() {
    sendCorsHeaders();
    String jsonResponse = "{\"status\": " + String(fanStatus) + "}";
    server.send(200, "application/json", jsonResponse);
}

// Handle pump status endpoint
void handlePumpStatus() {
    sendCorsHeaders();
    String jsonResponse = "{\"status\": " + String(pumpStatus) + "}";
    server.send(200, "application/json", jsonResponse);
}

// Function to control the water pump based on soil moisture
void controlWaterPump() {
    if (soilMoisturePercentage < 40) {  // If soil moisture is below 40%
        digitalWrite(WATERPUMP_PIN, HIGH);  // Turn water pump ON
        pumpStatus = true;
    } else if (soilMoisturePercentage > 60) {  // If soil moisture is above 60%
        digitalWrite(WATERPUMP_PIN, LOW);  // Turn water pump OFF
        pumpStatus = false;
    }
}

// Function to control the fan based on temperature and humidity
void controlFan() {
    if (currentTemperature > 30 || currentHumidity < 60) {  // If temperature > 30°C and humidity is low
        digitalWrite(FAN_PIN, HIGH);  // Turn fan ON
        fanStatus = true;
    } else if (currentTemperature < 30 || currentHumidity > 70) {  // If temperature < 25°C or humidity > 70%
        digitalWrite(FAN_PIN, LOW);  // Turn fan OFF
        fanStatus = false;
    }
}

void setup() {
    // Initialize serial communication
    Serial.begin(115200);

    // Initialize pins
    pinMode(WATERPUMP_PIN, OUTPUT);
    pinMode(FAN_PIN, OUTPUT);
    digitalWrite(WATERPUMP_PIN, LOW);
    digitalWrite(FAN_PIN, LOW);

    // Initialize DHT sensor
    dht.begin();

    // Set up Wi-Fi as Access Point
    WiFi.softAP(ssid, password);
    Serial.println("Access Point Started");
    Serial.print("IP Address: ");
    Serial.println(WiFi.softAPIP()); // This will print the IP address of the ESP32

    // Define routes
    server.on("/humidity", handleHumidity);
    server.on("/temperature", handleTemperature);
    server.on("/switch/fan", handleFanControl); // Control fan
    server.on("/controller/pump", handlePumpControl); // Control pump
    server.on("/soil", handleSoilEndpoint);

    // Define status routes
    server.on("/switch/fan/status", HTTP_GET, handleFanStatus); // Get fan status
    server.on("/controller/pump/status", HTTP_GET, handlePumpStatus); // Get pump status

    // Start server
    server.begin();
    Serial.println("Server started");
}

void loop() {
    unsigned long currentTime = millis();

    // Update sensor data at regular intervals
    if (currentTime - lastSensorReadTime >= sensorReadInterval) {
        lastSensorReadTime = currentTime;
        updateSensorData();
    }

    // Control water pump and fan
    controlWaterPump();
    controlFan();

    // Handle client requests
    server.handleClient();
}
