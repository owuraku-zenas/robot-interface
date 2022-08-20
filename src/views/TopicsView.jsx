import React, { useContext } from 'react'
import Header from '../components/Header'
import ROSout from '../components/ROSout'
import AuthContext from '../context/AuthProvider'

const LogsView = () => {
  const { setLogs, logs } = useContext(AuthContext)
  const styles = {
    logs__view: {
      margin: "0 auto",
      marginTop: "1rem",
      display: "flex",
      flexDirection: "column",
      width: "calc(100% - 2rem)",
      // padding: "10px",
      // height: "800px",
      height: "calc(100vh - 130px)",
    },
    logs: {
      borderRadius: "10px 10px 0 0",
      backgroundColor: "#30353f",
      display: "flex",
      flexDirection: "column",
      height: "100%"
    },
    bar: {
      backgroundColor: "#2b303a",
      width: "100%",
      borderRadius: "0 0 10px 10px",
      height: "40px",
      display: "flex",
      justifyContent: "space-between"
    },
    button: {
      margin: "10px",
      backgroundColor: "transparent",
      border: "none",
      color: "#fff",
      textDecoration: "underline",
      fontSize: "medium",
      cursor: "pointer",
    }
  }
  // TODO: Function for clearing logs
  const clearLogs = () => {
    setLogs([])
    localStorage.setItem('logs', JSON.stringify([]))
  }
  // TODO: Function for downloading logs in readable format not in JSON format
  const downloadLogs = () => {
    const element = document.createElement('a');
    const file = new Blob([JSON.stringify(logs)], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'logs.json';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  return (
    <div>
      <Header title="ROS Logs" />
      <div style={styles.logs__view} >
        <div style={styles.logs} >
          <ROSout />
        </div>
        <div style={styles.bar} >
          <button style={styles.button} onClick={clearLogs}>Clear</button>
          <button style={styles.button} onClick={downloadLogs} >Save</button>
        </div>
      </div>
    </div>
  )
}

export default LogsView