import React, { useState } from 'react'
import styles from '../styles/ConnectionView.module.css'

const ConnectionView = ({ connect, errorMessage }) => {
  const [ip, setIp] = useState("");
  const [port, setPort] = useState("");

  return (
    <div className={styles.connection__area}>
      <h1>ROS UI</h1>
      {errorMessage && <p className={styles.error__message}>{errorMessage}</p>}
      {/* TODO: Input Field for ip and port*/}
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