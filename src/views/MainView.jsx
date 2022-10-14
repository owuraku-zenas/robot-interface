import { Wrapper } from '@googlemaps/react-wrapper'
import React, { useContext, useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import ROSLIB from 'roslib'
import { getUser } from '../api/services'
import SideBar from '../components/SideBar'
import AuthContext from '../context/AuthProvider'
import styles from '../styles/MainView.module.css'
import LoadingView from './LoadingView'


const MainView = () => {
    const { setAuth, resetContext } = useContext(AuthContext)
    const { setRos, ros } = useContext(AuthContext)
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)

    // const [isLoading, setIsLoading] = useState(true)


    
    
    useEffect(() => {
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
                setIsLoading(false)
            })
    
            tempRos.on('error', () => {
                resetContext()
                navigate("/connect")
            })
        }

        setIsLoading(true)
        // check local store for token and rosURL
        const token = localStorage.getItem('token')
        const rosURL = localStorage.getItem('rosURL')
        if (!token && !rosURL) {
            navigate('/connect')
            return
        }

        checkUser(token)
        checkROS(rosURL)

        return () => {
            ros.close()
        }

    }, [])


    if (isLoading) {
        return <LoadingView />
    }
        

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