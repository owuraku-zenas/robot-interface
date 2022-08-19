import React from 'react'
// TODO: Figure out why header.module.css is not working
const styles = {
    header: {
        display: 'flex',
        padding: '20px',
        backgroundColor: '#30353f',
    },
    title: {
        color: '#fff',
        fontSize: '1.5rem',
        fontWeight: 'bold',
        margin: '0',
        padding: '0',

    }
}

const Header = ({ title }) => {
    return (
        <div style={styles.header} >
            <h1 style={styles.title}> {title} </h1>
        </div>
    )
}

export default Header