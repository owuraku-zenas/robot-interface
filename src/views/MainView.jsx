import { Wrapper } from '@googlemaps/react-wrapper'
import React, { useContext, useEffect, useRef } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import ROSLIB from 'roslib'
import { getUser } from '../api/services'
import SideBar from '../components/SideBar'
import AuthContext from '../context/AuthProvider'
import styles from '../styles/MainView.module.css'


const MainView = () => {
    const { setAuth } = useContext(AuthContext)
    const { setRos } = useContext(AuthContext)
    const navigate = useNavigate()

    const ref = useRef()
    const { map, setMap } = useContext(AuthContext)


    const checkUser = async (token) => {
        const response = await getUser(token)
        if (response?.status === 200) {
            setAuth(response?.data)
        } else {
            setAuth(null)
            setRos(null)
            navigate('/connect')
        }
    }

    const checkROS = (rosURL) => {
        // Create a new ros connection
        const tempRos = new ROSLIB.Ros({
            url: rosURL
        })

        tempRos.on('connection', () => {
            setRos(tempRos)
        })

        tempRos.on('error', () => {
            setAuth(null)
            setRos(null)
            navigate("/connect")
        })
    }

    // Create Map function
    // const createMap = () => {
    //     // Check if map is already created
    //     if (map !== null) {
    //         return
    //     }
        
        // const tempMap = new window.google.maps.Map(ref, {
        //     mapId: "8e0a97af9386fef",
        //     disableDefaultUI: true,
        //     zoomControl: true,
        //     zoomControlOptions: {
        //         position: window.google.maps.ControlPosition.LEFT_TOP
        //     }
        // })

        // // Add Drawing manager
        // const drawingManager = new window.google.maps.drawing.DrawingManager({
        //     drawingMode: window.google.maps.drawing.OverlayType.MARKER,
        //     drawingControl: true,
        //     drawingControlOptions: {
        //         position: window.google.maps.ControlPosition.TOP_CENTER,
        //         drawingModes: [
        //             window.google.maps.drawing.OverlayType.MARKER,
        //             window.google.maps.drawing.OverlayType.POLYGON,
        //             window.google.maps.drawing.OverlayType.POLYLINE,
        //             window.google.maps.drawing.OverlayType.RECTANGLE
        //         ]
        //     },
        //     markerOptions: {
        //         icon: {
        //             path: window.google.maps.SymbolPath.CIRCLE,
        //             scale: 7,
        //             fillColor: '#fff',
        //             fillOpacity: 1,
        //             strokeColor: '#000',
        //             strokeWeight: 2,
        //             strokeOpacity: 1
        //         }
        //     },
        //     polygonOptions: {
        //         fillColor: '#fff',
        //         fillOpacity: 1,
        //         strokeColor: '#000',
        //         strokeOpacity: 1,
        //         strokeWeight: 2
        //     },
        //     polylineOptions: {
        //         strokeColor: '#000',
        //         strokeOpacity: 1,
        //         strokeWeight: 2
        //     },
        //     rectangleOptions: {
        //         fillColor: '#fff',
        //         fillOpacity: 1,
        //         strokeColor: '#000',
        //         strokeOpacity: 1,
        //         strokeWeight: 2
        //     }
        // })
        // drawingManager.setMap(tempMap)
        // setMap(tempMap)
    // }

        useEffect(() => {

            // check local store for token and rosURL
            const token = localStorage.getItem('token')
            const rosURL = localStorage.getItem('rosURL')
            if (!token && !rosURL) {
                navigate('/connect')
            }

            checkUser(token)
            checkROS(rosURL)


        }, [])


        return (
            <div className={styles.main__view}>
                <SideBar />
                <div className={styles.main__area}>
                    <Wrapper apiKey={"AIzaSyC4DXgrTNQ4DphTf7TiyOjbhhHG3O-Aexs"} >
                        <Outlet />
                    </Wrapper>
                </div>
            </div>
        )
    }

    export default MainView