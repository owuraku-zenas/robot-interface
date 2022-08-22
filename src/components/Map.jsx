import React, { useContext, useEffect, useRef, useState } from 'react'
import AuthContext from '../context/AuthProvider'

const Map = ({ center, zoom, children }) => {

    const ref = useRef()
    // const [map, setMap] = useState(null)
    const { map, setMap } = useContext(AuthContext)
    // Add Drawing manager


    useEffect(() => {
        setMap(new window.google.maps.Map(ref.current, { mapId: "ca1a7ecbb1f01836" }))
    }, [])

    if (map) {
        map.setCenter(center)
        map.setZoom(zoom)
    }


    return <div ref={ref} id="map" style={{ height: "100%" }} >
        {/* {children} */}
        {React.Children.map(children, child => React.cloneElement(child, { map }))}
    </div>
}

export default Map