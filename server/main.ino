#include <WiFi.h>
#include <WebServer.h>
#include <DHT.h>

#define DHTPIN 4 // The Pin For DHT SEnsor
#define DHTTYPE DHT11 // Define The DHT11 Sensor
DHT dht(DHTPIN, DHTTYPE);

const char* ssid = "esp32";
const char* password = "12345678";
WebServer server(80); // Litesn on PORT 80/http

// Function to get humidity
float getCurrentHumidity() {
    return dht.readHumidity();
}

// Handle the /humidity endpoint
void handleHumidity() {
    float humidity = getCurrentHumidity();
    String jsonResponse = "{\"humidity\": " + String(humidity) + ", \"unit\": \"percentage\"}";
    server.send(200, "application/json", jsonResponse);
}

void setup() {
    Serial.begin(115200);
    dht.begin();
    
    // Setting up ESP32 as an access point
    WiFi.softAP(ssid, password);
    Serial.println("Access Point Started");
    Serial.print("IP Address: ");
    Serial.println(WiFi.softAPIP());

    // Define the route for /humidity
    server.on("/humidity", handleHumidity);
    
    // Start server
    server.begin();
}

void loop() {
    server.handleClient();
    delay(1000);  // Prevents flooding the serial monitor with data
    Serial.print("Current Humidity: ");
    Serial.println(getCurrentHumidity());
}