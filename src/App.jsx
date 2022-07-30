import './App.css';
import { useState, useEffect } from 'react';
import ROSLIB from 'roslib';
import MainView from './views/MainView';
import ConnectionView from './views/ConnectionView';

function App() {

  const [ros, setRos] = useState(null);
  const [connected, setConnected] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const connect = (ip, port) => {
    const url = `ws://${ip}:${port}`;
    const tempRos = new ROSLIB.Ros({
      url: url
    });
    tempRos.on('connection', () => {
      setRos(tempRos);
      setErrorMessage(null);
      localStorage.setItem('rosURL', url);
      setConnected(true);
    });

    tempRos.on('error', (error) => {
      setErrorMessage("Unable to connect to Websocket");
    });

    tempRos.on('close', () => {
      setConnected(false);
    });
  }

  const disconnect = () => {
    ros.close();
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
      {
        !connected ?
          <ConnectionView connect={connect} errorMessage={errorMessage} /> :
          <MainView disconnect={disconnect} ros={ros}/>
      }
    </div>
  );
}

export default App;
