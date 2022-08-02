import React from 'react'
import SideBar from '../components/SideBar'
import styles from '../styles/MainView.module.css'

const MainView = ({ disconnect }) => {
    return (
        <div className={styles.main__view}>
            <SideBar />
            <div className={styles.main__area}>
                <p>Connected</p>
                <button onClick={() => disconnect()} >Disconnect</button>
            </div>
        </div>
    )
}

export default MainView