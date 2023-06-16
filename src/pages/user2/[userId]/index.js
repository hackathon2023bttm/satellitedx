import { useRouter } from "next/router"
import { useEffect, useState } from "react";

export default function User2() {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null);
  const router = useRouter();

  // 648b755c5094e603955e32b4
  useEffect(() => {
    if (router.query.userId) {
      fetch('/api/users/' + router.query.userId).then(r => r.json())
        .then((user) => {
          console.log(user)
          setUser(user)
          setLoading(false)
        })
        .catch(console.error)
    }
  }, [loading, router])

  const onClickComplete = async (event) => {
    event.preventDefault()
    const resp = await fetch("/api/users/" + router.query.userId + "/complete_profile", {
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
    console.log('completing user', router.query.userId)
    const resp = await fetch("/api/users/" + router.query.userId + "/complete_profile", {
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

  return (
    <>
      <script src="https://cdn.tailwindcss.com"></script>
      <div>
        <div>
          UserID: { router.query.userId }
        </div>
        {
          user && (
            <>
              <div>Operation Profile: { JSON.stringify(user.operationProfileComplete) }</div>
              <div><button onClick={onClickComplete}>Complete</button></div>
              <div>Credit Profile: { JSON.stringify(user.creditProfileComplete) }</div>
              <div><button onClick={onClickCompleteCredit}>Complete</button></div>
            </>
          )
        }
      </div>
    </>
  )
}
