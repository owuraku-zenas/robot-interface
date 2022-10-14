import React, { useState } from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import AuthContext from '../context/AuthProvider'
import { OccupancyGridClient, Viewer, } from "ros2d";
import map from "../images/2dmap.png"

const styles = {
    map2d: {
        // width: "100%",
        // height: "100%",
        backgroundColor: "#ddd",
        // display: "flex",

    }
}

const Map2D = () => {
    const { ros } = useContext(AuthContext)
    const [isLoading, setIsLoading] = useState(false)

    // useEffect(() => {
    //     if (ros === null) {
    //         setIsLoading(true)
    //         return
    //     } else {
    //         // Create a map viewer

    //         var map = new Viewer({
    //             divID: '2d-map',
    //             width: '1200',
    //             height: '600',
    //             mapScale: 100,

    //         })
    //         console.log("map", map)
    //         //  Create the map client
    //         let mapClient = new OccupancyGridClient({
    //             ros: ros,
    //             size: 20,
    //             rootObject: map.scene,
    //             topic: '/map',
    //             continuous: true,
    //         })
    //         console.log("2DMap", mapClient);


    //         mapClient.on("change", function () {
    //             map.scaleToDimensions(
    //                 mapClient.currentGrid.width,
    //                 mapClient.currentGrid.height
    //             );

    //         })

    //     }

    //     console.log(ros);
    //     setIsLoading(false)
    // }, [])

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", width: "100%" }}>
            <div id="2d-map" />
            <div style={{ display: "flex", justifyContent:"center", alignItems:"center", backgroundColor: "green", height:"50vh", width:"50vw" }}>
                <img style={{ height: "100%", width: "100%" }} src={map} alt="" />
            </div>
        </div>
    )
}

export default Map2D