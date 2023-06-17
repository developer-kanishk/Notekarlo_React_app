import { useContext } from "react"
import Mycontext from "./Context/Mycontext"
import { Link, useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Navbar = (props) => {
    const style = {
        fontSize: '48px'
    }
    const navigate = useNavigate()
    const location = useLocation();
    const { user, setUser } = useContext(Mycontext)

    const handleLogout = (e) => {
        e.preventDefault()
        console.log('logging out')
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('username');
        setUser(0)
        props.setIsLoggedIn(0)
        navigate('/login')
    }

    const handleSignup = (e) => {
        e.preventDefault()
        navigate('/signup')
    }
    const handleLogin = (e) => {
        e.preventDefault()
        navigate('/login')
    }

    return (
        <div className='d-flex justify-content-between' style={{ border: '2px black solid' }}>
            <div>
                <Link to='/'>
                    <span style={{ fontSize: '48px', color: 'Dodgerblue' }}>
                        <i className="fa-solid fa-clipboard-check mx-2"></i>
                    </span>
                </Link>
            </div>

            <div><Link className="navbar-brand mx-2" style={style} to='/'>NoteKarlo</Link></div>

            <div > 
                {(user === 1) &&
                    <div >
                        <span className='mx-2' style={{ }}>  {
                            localStorage.getItem('username')
                        }</span>
                        <form className="form-inline my-2" onSubmit={handleLogout}>
                            <button className="btn btn-outline-success my-2 mx-2 my-sm-0" type="submit">Logout</button>
                        </form>
                    </div>}
                {(user === 0 && (location.pathname).toLowerCase() !== '/login') &&
                    <div className='d-flex'>
                        <form className="form-inline" onSubmit={handleLogin}>
                            <button className="btn btn-outline-success my-2 mx-2 my-sm-0" type="submit" >Login</button>
                        </form>
                    </div>}
                {(user === 0 && (location.pathname).toLowerCase() !== '/signup') &&
                    <div className='d-flex'>
                        <form className="form-inline" onSubmit={handleSignup}>
                            <button className="btn btn-outline-success my-2 mx-2 my-sm-0" type="submit" >Signup</button>
                        </form>
                    </div>}
            </div>

        </div>
    )
}
export default Navbar