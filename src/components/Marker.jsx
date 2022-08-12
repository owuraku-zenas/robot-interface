import React, { useEffect, useState } from 'react'

const Marker = ({ position, map }) => {
    const [marker, setMarker] = useState(null)

    useEffect(() => {
        setMarker(new window.google.maps.Marker({
            position: position,
        }))
    }, [])

    if (marker) {
        marker.setMap(map)
    }
        
    return null
}

export default Marker