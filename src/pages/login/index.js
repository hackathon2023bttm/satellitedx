import Header from "../../app/components/Header";
import TextInput from "../../app/components/TextInput";

export default function Login() {
  return (
    <>
      <script src="https://cdn.tailwindcss.com"></script>
      <Header />

      <form action="/api/auth/login2" method="POST">
        <label htmlFor="username">Username</label>
        <TextInput id="username" type="text" name="username" placeholder="Username" />
        <input className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit" value="Log In" />
      </form>
    </>
  )
}
