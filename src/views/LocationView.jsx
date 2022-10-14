import Map from '../components/Map'
// import MapOl from '../components/MapOl'
import Marker from '../components/Marker'


const zoom = 15
const center = { lat: 5.658807, lng: -0.181862 }


const LocationView = () => {

  return (
    <div style={{height: "100vh"}}>
      <Map center={center} zoom={zoom} >
          <Marker position={center} />
      </Map>
      {/* <MapOl /> */}
    </div>
  )
}

export default LocationView