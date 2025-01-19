#include <WiFi.h>
#include <ESPAsyncWebServer.h>
#include <DHT.h>

#define POT_PIN 5
#define FAN_PIN 16
#define DHT_PIN 17
#define PUMP_PIN 18

#define DHT_TYPE DHT22
DHT dht(DHT_PIN, DHT_TYPE);

// Global variables to keep track of fan and pump status
bool fanStatus = false;
bool pumpStatus = false;

// WiFi credentials
const char* ssid = "your_SSID";
const char* password = "your_PASSWORD";

// Function for fan Control
void turnOnFan(bool &fan_status, int FAN_PIN){
  if (fan_status){
    Serial.println("Fan is already turned ON");
  }else{
    digitalWrite(FAN_PIN, HIGH);
    fan_status = true;
    Serial.println("Fan is turned ON");
  }
}

void turnOffFan(bool &fan_status, int FAN_PIN){
  if (!fan_status){
    Serial.println("Fan is already turned OFF");
  }else{
    digitalWrite(FAN_PIN, LOW);
    fan_status = false;
    Serial.println("Fan is turned OFF");
  }
}

// Function for pump Control
void turnOnPump(bool &pump_status, int PUMP_PIN){
  if (pump_status){
    Serial.println("PUMP is already turned ON");
  }else{
    digitalWrite(PUMP_PIN, HIGH);
    pump_status = true;
    Serial.println("PUMP is turned ON");
  }
}

void turnOffPump(bool &pump_status, int PUMP_PIN){
  if (!pump_status){
    Serial.println("PUMP is already turned OFF");
  }else{
    digitalWrite(PUMP_PIN, LOW);
    pump_status = false;
    Serial.println("PUMP is turned OFF");
  }
}

// Automate Control (same logic as before)
void Automate(float temperature, float humidity, bool &fanStatus, byte FAN_PIN, bool &pumpStatus, byte PUMP_PIN, int soilMoisture){
  // FAN
  if (temperature > 30 || humidity < 50){
    turnOnFan(fanStatus, FAN_PIN);
  }else{
    turnOffFan(fanStatus, FAN_PIN);
  }

  // PUMP (using soilMoisture value)
  if (soilMoisture < 60){  // You can modify this condition as per your sensor's behavior
    turnOnPump(pumpStatus, PUMP_PIN);
  }else{
    turnOffPump(pumpStatus, PUMP_PIN);
  }
}

AsyncWebServer server(80);  // Initialize the web server on port 80

void setup(){
  Serial.begin(115200);
  dht.begin();
  
  pinMode(POT_PIN, INPUT);
  pinMode(FAN_PIN, OUTPUT);
  pinMode(PUMP_PIN, OUTPUT);

  // Connect to WiFi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");

  // Serve the control routes
  server.on("/fan/on", HTTP_GET, [](AsyncWebServerRequest *request){
    turnOnFan(fanStatus, FAN_PIN);
    request->send(200, "text/plain", "Fan turned ON");
  });

  server.on("/fan/off", HTTP_GET, [](AsyncWebServerRequest *request){
    turnOffFan(fanStatus, FAN_PIN);
    request->send(200, "text/plain", "Fan turned OFF");
  });

  server.on("/pump/on", HTTP_GET, [](AsyncWebServerRequest *request){
    turnOnPump(pumpStatus, PUMP_PIN);
    request->send(200, "text/plain", "Pump turned ON");
  });

  server.on("/pump/off", HTTP_GET, [](AsyncWebServerRequest *request){
    turnOffPump(pumpStatus, PUMP_PIN);
    request->send(200, "text/plain", "Pump turned OFF");
  });

  // Start the server
  server.begin();
}

void loop(){
  // Read temperature and humidity from DHT sensor
  float temperature = dht.readTemperature();
  float humidity = dht.readHumidity();

  // Read potentiometer value (0-4095) to simulate soil moisture
  int potValue = analogRead(POT_PIN);

  // Check if reading from the DHT sensor is successful
  if (isnan(temperature) || isnan(humidity)) {
    Serial.println("Failed to read from DHT sensor!");
  } else {
    // Print temperature and humidity data
    Serial.print("Temperature: ");
    Serial.print(temperature);
    Serial.print(" °C  | Humidity: ");
    Serial.print(humidity);
    Serial.print(" %  | ");
  }

  // Print potentiometer data (mapped to a percentage)
  float potPercentage = (potValue / 4095.0) * 100;  // Convert to percentage
  Serial.print("Potentiometer (simulating soil moisture): ");
  Serial.print(potPercentage);
  Serial.println(" %");

  // Automate fan and pump control based on temperature, humidity, and soil moisture
  Automate(temperature, humidity, fanStatus, FAN_PIN, pumpStatus, PUMP_PIN, potValue);

  delay(2000);  // Delay for 2 seconds
}