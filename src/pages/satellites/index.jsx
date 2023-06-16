import satelliteData from '../../app/data/satellites.json'
import Header from '../../app/components/Header'
import Button from '../../app/components/Button'
import { useUser } from '../../app/lib/auth/hooks'

// interface SatelliteJson {
//   satelliteId: number
//   name: string
//   date: Date
//   line1: string
//   line2: string
//   price: number
// }

function SatelliteItem(props) {
  const price = props.satellite.price
  const onBuy = () => {
    fetch('/api/users/' + props.userId).then(r => r.json())
        .then((user) => {
          if (!user.operationProfileComplete) {
            alert("Operation Profile Incomplete! Please complete that first.")
          } else if (user.balance < price) {
            alert("Insufficient balance to purchase satellite for " + price)
          } else {
            alert("Bought " + props.satellite.name + " for " + props.satellite.price + "!")
          }
        })
        .catch(console.error)
  }
  const onBuyNowPayLater = () => {
    fetch('/api/users/' + props.userId).then(r => r.json())
        .then((user) => {
          if (!user.creditProfileComplete) {
            alert("Credit Profile Incomplete! Please complete that first.")
          } else {
            alert("Bought " + props.satellite.name + " for 0! Pay " + price + " later!")
          }
        })
        .catch(console.error)
  }
  return (
    <div className="m-4">
      <div className="text-6xl">🛰️</div>
      <div>Name: { props.satellite.name }</div>
      <div>Price: { props.satellite.price }</div>
      <div className="my-2">
        <Button disabled={!props.userId} className={props.userId ? ' ' : 'opacity-40'} onClick={onBuy}>Buy at { props.satellite.price }</Button>
      </div>
      <div className="my-2">
        <Button disabled={!props.userId} className={props.userId ? ' ' : 'opacity-40'} onClick={onBuyNowPayLater}>Buy Now, Pay Later</Button>
      </div>
    </div>
  )
}

export default function SatellitePage() {
  const user = useUser()
  return (
    <>
      <script src="https://cdn.tailwindcss.com"></script>
      <Header />
      <div className="mx-6 grid grid-cols-4 gap-4">{
        satelliteData.map((s) => {
          return (
            <SatelliteItem userId={user && user._id} satellite={s} key={s.satelliteId} />
          )
        })
      }
      </div>
    </>
  )
}