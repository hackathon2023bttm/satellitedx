import { useEffect, useState } from "react";
import { useUser } from "../../app/lib/auth/hooks";
import Header from "../../app/components/Header";
import Button from "../../app/components/Button";
import { useRouter } from "next/router"

function MineView(props) {
  const [balance, setBalance] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (props.userId) {
      fetch('/api/users/' + props.userId).then(r => r.json())
        .then((user) => {
          console.log(user)
          setBalance(user.balance || 0)
          setLoading(false)
        })
        .catch(console.error)
    }
  }, [loading])

  const onMine = () => {
    fetch('/api/users/' + props.userId + "/mine", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ inc: 500 }),
    })
    .then(r => r.json())
        .then((user) => {
          console.log(user)
          setBalance(user.balance || 0)
          setLoading(false)
        })
        .catch(console.error)
  }
  return (
    <>
      <div className="m-6">
        {
          loading ? (
            <div>Loading...</div>
          ) : (
            <>
            <div>Balance: { balance }</div>
            <Button onClick={onMine}>Mine</Button>
            </>
          )
        }
      </div>
    </>
  )
}
export default function User2() {
  const [loading, setLoading] = useState(true)
  // const [user, setUser] = useState(null);
  const user = useUser();
  const router = useRouter();

  // 648b755c5094e603955e32b4
  // useEffect(() => {
  //   if (router.query.userId) {
  //     fetch('/api/users/' + router.query.userId).then(r => r.json())
  //       .then((user) => {
  //         console.log(user)
  //         setUser(user)
  //         setLoading(false)
  //       })
  //       .catch(console.error)
  //   }
  // }, [loading, router])

  const onClickComplete = async (event) => {
    event.preventDefault()
    const resp = await fetch("/api/users/" + user._id + "/complete_profile", {
      method: "POST",
      body: JSON.stringify({
        profiles: ['operation_profile']
      }),
      headers: { 'content-type': 'application/json' }
    })
    const json = await resp.json()
    console.log(json)
    const rUrl = json.verification_session_url
    document.location = rUrl
  }

  const onClickCompleteCredit = async (event) => {
    event.preventDefault()
    console.log('completing user', user._id)
    const resp = await fetch("/api/users/" + user._id + "/complete_profile", {
      method: "POST",
      body: JSON.stringify({
        profiles: ['credit_profile']
      }),
      headers: { 'content-type': 'application/json' }
    })
    const json = await resp.json()
    console.log(json)
    const rUrl = json.verification_session_url
    document.location = rUrl
  }

  const onClickCompleteAll = async (event) => {
    event.preventDefault()
    console.log('completing user', router.query.userId)
    const resp = await fetch("/api/users/" + user._id + "/complete_profile", {
      method: "POST",
      body: JSON.stringify({
        profiles: ['credit_profile', 'operation_profile']
      }),
      headers: { 'content-type': 'application/json' }
    })
    const json = await resp.json()
    console.log(json)
    const rUrl = json.verification_session_url
    document.location = rUrl
  }

  const Complete = (props) => {
    if (props.complete) {
      return (
        <span className="font-bold px-2 py-1 rounded text-white bg-green-600">Complete</span>
      )
    } else {
      return <span className="font-bold px-2 py-1 rounded text-white bg-amber-600">Incomplete</span>
    }
  }

  return (
    <>
      <script src="https://cdn.tailwindcss.com"></script>
      <Header />
      <div>
        <div className="mx-6 my-2 opacity-20">
          UserID: { user && user._id }
        </div>

        {
          user && (
            <div className="m-6">
              <div className="my-2">Operation Profile: <Complete complete={user.operationProfileComplete} /> </div>
              <div>
                <Button onClick={onClickComplete}>Complete Operation Profile</Button>
              </div>
              <div className="mt-6">Credit Profile: <Complete complete={user.creditProfileComplete} /> </div>
              <div className="my-2">
                <Button onClick={onClickCompleteCredit}>Complete Credit Profile</Button></div>
                <div className="mt-4">
                <Button onClick={onClickCompleteAll}>Complete All</Button>
                </div>
            </div>
          )
        }

        {
          user && (
            <MineView userId={user._id} />
          )
        }
      </div>
    </>
  )
}
