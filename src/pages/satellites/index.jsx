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

function SatelliteItem(props) {
  return (
    <div>
      <div className="text-6xl">🛰️</div>
      <div>Name: { props.satellite.name }</div>
      <div>Price: { props.satellite.price }</div>
    </div>
  )
}

export default function SatellitePage() {
  return (
    <>
      <script src="https://cdn.tailwindcss.com"></script>
      <Header />
      {
        satelliteData.map((s) => {
          return (
            <SatelliteItem satellite={s} key={s.satelliteId} />
          )
        })
      }
    </>
  )
}