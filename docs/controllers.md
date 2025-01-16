# API Documentation

## Overview
This API provides control over two devices:
1. A fan
2. A water pump

### Base URL
```
http://localhost:3000
```

## Endpoints

### 1. Fan Control

#### **Control Fan**

**POST** `/switch/fan/<action>`

**Description:**
Allows you to turn the fan ON or OFF.

**Parameters:**
- `<action>`: The action to perform, either `on` or `off`.

**Request Example:**
```bash
curl -X POST http://localhost:3000/switch/fan/on
```

**Response Example:**
- On Success:
```json
{
  "id": 2,
  "message": "Fan turned ON.",
  "status": true
}
```
- On Error:
```json
{
  "error": "Invalid action"
}
```

---

#### **Get Fan Status**

**GET** `/switch/fan/status`

**Description:**
Fetches the current status of the fan (ON or OFF).

**Request Example:**
```bash
curl -X GET http://localhost:3000/switch/fan/status
```

**Response Example:**
```json
{
  "status": true
}
```

---

### 2. Water Pump Control

#### **Control Water Pump**

**POST** `/controller/pump/<action>`

**Description:**
Allows you to turn the water pump ON or OFF.

**Parameters:**
- `<action>`: The action to perform, either `on` or `off`.

**Request Example:**
```bash
curl -X POST http://localhost:3000/controller/pump/on
```

**Response Example:**
- On Success:
```json
{
  "id": 32,
  "message": "Pump turned ON.",
  "status": true
}
```
- On Error:
```json
{
  "error": "Invalid action"
}
```

---

#### **Get Water Pump Status**

**GET** `/controller/pump/status`

**Description:**
Fetches the current status of the water pump (ON or OFF).

**Request Example:**
```bash
curl -X GET http://localhost:3000/controller/pump/status
```

**Response Example:**
```json
{
  "status": false
}
```

---

## Error Handling

### Common Errors
- **Invalid Action:**
  - Status Code: `400`
  - Response Example:
    ```json
    {
      "error": "Invalid action"
    }
    ```

