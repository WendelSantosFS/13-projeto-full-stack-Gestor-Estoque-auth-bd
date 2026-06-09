import { Link } from "react-router-dom"

export default function Links ( {path, text, ...rest}) {
    return <Link to={path} {...rest} >{text}</Link> 
}