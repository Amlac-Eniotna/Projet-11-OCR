import { Link } from "react-router-dom"

function Linkto({fa, className, text, path}: {fa: string, className: string, text: string, path: string}) {
    return(
        <Link to={path} className={className}>
            <i className={fa}></i>
            {text}
        </Link>
    )
}

export default Linkto