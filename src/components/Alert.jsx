import { useContext } from "react"
import Mycontext from "./Context/Mycontext"
const Alert = () => {

    const {showAlert} = useContext(Mycontext)
    const style = {
        display:`${(showAlert)?'block':'none'}`
    }
    
    return (
        <div className="alert alert-primary" role="alert" style={style}>
            {showAlert}
        </div>
    )
}

export default Alert