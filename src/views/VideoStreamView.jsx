import React from 'react'
import Header from '../components/Header'
import VideoFeed from '../components/VideoFeed'
import styles from '../styles/VideoStreamView.module.css'

const VideoStreamView = () => {
  return (
      <div className={styles.video__view}>
        <Header title="Live Video Feed" />
        <div className={styles.video__feed}>
          <VideoFeed />
        </div>
      </div>
  )
}

export default VideoStreamView