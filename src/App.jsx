import './App.css';
import { useState, useEffect } from 'react';
import ROSLIB from 'roslib';

function App() {

  const [ros, setRos] = useState(null);
  const [connected, setConnected] = useState(false);

  const connect = () => {
    setRos(new ROSLIB.Ros({
      url: 'ws://localhost:9090'
    }));
    localStorage.setItem('rosURL', 'ws://localhost:9090');
    setConnected(true);
  }

  const disconnect = () => {
    setRos(null);
    localStorage.removeItem('rosURL');
    setConnected(false);
  }

  useEffect(() => {
    if (ros) {
      ros.on('connection', () => {
        console.log('Connected to websocket server.');
      });
      ros.on('error', (error) => {
        console.log('Error connecting to websocket server: ', error);
      });
      ros.on('close', () => {
        console.log('Disconnected from websocket server');
      });
    } else {
      // if ros exists in local storage, try to connect
      const rosURL = localStorage.getItem('rosURL');
      if (rosURL) {
        setRos(new ROSLIB.Ros({
          url: rosURL
        }));
        setConnected(true);
      }
    }
  }, [ros])



  return (
    <div className="App">
      <header className="App-header">
        <h1>ROS UI</h1>
        <p>
          {connected ? 'Connected' : 'Not connected'}
        </p>
        {
          connected ?
          <button onClick={() => disconnect() } >Disconnect</button> :
          <button onClick={() => connect() } >Connect</button>
        }
      </header>
    </div>
  );
}

export default App;
