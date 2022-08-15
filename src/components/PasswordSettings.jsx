import React, { useState } from 'react'
import { changePassword } from '../api/services'
import styles from '../styles/SettingsView.module.css'

const PasswordSettings = () => {
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const updatePassword = async () => {
        const token = localStorage.getItem('token')

        const response = await changePassword(token, currentPassword, newPassword, confirmPassword)
        setCurrentPassword("")
        setNewPassword("")
        setConfirmPassword("")
        if (response?.status === 200) {
            alert("Password Changed Successfully")
        } else {
            alert("Password did not update")
        }
    }

    return (
        // TODO: Implement a notification system for the user to see if the password was changed or not


        <div className={styles.settings__section}>
            <div className={styles.settings__section__header}>
                <h1>
                    Update Password
                </h1>
                <p>
                    Ensure your account is using a long, random password to stay secure.
                </p>
            </div>
            <div className={styles.settings__section__content}>
                <form onSubmit={
                    (e) => {
                        e.preventDefault()
                        updatePassword()
                    }
                } >
                    <div className={styles.inputs}>
                        <div className={styles.input}>
                            <label htmlFor="current_password">Current Password</label>
                            <input
                                type="password"
                                id="current_password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                autoComplete="off"
                            />
                        </div>
                        <div className={styles.input}>
                            <label htmlFor="new_password">New Password</label>
                            <input
                                type="password"
                                id="new_password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                autoComplete="off"
                            />
                        </div>
                        <div className={styles.input}>
                            <label htmlFor="confirm_password">Confirm Password</label>
                            <input
                                type="password"
                                id="confirm_password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                autoComplete="off"
                            />
                        </div>
                    </div>
                    <div className={styles.content__button__area}>
                        <button>Save</button>
                    </div>
                </form>
            </div>
        </div >
    )
}

export default PasswordSettings