import React, { useState } from 'react'
import { BsArrowDown, BsArrowUp, BsArrowCounterclockwise, BsArrowClockwise, BsJoystick, BsArrow90DegLeft, BsArrow90DegRight, BsArrowReturnLeft, BsArrowReturnRight, BsStop } from 'react-icons/bs'
import { useKey } from '../hooks/useKey'
import { useContext } from 'react'
import AuthContext from '../context/AuthProvider'
import { useEffect } from 'react'
import ROSLIB from 'roslib'

const styles = {
    teleop__info__area: {
        position: "fixed",
        right: "0",
        top: "60%",
        display: "flex",
        displayDirection: "row"
    },
    teleop__info__control: {
        display: "flex",
        justifyContent: "center",
        color: "white"
    },
    teleop__info__control__background: {
        backgroundColor: "#21242e",
        padding: "5px",
        display: "flex",
        alignItems: "center",
        height: "23%"
    },
    teleop_info: {
        display: "grid",
        backgroundColor: "#fff",
        height: "260px",
        width: "260px",
        gridTemplateColumns: "repeat(3, 1fr)",
        gridTemplateRows: "repeat(3, 1fr)"
    },
    control: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    key__command: {
        fontSize: "medium"
    }
}

const TeleOp = () => {

    const max_velocity = 5

    const { ros } = useContext(AuthContext)
    const [linear, setLinear] = useState(0.0)
    const [angular, setAngular] = useState(0.0)
    const [cmd_vel, setCmd_vel] = useState(null)


    useEffect(() => {
        const command = new ROSLIB.Topic({
            ros: ros,
            name: "turtle1/cmd_vel",
            messageType: "geometry_msgs/Twist"
        })

        setCmd_vel(command)
    }, [ros])

    useEffect(() => {
        // TODO: Figure our how the while loop will work
        while (cmd_vel != null ) {
            
            let twist = new ROSLIB.Message({
                linear: { x: linear, y: 0, z: 0 },
                angular: { x: 0, y: 0, z: angular }
            });
            console.log(cmd_vel);
            cmd_vel.publish(twist)
            console.log("published");
        }

    }, [linear, angular, cmd_vel])

    // TODO: Algorithm for forward
    const forward = () => {

    }

    // TODO: Algorithm for forwardLeft
    const forwardLeft = () => {

    }

    // TODO: Algorithm for forwardRight
    const forwardRight = () => {

    }

    // TODO: Algorithm for antiClockwise
    const antiClockwise = () => {

    }

    // TODO: Algorithm for stop
    const stop = () => {

    }

    // TODO: Algorithm for clockwise
    const clockwise = () => {

    }

    // TODO: Algorithm for backwardLeft
    const backwardLeft = () => {

    }

    // TODO: Algorithm for backward
    const backward = () => {

    }

    // TODO: Algorithm for backwardRight
    const backwardRight = () => {

    }


    return (
        <div style={styles.teleop__info__area}>
            <div style={styles.teleop__info__control}>
                <div style={styles.teleop__info__control__background}>
                    <BsJoystick size={60} enableBackground={"white"} />
                </div>
            </div>
            <div style={styles.teleop_info}>
                <div style={styles.control} onClick={() => forwardLeft()} >
                    <BsArrow90DegLeft />
                    <span style={styles.key__command}>U</span>
                </div>
                <div style={styles.control} onClick={() => forward()} >
                    <BsArrowUp />
                    <span style={styles.key__command}>I</span>
                </div>
                <div style={styles.control}>
                    <BsArrow90DegRight />
                    <span style={styles.key__command}>O</span>
                </div>
                <div style={styles.control}>
                    <BsArrowCounterclockwise />
                    <span style={styles.key__command}>J</span>
                </div>
                <div style={styles.control}>
                    <BsStop />
                    <span style={styles.key__command}>K</span>
                </div>
                <div style={styles.control}>
                    <BsArrowClockwise />
                    <span style={styles.key__command}>L</span>
                </div>
                <div style={styles.control}>
                    <BsArrowReturnLeft />
                    <span style={styles.key__command}>M</span>
                </div>
                <div style={styles.control}>
                    <BsArrowDown />
                    <span style={styles.key__command}>,</span>
                </div>
                <div style={styles.control}>
                    <BsArrowReturnRight />
                    <span style={styles.key__command}>.</span>
                </div>
            </div>
        </div>
    )
}

export default TeleOp