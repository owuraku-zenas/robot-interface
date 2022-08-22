import Map from '../components/Map'
import Marker from '../components/Marker'


const zoom = 6
const center = { lat: 5.692110393455236, lng: -0.2098751958173014 }


const LocationView = () => {
  // TODO: Center will be from robot gps location
  // const [center, setCenter] = useState({ lat: 5.692110393455236, lng: -0.2098751958173014 })

  // TODO: set and get geofence from server

  const positions = [
    center,
    { lat: 5.754952312143694, lng: -0.003454464495745608 },
    { lat: 5.273528506781628, lng: -1.2527549497596973 }
  ]

  return (
    <div style={{height: "100vh"}}>
      <Map center={center} zoom={zoom} >
        {positions.map((position, index) => (
          <Marker key={index} position={position} />
        ))}
      </Map>
    </div>
  )
}

export default LocationView