import { useContext, useState } from "react"
import Mycontext from "./Context/Mycontext"
import {useNavigate} from 'react-router-dom'

const style = {
    width: '80%',
    margin: 'auto'
}
const Signup = () => {
    const navigate = useNavigate()
    const [userDetail, setUserDetail] = useState({})
    const { alert } = useContext(Mycontext)

    const handleChange = (e) => {
        const { name, value } = e.target
        setUserDetail({ ...userDetail, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { email, password, confirmPassword } = userDetail

        if(!email || !password){
            alert('email and password cannot be null')
        }

        else if (password != confirmPassword) {
            alert('password and confirm password do not match')
        }
        else {
            try {
                const response = await fetch('http://localhost:8000/api/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({userName:email,password:password,confirmPassword:confirmPassword}),
                });
                const responseData = await response.json();
                console.log(responseData)
                if(responseData.success){
                    alert(responseData.data.msg)
                    navigate('/login')
                }
                else{
                    alert(responseData.error)
                }
            } catch (error) {
                console.error('Error:', error);
                alert('some error occured')
            }
        }
    }



    return (
        <form style={style} onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' onChange={handleChange} />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" name='password' onChange={handleChange} minLength={8} />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
                <input type="password" className="form-control" id="exampleInputPassword2" name='confirmPassword' onChange={handleChange} minLength={8}/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}

export default Signup