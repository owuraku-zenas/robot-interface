import React, { useContext, useState } from 'react'
import styles from '../styles/SideBar.module.css'
import control from '../images/control.png'
import logo from '../images/ros-logo.png'
import { MdLocationOn, MdSpaceDashboard, MdVideoCall } from 'react-icons/md'
import { BsSquareFill } from 'react-icons/bs'
import { GiCube } from 'react-icons/gi'
import { IoLogoModelS } from 'react-icons/io'
import { GoSignOut } from 'react-icons/go'
import { FaThList, FaUserCog } from 'react-icons/fa'
import AuthContext from '../context/AuthProvider'
import { logout } from '../api/services'


const SideBar = () => {
    const [open, setOpen] = useState(false)
    const { setAuth } = useContext(AuthContext)
    const { setRos } = useContext(AuthContext)

    // Create a signout function
    const signout = async () => {
        const token = localStorage.getItem('token')
        const response = await logout(token)
        if (response?.status === 200) {
            setAuth(null)
            setRos(null)
            localStorage.removeItem('token')
            localStorage.removeItem('rosURL')
            window.location.reload(false);
        } else {
            console.log("Error signing out")
            alert("Error signing out")
        }
    }

    const Menu = [
        { title: "Dashboard", icon: <MdSpaceDashboard size={30} />, link: "/dashboard" },
        { title: "GPS", icon: <MdLocationOn size={30} />, link: "/gps" },
        { title: "Video Feed", icon: <MdVideoCall size={30} />, link: "/video" },
        { title: "2D Map", icon: <BsSquareFill size={30} />, link: "/2d" },
        { title: "3D Map", icon: <GiCube size={30} />, link: "/3d" },
        { title: "Rover Model", icon: <IoLogoModelS size={30} />, link: "/rover" },
        { title: "ROS Topics", icon: <FaThList size={30} />, link: "/topics" },
        { title: "Settings", icon: <FaUserCog size={30} />, link: "/settings" }
    ]

    return (
        <div
            style={open ? { width: "288px" } : { width: "40px" }}
            className={styles.sidebar} >
            <div className={styles.header}>
                <img
                    style={open ? { transform: "rotate(0deg)" } : { transform: "rotate(180deg)" }}
                    className={styles.control}
                    src={control}
                    onClick={() => setOpen(!open)}
                    alt="control"
                />
                <img
                    src={logo}
                    className={styles.logo}
                    alt="logo"
                />
                <h1 style={open ? { transform: "scale(1)" } : { transform: "scale(0)" }} className={styles.title}>Interface</h1>
            </div>
            <div className={styles.nav__div}>
                <ul className={styles.menu__list}>
                    {/* TODO: Wrapp a link around when handling routes */}
                    {Menu.map((menu, index) => (
                        <li key={index} className={styles.menu__item}>
                            {menu.icon}
                            <span style={!open ? { display: "none" } : null} >{menu.title}</span>
                        </li>
                    ))}
                </ul>
                <ul className={styles.menu__list}>
                    <li className={styles.menu__item} onClick={() => {
                        signout()
                    }}>
                        <GoSignOut size={30}/>
                        <span style={!open ? { display: "none" } : null} >Sign Out</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default SideBar