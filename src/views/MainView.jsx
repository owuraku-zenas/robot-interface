import React from 'react'

const MainView = ({ disconnect }) => {
    return (
        <div>
            <h1>LoginView</h1>
            <p>Connected</p>
            <button onClick={() => disconnect()} >Disconnect</button>
        </div>
    )
}

export default MainView