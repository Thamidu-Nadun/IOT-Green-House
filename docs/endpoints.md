Here’s the JSON data returned by each endpoint in the code:

---

### **1. `/humidity` Endpoint**
Returns the current humidity value.

#### JSON Example:
```json
{
  "humidity": 45.5,
  "unit": "percentage"
}
```
- **`humidity`**: The humidity value (in percentage).
- **`unit`**: The unit of measurement.

---

### **2. `/temperature` Endpoint**
Returns the current temperature value.

#### JSON Example:
```json
{
  "temperature": 27.3,
  "unit": "Celsius"
}
```
- **`temperature`**: The temperature value (in Celsius).
- **`unit`**: The unit of measurement.

---

### **3. `/soil` Endpoint**
Returns the soil moisture value.

#### JSON Example:
```json
{
  "soil_moisture": "35%",
  "unit": "percentage"
}
```
- **`soil_moisture`**: The soil moisture percentage as a string.
- **`unit`**: The unit of measurement.

---

### **4. `/switch/fan` Endpoint**
Allows controlling the fan. The response depends on the action taken.

#### JSON Example (Fan Turned ON):
```json
{
  "message": "Fan turned ON",
  "status": true
}
```

#### JSON Example (Fan Turned OFF):
```json
{
  "message": "Fan turned OFF",
  "status": false
}
```
- **`message`**: Describes the action taken.
- **`status`**: The fan's current status (`true` for ON, `false` for OFF).

---

### **5. `/controller/pump` Endpoint**
Allows controlling the water pump. The response depends on the action taken.

#### JSON Example (Pump Turned ON):
```json
{
  "message": "Pump turned ON",
  "status": true
}
```

#### JSON Example (Pump Turned OFF):
```json
{
  "message": "Pump turned OFF",
  "status": false
}
```
- **`message`**: Describes the action taken.
- **`status`**: The pump's current status (`true` for ON, `false` for OFF`).

---

Let me know if you'd like to enhance the response further, such as including timestamps or additional data!