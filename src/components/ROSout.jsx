import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import ROSLIB from 'roslib'
import AuthContext from '../context/AuthProvider'
import LoadingView from '../views/LoadingView'

const styles = {
    logs__view: {
        marginLeft: "10px",
        color: "white",
        fontSize: "15px",
        overflow: "auto",
    },
    verbosity2: {
        backgroundColor: "green",
        color: "white",
    },
    log2: {
        padding: "3px",
    },
    verbosity: {
        backgroundColor: "red",
        color: "white",
    },
    log: {
        padding: "3px",
        color: "red"
    },

}

const ROSout = () => {
    const { ros } = useContext(AuthContext)
    const [isLoading, setIsLoading] = React.useState(false)
    const { logs, setLogs } = useContext(AuthContext)
    useEffect(() => {
        if (ros === null) {
            setIsLoading(true)
            return
        } else {
            var rosout_agg = new ROSLIB.Topic({
                ros: ros,
                name: "/rosout_agg",
                messageType: "rosgraph_msgs/Log"
            })
        }

        setIsLoading(false)
        console.log("ros", ros);
        console.log("rosout", rosout_agg);

        rosout_agg.subscribe((message) => {
            let today = new Date();
            let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            let dateTime = date + ' ' + time;
            console.log(dateTime)
            console.log("message", message);
            setLogs([...logs, { date: dateTime, data: message }])
            localStorage.setItem('logs', JSON.stringify(logs))
        })

        return () => {
            rosout_agg.unsubscribe()
        }
    }, [ros, logs, localStorage.getItem('logs')])

    if (isLoading) {
        return <LoadingView />
    }

    return (
// TODO: add auoscrolling to logs
        <div style={styles.logs__view} id="logs" >
            {logs.map((log, index) => {
                if (log.data.level === 2) {
                    return (
                        <pre key={index} style={styles.log2} >
                            <span style={styles.verbosity2} >
                                [INFO]
                            </span>
                            <span style={{color: "green"}} >
                                {" "}
                                [{log.date}]
                            </span>
                            <span>
                                {" "}
                                [{log.data.name}]
                            </span>
                            {"  "}
                            <span>
                                {log.data.msg}
                            </span>
                        </pre>
                    )
                } else {
                    return (
                        <pre key={index} style={styles.log}>
                            <span style={styles.verbosity} >
                                [ERROR]
                            </span>
                            <span>
                                {" "}
                                [{log.date}]
                            </span>
                            <span>
                                {" "}
                                [{log.data.name}]
                            </span>
                            {"  "}
                            <span>
                                {log.data.msg}
                            </span>
                        </pre>
                    )
                }
            }
            )}
        </div>
    )
}

export default ROSout