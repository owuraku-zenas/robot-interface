import React from 'react'
import PasswordSettings from '../components/PasswordSettings'
import ProfileSettings from '../components/ProfileSettings'
import styles from '../styles/SettingsView.module.css'

const SettingView = () => {
  return (
    <div>
      <div className={styles.header}>
        <h1>Profile Settings</h1>
      </div>
      <div className={styles.settings}>
        <ProfileSettings />
        <div className={styles.divider} />
        <PasswordSettings />
      </div>
    </div>
  )
}

export default SettingView