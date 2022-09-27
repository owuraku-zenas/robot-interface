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
import { useNavigate } from 'react-router-dom'


const SideBar = () => {
    const [open, setOpen] = useState(false)
    const { resetContext } = useContext(AuthContext)
    const navigate = useNavigate()

    // Create a signout function
    const logoutUser = async () => {
        const token = localStorage.getItem('token')
        const response = await logout(token)
        if (response?.status === 200) {
            resetContext()
            window.location.reload(false);
        } else {
            console.log("Error signing out")
            alert("Error signing out")
        }
    }

    const Menu = [
        { title: "Dashboard", icon: <MdSpaceDashboard size={30} />, link: "/" },
        { title: "GPS", icon: <MdLocationOn size={30} />, link: "/location" },
        { title: "Video Feed", icon: <MdVideoCall size={30} />, link: "/video-stream" },
        { title: "2D Map", icon: <BsSquareFill size={30} />, link: "/2d-map" },
        { title: "3D Map", icon: <GiCube size={30} />, link: "/3d-map" },
        { title: "ROS Logs", icon: <FaThList size={30} />, link: "/logs" },
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
                    {Menu.map((menu, index) => (
                        <li key={index}
                            className={styles.menu__item}
                            style={window.location.pathname === menu.link ? { backgroundColor: "#fff", color: "#30353f", borderRadius: "5px" } : null}
                            onClick={
                                () => navigate(menu.link)
                            }
                        >
                            {menu.icon}
                            <span style={!open ? { display: "none" } : null} >{menu.title}</span>
                        </li>
                    ))}
                </ul>
                <ul className={styles.menu__list}>
                    <li className={styles.menu__item} onClick={() => {
                        logoutUser()
                    }}>
                        <GoSignOut size={30} />
                        <span style={!open ? { display: "none" } : null} >Sign Out</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default SideBar