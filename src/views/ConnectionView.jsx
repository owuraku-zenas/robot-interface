import React from 'react'

const ConnectionView = ({ connect, errorMessage }) => {
    const ip = "localhost";
    const port = "9090";

  return (
    <div>
        <header className="App-header">
            <h1>ROS UI</h1>
            {errorMessage && <p>{errorMessage}</p>}
            {/* TODO: Input Field for ip and port*/}
            
            <button onClick={() => connect(ip, port)} >Connect</button>
          </header>
    </div>
  )
}

export default ConnectionView