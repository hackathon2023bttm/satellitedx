import { useUser } from "../../app/lib/auth/hooks";

export default function User3() {
  const user = useUser();
  return (
    <>
      { JSON.stringify(user) }
    </>
  )
}