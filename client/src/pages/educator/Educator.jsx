import React from 'react'
import { Outlet } from 'react-router-dom'
function Educator() {
  return (
    <div>
      <h1>Educator Dashboard</h1>
      <Outlet />
    </div>
  )
}

export default Educator
