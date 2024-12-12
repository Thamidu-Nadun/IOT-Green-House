# **Automated Greenhouse IoT System 🌱🌡️💧**

Welcome to the **Automated Greenhouse IoT System** repository! This project enables you to **monitor and control temperature, humidity**, and **soil moisture** in a greenhouse environment through a **web-based dashboard**. The system uses **ESP32** for hardware communication and **React** for the web frontend, creating a seamless interface for users to interact with their greenhouse setup.

---

## **🚀 Project Overview**

This project aims to create an automated system for managing and monitoring a greenhouse environment. By integrating **IoT sensors** (for temperature, humidity, and soil moisture) with **ESP32** and **ReactJS**, users can easily manage their greenhouse conditions remotely.

### **Key Features:**
- **Real-time Monitoring**: View live data on temperature, humidity, and soil moisture levels.
- **Automated Control**: Control greenhouse actuators (fans, pumps, lights) remotely via the web interface.
- **Data Logging**: Track historical data for performance insights.
- **Mobile-Friendly Dashboard**: Responsive React app that works on both desktop and mobile devices.

---

## **🛠️ Components & Hardware**

### **MicroController:**
- **ESP32** (with Wi-Fi support)

### **Sensors:**
- **DHT22** (Temperature & Humidity Sensor)
- **Capacitive Soil Moisture Sensor**

### **Actuators:**
- **5V or 12V Relay Module** (for controlling fans, water pumps, etc.)

### **Power Supply:**
- **5V USB Power Adapter** (for ESP32)
- **12V Power Supply** (for actuators)

### **Other Components:**
- **Jumper Wires** (Male-to-Male, Male-to-Female)
- **Breadboard** (for prototyping)
- **Screw Terminals** (for secure connections)

---

## **📦 Installation Guide**

Follow these steps to set up the project:

### 1. **Clone the Repository:**
```bash
git clone https://github.com/Thamidu-Nadun/IOT-Green-House.git
```

### 2. **Setup ESP32:**
- Install the **ESP32 board** in the Arduino IDE.
- Upload the **ESP32 firmware** to the board to connect sensors and actuators.

### 3. **Frontend Setup (React):**
- Install necessary dependencies:
```bash
cd client
npm install
```

- Start the React development server:
```bash
npm start
```

### 4. **Backend Setup:**

---

## **💡 Project Structure**

### **Frontend (React):**
- `src/` - React components, styling, and utilities.
- `public/` - Static assets for the web app (images, icons).
- `App.jsx` - Main React component for dashboard and controls.

### **Backend (Optional):**
- `api/` - Backend APIs to manage communication between ESP32 and the frontend.
- `controllers/` - Handle incoming requests from the frontend and send commands to ESP32.

### **ESP32 Firmware:**
- `esp32/` - Code to interact with sensors, actuators, and send data to the backend (or directly to the frontend).

---

## **📈 Real-Time Data**

The system supports real-time data collection and visualization through:
- **HTTP Polling** (React fetches data periodically)
- **WebSocket** (for immediate updates)

---

## **📱 Dashboard Demo**

<!-- ![Dashboard Screenshot](./assets/dashboard-screenshot.png) -->

View live data on temperature, humidity, and soil moisture, and control devices like fans or irrigation systems directly from the dashboard.

---

## **📝 Contributing**

We welcome contributions! If you want to improve the system or add new features, feel free to fork this repository and submit a pull request.

### **How to Contribute:**
1. Fork the repository.
2. Create a new branch for your feature (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m 'Add feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Open a pull request.

---

## **📄 License**

This project is licensed under the **MIT License**.

---

## **👨‍💻 Maintainers**

- **[Thamidu-Nadun](https://github.com/Thamidu-Nadun)** - Project lead and developer.
- Contributions are always welcome!

---

## **⚙️ Future Enhancements**

- Integration with cloud services (e.g., AWS IoT or Firebase).
- Voice control integration (Alexa/Google Home).
- Mobile app for monitoring and control.

---