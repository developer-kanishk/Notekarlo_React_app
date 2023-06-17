import { useState } from "react"
import Mycontext from "./Context/Mycontext"
import { useContext } from "react"

const style={
    width:"80%",
    margin:'auto',
    marginTop:'10px'
}

const Additem = () => {

    const {addNote,notes} = useContext(Mycontext)


    const [formdata,setFormData] = useState({})

    const handleChange = (e)=>{
        const {name,value} = e.target
        setFormData({...formdata,[name]:value})
    }

    const handleSubmit =(e)=>{
        e.preventDefault()
        addNote(formdata)
        setFormData({...formdata,title:'',body:'',tag:''})
        console.log(formdata)
    }

    const {title,body,tag} = formdata

    return (
        <div style={style} className="my-4">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter title" name="title" onChange={handleChange} value={title}/>
                </div>
                <div className="form-group my-4">
                    <textarea className="form-control my-2" id="exampleFormControlTextarea1" rows="3" placeholder="Enter your Notes here" onChange={handleChange} name="body" value={body}></textarea>
                </div>
                <div className="form-group my-4">
                    <input type="text" className="form-control my-2" id="exampleInputPassword1" placeholder="#tags#personal#rocking" onChange={handleChange} name="tag" value={tag}/>
                </div>
                <button type="submit" className="btn btn-primary">Create Note</button>
            </form>
        </div>
    )
}

export default Additem