import { Link } from 'react-router-dom'

function Linkto({
  fa,
  className,
  text,
  path,
  onClick,
}: {
  fa: string
  className: string
  text: string
  path: string
}) {
  return (
    <Link to={path} className={className} onClick={onClick}>
      <i className={fa}></i>
      {text}
    </Link>
  )
}

export default Linkto
