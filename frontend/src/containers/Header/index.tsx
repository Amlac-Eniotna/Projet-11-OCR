import Logo from "components/Logo"
import Linkto from "components/Linkto"

function Header({navData}) {
    return(
        <nav className="main-nav">
            <Logo className="main-nav-logo" />
            <div>
                {navData.map(({fa, text, path}) => (<Linkto className="main-nav-item" fa={fa} text={" "+text+" "} path={path} key={text}></Linkto>))}
            </div>
        </nav>
    )
}

export default Header