import satelliteData from '../../app/data/satellites.json'
import Header from '../../app/components/Header'

// interface SatelliteJson {
//   satelliteId: number
//   name: string
//   date: Date
//   line1: string
//   line2: string
//   price: number
// }

function getSatellite(id) {
  return satelliteData.find((s) => s.satelliteId === id)
}

// function SatelliteItem(props) {
//   return (
//     <div>
//       <div className="text-6xl">🛰️</div>
//       <div>Name: { props.satellite.name }</div>
//       <div>Price: { props.satellite.price }</div>
//     </div>
//   )
// }

export default function SatellitePage() {
  return (
    <>
      <script src="https://cdn.tailwindcss.com"></script>
      <Header />
      
    </>
  )
}