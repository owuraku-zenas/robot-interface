import React from 'react'
import loader from '../images/loader.gif'

const styles = {
  loadingView: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#fff",
  },
}
const LoadingView = () => {
  return (
    // TODO: Create a loading view. Video in Tutorials
    <div style={styles.loadingView}>
      <img src={loader} alt="Loading..." />
    </div>
  )
}

export default LoadingView