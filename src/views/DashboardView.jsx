import React from 'react'
import Header from '../components/Header'
import VideoFeed from '../components/VideoFeed'
import styles from '../styles/DashboardView.module.css'
import Map from '../components/Map'
import Marker from '../components/Marker'
import ROSout from '../components/ROSout'
import map from "../images/2dmap.png"

const zoom = 20
const center = { lat: 5.658807, lng: -0.181862 }

const DashboardView = () => {
  return (
    <>
      <Header title="Dashboard" />
      <div className={styles.dashboard__view}>
        <div className={styles.dashboard}>

          <div className={styles.dashboard__element} /*style={{gridColumnStart: "1", gridColumnEnd: "3"}}*/>
            <header>
              Live Feed
            </header>
            <div className={styles.dashboard__content}>
              <VideoFeed />
            </div>
          </div>
          <div className={styles.dashboard__element}>
            <header>
              Location
            </header>
            <div className={styles.dashboard__content}>
              <Map center={center} zoom={zoom} >
                <Marker position={center} />
              </Map>
            </div>
          </div>
          <div className={styles.dashboard__element}>
            <header>
              2d Map
            </header>
            <div className={styles.dashboard__content} style={{display:"flex", justifyContent:"center", }}>
              <img style={{ height: "98%", width: "98%" }} src={map} alt="" />
            </div>
          </div>
          <div className={styles.dashboard__element} style={{gridColumnStart: "1", gridColumnEnd: "4"}} >
            <header>
              ROS Logs
            </header>
            <div className={styles.dashboard__content} >
              <ROSout />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DashboardView