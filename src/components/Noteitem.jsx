import { useContext } from "react"
import Mycontext from "./Context/Mycontext"
import EditModal from "./EditModal"
import { useState } from "react"

const Noteitem = (props) => {

    const {deleteNote} = useContext(Mycontext)

    const handleDelete = (title)=>{
        deleteNote(title)
    }

    const [modal,setModal] = useState(0)
    const [mdata,setMData] = useState({})

    const toggleModal = ()=>{
        setModal(1-modal)
    }

    const handleEdit = (note)=>{
        //modal state change
        console.log(note)
        setMData({...mdata,title:note.title,body:note.body,tag:note.tag})
        toggleModal()
    }

    const style = {
        cursor:'pointer'
    }

    return (<>
        <div className="card my-4 mx-2" style={{width: '18rem',backgroundColor:'#FCFFB2'}}>
            <div className="card-body">
                <h5 className="card-title">{props.title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">On {new Date(props.updatedAt).toDateString()}</h6>
                <p className="card-text">{props.body}</p>
                <p className="card-text">#{props.tag}</p>
                <button onClick={()=>handleDelete(props.id)}><i className="fa-sharp fa-solid fa-trash"  style={style}></i></button>
                <button className="mx-2" onClick={()=>handleEdit(props)}><i className="fa-solid fa-pen-to-square" style={style}></i></button>
            </div>
            <EditModal modal={modal} setModal={setModal} 
            mdata={mdata} setMData={setMData} id={props.id}
            />
        </div>
    </>)
}

export default Noteitem