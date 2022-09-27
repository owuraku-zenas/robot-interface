import React, { useState, useContext, useEffect } from 'react'
import AuthContext from '../context/AuthProvider'
import styles from '../styles/ConnectionView.module.css'
import rosLogo from '../images/ros-logo.svg'
import ROSLIB from 'roslib'
import { login } from '../api/services'
import { useNavigate } from 'react-router-dom'
import LoadingView from './LoadingView'



const ConnectionView = () => {
  const { setAuth, auth } = useContext(AuthContext)
  const { setRos, ros } = useContext(AuthContext)
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [ip, setIp] = useState("");
  const [port, setPort] = useState("");
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    // Check if user is already signed in using authcontext
    if (auth !== null && ros !== null && localStorage.getItem('token') !== null && localStorage.getItem('rosURL') !== null) {
      navigate('/')
    }


  }, [])

  const connect = () => {
    const url = `ws://${ip}:${port}`;
    const tempRos = new ROSLIB.Ros({
      url: url
    });

    tempRos.on('connection', () => {
      setRos(tempRos)
      localStorage.setItem('rosURL', url)
      navigate('/')
    });

    tempRos.on('error', (error) => {
      setErrorMessage("Unable to connect to Websocket");
    });
  }

  const loginUser = async () => {
    setIsLoading(true)
    const response = await login(email, password)
    if (response?.status === 200) {
      setAuth(response?.data?.user)
      localStorage.setItem('token', response?.data?.access_token)
      connect()

    } else {
      setErrorMessage("Invalid email or password")
    }
    setIsLoading(false)
  }
  if (isLoading) {
    return <LoadingView />
  }
  return (
    <div className={styles.connection__area}>
      <img className={styles.logo} src={rosLogo} alt="ROS Logo" />
      {errorMessage && <p className={styles.error__message}>{errorMessage}</p>}
      <form className={styles.form} onSubmit={
        (event) => {
          setErrorMessage("")
          event.preventDefault();
          // onSubmit()
          loginUser()
        }
      }>
        <input
          type="text"
          value={email}
          onChange={
            (event) => {
              setEmail(event.target.value)
            }
          }
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={
            (event) => {
              setPassword(event.target.value)
            }
          }
          placeholder="Password"
          required
        />
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