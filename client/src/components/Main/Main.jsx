import React from 'react'
import WelcomeCard from './components/WelcomeCard'
import SensorCard from './components/SensorCard'
import Sensor from './components/Sensor'

function Main() {
  return (
    <div className="container bg-warning min-vh-100 p-4">
        {/* <WelcomeCard name="John"/> */}
        {/* <SensorCard/> */}
        <Sensor/>
    </div>
  )
}

export default Main