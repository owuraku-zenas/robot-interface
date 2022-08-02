import React, { useState } from 'react'
import styles from '../styles/ConnectionView.module.css'
import rosLogo from '../images/ros-logo.svg'

const ConnectionView = ({ connect, errorMessage }) => {
  const [ip, setIp] = useState("");
  const [port, setPort] = useState("");

  return (
    <div className={styles.connection__area}>
      <img className={styles.logo} src={rosLogo} alt="ROS Logo" />
      {errorMessage && <p className={styles.error__message}>{errorMessage}</p>}
      {/* TODO: Input Field for username and password*/}
      <form className={styles.form} onSubmit={
        (event) => {
          event.preventDefault()
          connect(ip, port)
        }}>
        <input
          type="text"
          value={ip}
          onChange={
            (event) => {
              setIp(event.target.value)
            }
          }
          placeholder="IP Address"
          required
        />
        <input type="text"
          value={port}
          placeholder="Port Number"
          min={80}
          required
          max={9999}
          onChange={
            (event) => {
              setPort(event.target.value)
            }
          }
        />
        <button className={styles.connect__button}>Connect</button>
      </form>
    </div>
  )
}

export default ConnectionView