import Link from "next/link";
import { useUser } from "../lib/auth/hooks";

export default function Header() {
  const user = useUser()
  return (
    <nav className="px-4 flex w-full bg-teal-600 text-white">
      <Link className="m-3 font-bold" href="/">SatelliteDX</Link>
      <Link className="m-3" href="/satellites">Satellites</Link>
      <span className="m-3">|</span>
      {
        user ? (
          <>
            <Link className="m-3" href="/profile">Profile ({ user && user.username })</Link>
            <Link className="m-3" href="/my-satellites">My Satellites</Link>
            <Link className="m-3" href="/api/auth/logout">Log Out</Link>
          </>
        ) : (
          <Link className="m-3" href="/login">Log In</Link>
        )
      }
    </nav>
  )
}
