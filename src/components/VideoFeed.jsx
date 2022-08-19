import React, { useContext, useEffect } from 'react'
import ROSLIB from 'roslib'
import AuthContext from '../context/AuthProvider'
import LoadingView from '../views/LoadingView'
import  styles  from '../styles/VideoFeed.module.css'

const VideoFeed = () => {

    const { ros } = useContext(AuthContext)
    const [isLoading, setIsLoading] = React.useState(false)
    const [videoTopic, setVideoTopic] = React.useState(null)
    // check whether ros is connected
    useEffect(() => {
        setIsLoading(true)
        if (ros === null) {
            return
        } else {
            var image_compressed = new ROSLIB.Topic({
                ros: ros,
                name: "/camera/compressed/compressed",
                messageType: "sensor_msgs/CompressedImage"
            });

            console.log("ros", ros);
            console.log("videoTopic", image_compressed);
            setVideoTopic(image_compressed)

            image_compressed.subscribe(function (message) {
                // console.log("This is working");
                setIsLoading(false)
                // TODO: display video feed into browser
                // console.log(message);
                document.getElementById('video').src = "data:image/jpeg;base64," + message.data;

            })
        }

        return () => {
            image_compressed.unsubscribe()
        }
    }, [ros])


    if (isLoading) {
        return <LoadingView />
    }


    return (

        <div className={styles.feed__container}>
            <img className={styles.feed} id="video" />
        </div>

    )
}

export default VideoFeed