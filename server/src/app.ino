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
#define RELAY_PIN 5      // Pin controlling the relay for the water pump
#define FAN_PIN 16       // Pin controlling the fan (via MOSFET or relay)

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

// Handle humidity endpoint
void handleHumidity() {
    String jsonResponse = "{\"humidity\": " + String(currentHumidity) + ", \"unit\": \"percentage\"}";
    server.send(200, "application/json", jsonResponse);
}

// Handle temperature endpoint
void handleTemperature() {
    String jsonResponse = "{\"temperature\": " + String(currentTemperature) + ", \"unit\": \"Celsius\"}";
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

    String jsonResponse = "{\"message\": \"Fan turned " + String(fanStatus ? "ON" : "OFF") + "\", \"status\": " + String(fanStatus) + "}";
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

    String jsonResponse = "{\"message\": \"Pump turned " + String(pumpStatus ? "ON" : "OFF") + "\", \"status\": " + String(pumpStatus) + "}";
    server.send(200, "application/json", jsonResponse);
}

// Handle soil moisture endpoint
void handleSoilEndpoint() {
    String response = "{";
    response += "\"soil_moisture\": \"" + String(soilMoisturePercentage) + "%%\",";
    response += "\"unit\": \"percentage\"";
    response += "}";

    server.send(200, "application/json", response);
}

// Function to control the water pump based on soil moisture
void controlWaterPump() {
    if (soilMoisturePercentage < 40) {  // If soil moisture is below 40%
        digitalWrite(RELAY_PIN, HIGH);  // Turn water pump ON
        pumpStatus = true;
    } else if (soilMoisturePercentage > 60) {  // If soil moisture is above 60%
        digitalWrite(RELAY_PIN, LOW);  // Turn water pump OFF
        pumpStatus = false;
    }
}

// Function to control the fan based on temperature and humidity
void controlFan() {
    if (currentTemperature > 30 && currentHumidity < 60) {  // If temperature > 30°C and humidity is low
        digitalWrite(FAN_PIN, HIGH);  // Turn fan ON
        fanStatus = true;
    } else if (currentTemperature < 25 || currentHumidity > 70) {  // If temperature < 25°C or humidity > 70%
        digitalWrite(FAN_PIN, LOW);  // Turn fan OFF
        fanStatus = false;
    }
}

void setup() {
    // Initialize serial communication
    Serial.begin(115200);

    // Initialize pins
    pinMode(RELAY_PIN, OUTPUT);
    pinMode(FAN_PIN, OUTPUT);
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
    server.on("/soil", handleSoilEndpoint);

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
