import React from 'react'
import Header from '../components/Header'
import Map2D from '../components/Map2D'

const Map2dView = () => {
  return (
    <div style={{height: "100vh"}}>
      <Header title="2D Map" />
      <Map2D />
    </div>
  )
}

export default Map2dView