#include <WiFi.h>
#include <DHT.h>
#include <WebServer.h>

// Wi-Fi credentials
const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";

// DHT11 setup
#define DHTPIN 4        // GPIO pin where the DHT11 is connected
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);

// Web server on port 80
WebServer server(80);

// Endpoint to return temperature data in JSON format
void handleTemp() {
  float temperature = dht.readTemperature(); // Read temperature in Celsius
  
  // Check if the reading is valid
  if (isnan(temperature)) {
    server.send(500, "application/json", "{\"error\":\"Failed to read temperature\"}");
    return;
  }

  // Create JSON response
  String response = "{ \"temperature\": " + String(temperature, 2) + ", \"unit\": \"Celsius\" }";
  server.send(200, "application/json", response);
}

void setup() {
  Serial.begin(115200);
  dht.begin();

  // Connect to Wi-Fi
  WiFi.begin(ssid, password);
  Serial.print("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nWi-Fi connected.");
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());

  // Define the /temp route
  server.on("/temp", HTTP_GET, handleTemp);

  // Start the server
  server.begin();
  Serial.println("Server started.");
}

void loop() {
  server.handleClient(); // Handle incoming client requests
}
