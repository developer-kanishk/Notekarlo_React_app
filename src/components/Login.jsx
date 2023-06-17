import { useState } from "react"
import { useContext } from "react"
import Mycontext from "./Context/Mycontext"
import { useNavigate } from 'react-router-dom';

const style = {
    width: '80%',
    margin: 'auto'
}
const Login = () => {
    const navigate = useNavigate();

    const [userDetail, setUserDetail] = useState({})
    const { alert,setUser } = useContext(Mycontext)

    const handleChange = (e) => {
        const { name, value } = e.target
        setUserDetail({ ...userDetail, [name]: value })
    }

    const handleSubmit = async (e)=>{
        e.preventDefault()
        const {email,password} = userDetail
        
        try {
            const response = await fetch('http://localhost:8000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({userName:email,password:password}),
            });
            const res = await response.json();
            console.log(res)
            if(res.success){
                localStorage.setItem('jwtToken',res.data.jwtToken)
                localStorage.setItem('username',email)
                alert(res.data.msg)
                navigate('/')
            }
            else{
                alert(res.error)
            }
        } catch (error) {
            console.error('Error:', error);
            alert('some error occured')
        }

    }


    return (
        <form style={style} onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"onChange={handleChange} name='email'/>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1"onChange={handleChange} name='password'/>
            </div>
            {/* <div className="mb-3 form-check">
                <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
            </div> */}
            <p>Forgot password</p>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}

export default Login