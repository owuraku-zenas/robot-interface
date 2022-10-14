import React from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import ReactNipple from 'react-nipple';
import ROSLIB from 'roslib';

import AuthContext from '../context/AuthProvider'

export const Joy = () => {

    const { ros } = useContext(AuthContext)
    const [linear, setLinear] = useState(0.0)
    const [angular, setAngular] = useState(0.0)
    const [stopPub, setStopPub] = useState(false)
    const [isStarted, setIsStarted] = useState(false)
    // const [cmdPubTimer, setCmdPubTimer] = useState(null)




    useEffect(() => {
        console.log(ros, "This is working");
    }, [ros])

    const move = (evt, data) => {
        var max_linear = 5.0; // m/s
        var max_angular = 2.0; // rad/s
        var max_distance = 75.0; // pixels;
        var linear_speed = Math.sin(data.angle.radian) * max_linear * data.distance / max_distance;
        var angular_speed = -Math.cos(data.angle.radian) * max_angular * data.distance / max_distance;

        setLinear(linear_speed)
        setAngular(angular_speed)
    }

    let moveAction = () => {
        //create a ROS publisher to /cmd_vel
        var cmd_vel = new ROSLIB.Topic({
            ros: ros,
            name: "turtle1/cmd_vel",
            messageType: "geometry_msgs/Twist"
        });

        if (stopPub) {
            setLinear(0.0)
            setAngular(0.0)
            // clearInterval(cmdPubTimer)
            setStopPub(false)
        }

        let twist = new ROSLIB.Message({
            linear: { x: 0, y: 0, z: 0 },
            angular: { x: 0, y: 0, z: 0 }
        });

        if (linear !== undefined && angular !== undefined) {
            twist.linear.x = linear;
            twist.angular.z = angular;
        } else {
            twist.linear.x = 0;
            twist.angular.z = 0;
        }
        console.log(linear, angular);
        cmd_vel.publish(twist);
    }

    useEffect(() => {
        if (isStarted) {
            var cmdPubTimer = setInterval(moveAction, 25);
        }
        return () => clearInterval(cmdPubTimer)
    }, [isStarted])

    // const loopMoveAction = () => {
    //     // setCmdPubTimer(setInterval(moveAction, 25))
    //     // cmdPubTimer = setInterval(moveAction, 25)
    //     setIsStarted(true)
    // }


    return (
        <div style={{ position: "absolute", right: "5%", bottom: "5%" }}>
            <ReactNipple
                // supports all nipplejs options
                // see https://github.com/yoannmoinet/nipplejs#options
                options={{ mode: 'static', position: { top: '50%', left: '50%' }, color: '#fff', size: 150 }}
                // any unknown props will be passed to the container element, e.g. 'title', 'style' etc
                style={{
                    width: 150,
                    height: 150,
                    position: 'relative'
                    // if you pass position: 'relative', you don't need to import the stylesheet
                }}
                // all events supported by nipplejs are available as callbacks
                // see https://github.com/yoannmoinet/nipplejs#start
                // onMove={(evt, data) => console.log(data.angle.radian)}
                // onStart={(evt, data) => console.log(evt, data)}
                // onEnd={(evt, data) => console.log(evt, data)}

                onMove={(evt, data) => move(evt, data)}
                // onStart={(evt, data) => loopMoveAction()}
                onStart={(evt, data) => setIsStarted(true)}
                onEnd={(evt, data) => {
                    setStopPub(true)
                    setIsStarted(false)
                }}
            />
            {/* <div style={{display: "flex"}}>Hello World</div> */}
        </div>
    )
}
