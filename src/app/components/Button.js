export default function Button(props) {
  let className = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
  if (props.className) {
    className += " " + props.className
  }
  return (
    <button {...props} className={className} />
  )
}
