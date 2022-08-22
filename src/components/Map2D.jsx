import React, { useState } from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import AuthContext from '../context/AuthProvider'
import ROS2D from 'ros2d'

const styles = {
    map2d: {
        width: "100%",
        height: "100%",
    }
}

const Map2D = () => {
    const { ros } = useContext(AuthContext)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (ros === null) {
            setIsLoading(true)
            return
        } else {
            // Create a map viewer
            var map = new ROS2D.Viewer({
                divID: '2d-map',
                width: '100%',
                height: '100%',
                // mapScale: 0.5,
                // mapCenter: [0, 0],
                // mapBackgroundColor: '#ffffff',
                // mapBackgroundImage: '',
                // mapBackgroundImageLoad: true,
                // mapBackgroundImageAlpha: 1,
                // mapBackgroundImageRepetition: 'repeat',
                // showLink: false,
                // showFullscreenButton: true,
                // showNavigation: true,
                // showZoom: true,
                // showScale: false,
                // showCompass: false,
                // showLocation: false,
                // showMousePosition: false,
                // showInfo: false,
                // showLogo: false,
                // showStatus: false,
                // showSlider: false,
                // showTooltip: false,
                // showZoomSlider: true,
                // showLayerSwitcher: false,
                // showBaseLayerSwitcher: false,
                // showOverlays: false,
                // showLayers: true,
                // showLegend: false,
                // showFeatureInfo: false,
                // showFeaturePopup: false,
                // showFeaturePopupClose: false,
                // showFeaturePopupFullscreen: false,
                // showFeaturePopupMetadata: false,
                // showFeaturePopupDownload: false,
                // showFeaturePopupEdit: false,
                // showFeaturePopupDelete: false,
                // showFeaturePopupUpload: false,
                // showFeaturePopupZoom: false,
                // showFeaturePopupEditForm: false,
                // showFeaturePopupEditFormClose: false,
            })

        }

    
        //  Create the map client
        var mapClient = new ROS2D.OccupancyGridClient({
            ros: ros,
            rootObject: map,
            topic: '/map',
            continuous: true,
            style: {
                'color': '#ff0000',
                'opacity': 0.5,
                'weight': 1,
                'fillColor': '#ff0000',
                'fillOpacity': 0.5,
            },
        })

        setIsLoading(false)
        console.log(ros);
        // console.log("2DMap", mapClient);



    })

    return (
        <div style={styles.map2d} id="2d-map">
            Map2D
        </div>
    )
}

export default Map2D