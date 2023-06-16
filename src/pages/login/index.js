export default function Login() {
  return (
    <>
      <script src="https://cdn.tailwindcss.com"></script>

      <form action="/api/auth/login2" method="POST">
        <input type="text" name="username" />
        <input type="submit" value="Log In" />
      </form>
    </>
  )
}