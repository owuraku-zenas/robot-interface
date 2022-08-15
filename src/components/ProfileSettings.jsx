import React, { useContext, useEffect, useState } from 'react'
import { updateUser } from '../api/services'
import AuthContext from '../context/AuthProvider'
import styles from '../styles/SettingsView.module.css'

const ProfileSettings = () => {

    const { auth, setAuth } = useContext(AuthContext)
    const [name, setname] = useState("")
    const [email, setemail] = useState("")

    useEffect(() => {
        if (auth !== null) {
            setname(auth.name)
            setemail(auth.email)
        }
    } , [auth])

    const updateProfile = async () => {
        let user = auth
        user.name = name
        user.email = email

        const token = localStorage.getItem('token')
        
        const response = await updateUser(token, user)
        if (response?.status === 200) {
            setAuth(user)
            alert("Profile Updated Successfully")
        } else {
            alert("Profile did not update")
        }
    }

    return (
        // TODO: Implement a notification system for the user to see if the profile was changed or not
        <div className={styles.settings__section}>
            <div className={styles.settings__section__header}>
                <h1>
                    Profile Information
                </h1>
                <p>
                    Update your account's profile information and email address.
                </p>
            </div>
            <div className={styles.settings__section__content}>
                <div className={styles.inputs}>
                    <div className={styles.input}>
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setname(e.target.value)}
                        />
                    </div>
                    <div className={styles.input}>
                        <label htmlFor="name">Email</label>
                        <input
                            type="text"
                            id="name"
                            value={email}
                            onChange={(e) => setemail(e.target.value)}
                        />
                    </div>
                </div>
                <div className={styles.content__button__area}>
                    <button onClick={updateProfile}>Save</button>
                </div>
            </div>
        </div>
    )
}

export default ProfileSettings