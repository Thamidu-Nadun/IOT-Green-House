#include <WiFi.h>
#include <WebServer.h>
#include <DHT.h>

#define DHTPIN 4 // Pin for DHT sensor
#define DHTTYPE DHT11 // DHT sensor type
DHT dht(DHTPIN, DHTTYPE);

const char* ssid = "esp32"; // Wi-Fi SSID
const char* password = "12345678"; // Wi-Fi password

WebServer server(80); // Web server on port 80

// Pin assignments
#define RELAY_PIN 5      // Pin controlling the relay for the water pump
#define FAN_PIN 6        // Pin controlling the fan (via MOSFET or motor driver)

// Global variables
float currentHumidity = 0.0;
float currentTemperature = 0.0;
bool fanStatus = false;
bool pumpStatus = false;

// Function to update sensor data
void updateSensorData() {
    currentHumidity = dht.readHumidity();
    currentTemperature = dht.readTemperature();
}

// Handle humidity endpoint
void handleHumidity() {
    String jsonResponse = "{\\"humidity\\": " + String(currentHumidity) + ", \\"unit\\": \\"percentage\\"}";
    server.send(200, "application/json", jsonResponse);
}

// Handle temperature endpoint
void handleTemperature() {
    String jsonResponse = "{\\"temperature\\": " + String(currentTemperature) + ", \\"unit\\": \\"Celsius\\"}";
    server.send(200, "application/json", jsonResponse);
}

// Handle fan control
void handleFanControl() {
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

    String jsonResponse = "{\\"message\\": \\"Fan turned " + String(fanStatus ? "ON" : "OFF") + "\\", \\"status\\": " + String(fanStatus) + "}";
    server.send(200, "application/json", jsonResponse);
}

// Handle water pump control
void handlePumpControl() {
    if (server.arg("action") == "on") {
        pumpStatus = true;
        digitalWrite(RELAY_PIN, HIGH); // Turn pump ON
    } else if (server.arg("action") == "off") {
        pumpStatus = false;
        digitalWrite(RELAY_PIN, LOW); // Turn pump OFF
    } else {
        server.send(400, "application/json", "{\"error\": \"Invalid action\"}");
        return;
    }

    String jsonResponse = "{\\"message\\": \\"Pump turned " + String(pumpStatus ? "ON" : "OFF") + "\\", \\"status\\": " + String(pumpStatus) + "}";
    server.send(200, "application/json", jsonResponse);
}

void setup() {
    // Initialize serial communication
    Serial.begin(115200);

    // Initialize pins
    pinMode(RELAY_PIN, OUTPUT);
    pinMode(FAN_PIN, OUTPUT);

    // Turn off devices initially
    digitalWrite(RELAY_PIN, LOW);
    digitalWrite(FAN_PIN, LOW);

    // Initialize DHT sensor
    dht.begin();

    // Set up Wi-Fi
    WiFi.softAP(ssid, password);
    Serial.println("Access Point Started");
    Serial.print("IP Address: ");
    Serial.println(WiFi.softAPIP());

    // Define routes
    server.on("/humidity", handleHumidity);
    server.on("/temperature", handleTemperature);
    server.on("/switch/fan", handleFanControl);
    server.on("/controller/pump", handlePumpControl);

    // Start server
    server.begin();
    Serial.println("Server started");
}

void loop() {
    // Update sensor data
    updateSensorData();

    // Handle client requests
    server.handleClient();

    // Optional delay to reduce frequency of sensor reads
    delay(2000);
}
