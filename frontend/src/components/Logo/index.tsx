import logo from 'assets/argentBankLogo.webp'
import { Link } from 'react-router-dom'

function Logo({ className }: { className: string }) {
  return (
    <Link to="/" className={className}>
      <img className={className + '-image'} src={logo} alt="logo argent bank" />
      <h1 className="sr-only">Argent Bank</h1>
    </Link>
  )
}

export default Logo
