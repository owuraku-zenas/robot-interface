import React from 'react'
import Header from '../components/Header'
import PasswordSettings from '../components/PasswordSettings'
import ProfileSettings from '../components/ProfileSettings'
import styles from '../styles/SettingsView.module.css'

const SettingView = () => {
  return (
    <div>
      <Header title="Profile Settings" />
      <div className={styles.settings}>
        <ProfileSettings />
        <div className={styles.divider} />
        <PasswordSettings />
      </div>
    </div>
  )
}

export default SettingView