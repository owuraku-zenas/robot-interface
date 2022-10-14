import React from 'react'
import Header from '../components/Header'

import VideoFeed from '../components/VideoFeed'
import styles from '../styles/VideoStreamView.module.css'
import TeleOp from '../components/TeleOp'
import Joystick from '../components/Joystick'
import { Joy } from '../components/Joy'

const VideoStreamView = () => {
  return (
    <div className={styles.video__view}>
      <Header title="Live Video Feed" />
      <div className={styles.video__feed}>
        <VideoFeed />
        {/* <TeleOp /> */}
        <Joystick />
        {/* <Joy /> */}
      </div>
    </div>
  )
}

export default VideoStreamView