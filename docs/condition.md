# IoT Project - Ideal Conditions for Water Pump and Fan Control

In this IoT project, you'll control a **water pump** and a **fan** based on the data from sensors like **DHT11** (temperature and humidity) and a **soil moisture sensor**. Below are the ideal conditions for controlling these devices.

## 1. Water Pump Control (Based on Soil Moisture)
The water pump should be activated when the soil moisture level falls below a certain threshold, indicating dry soil. It should be deactivated when the moisture level is sufficient.

### Ideal Conditions for Water Pump:
- **Soil Moisture Threshold**:
  - **Activate Water Pump**: If the soil moisture is below **40%** (dry soil).
  - **Deactivate Water Pump**: If the soil moisture is above **60%** (sufficient moisture).

### Example Logic for Water Pump:
```cpp
if (soilMoisture < 40) {  // If soil moisture is below 40%
  turnOnWaterPump();
} else if (soilMoisture > 60) {  // If soil moisture is above 60%
  turnOffWaterPump();
}
```

## 2. Fan Control (Based on Temperature and Humidity)
The fan can be used to regulate the temperature and humidity in the environment. The fan should be activated when the temperature is too high or the humidity is out of the ideal range.

### Ideal Conditions for Fan:
- **Temperature Threshold**:
  - **Activate Fan**: If the temperature exceeds **30°C** (to cool down).
  - **Deactivate Fan**: If the temperature drops below **25°C**.

- **Humidity Threshold**:
  - **Activate Fan**: If the humidity exceeds **70%** (to reduce moisture and prevent mold).
  - **Deactivate Fan**: If the humidity drops below **50%** (for better air circulation).

### Example Logic for Fan:
```cpp
if (temperature > 30 && humidity < 60) {  // If temperature is > 30°C and humidity is low
  turnOnFan();
} else if (temperature < 25 || humidity > 70) {  // If temperature is < 25°C or humidity is > 70%
  turnOffFan();
}
```

## 3. Combined Conditions for Fan and Water Pump
You can combine the readings from the **DHT11** and **soil moisture sensor** to activate the **fan** and **water pump** under ideal conditions. For instance:
- The **water pump** only activates if the soil is dry and the temperature is within an acceptable range (not too hot).
- The **fan** activates if the temperature is too high or humidity is outside the ideal range.

### Sample Pseudocode:
```cpp
// Assume these values are obtained from your sensors:
float temperature = getTemperatureFromDHT11();  // Temperature from DHT11
float humidity = getHumidityFromDHT11();        // Humidity from DHT11
int soilMoisture = getSoilMoisture();           // Soil moisture level

// Ideal conditions for water pump
if (soilMoisture < 40) {  // If soil moisture is below 40%
  turnOnWaterPump();
} else if (soilMoisture > 60) {  // If soil moisture is above 60%
  turnOffWaterPump();
}

// Ideal conditions for fan control
if (temperature > 30 && humidity < 60) {  // If temperature is > 30°C and humidity is low
  turnOnFan();
} else if (temperature < 25 || humidity > 70) {  // If temperature is < 25°C or humidity is > 70%
  turnOffFan();
}
```

## 4. Considerations for Ideal Conditions
### Water Pump:
- **Soil Moisture Levels**: Ideal soil moisture levels vary depending on the type of plant. For many plants, a moisture level between **40-60%** is optimal.
- Adjust the thresholds based on plant needs.

### Fan:
- **Temperature**: In a greenhouse or controlled environment, ideal temperatures are usually between **20°C-30°C**. The fan helps reduce temperature when it exceeds **30°C**.
- **Humidity**: The ideal humidity for most plants is **50-70%**. If it exceeds **70%**, the fan can help reduce moisture, and if it’s below **50%**, the fan can help circulate air.

### IoT Automation:
- You can integrate this system with a **web** or **mobile app** to monitor and control the water pump and fan remotely.
- **Relay** or **MOSFET** can be used to control the power to the water pump and fan based on the thresholds.

## Final Summary of Ideal Conditions:
### Water Pump:
- **Activate** if soil moisture < **40%**.
- **Deactivate** if soil moisture > **60%**.

### Fan:
- **Activate** if temperature > **30°C**, or humidity > **70%**.
- **Deactivate** if temperature < **25°C** or humidity < **50%**.

With these ideal conditions in place, your IoT system will automatically manage the water pump and fan based on real-time environmental data!

---
