import { useContext } from "react"
import Mycontext from "./Context/Mycontext"

const style = {
    width: "80%",
    margin: 'auto',
    marginTop: '10px'
}


const EditModal = (props) => {

    
    const {modal,setModal,mdata,setMData,id} = props
    const {updateNote} = useContext(Mycontext)
    const handleChange = (e)=>{
        const {name,value} = e.target
        setMData({...mdata,[name]:value})
    }
    // console.log(mformdata)
    const handleClose = ()=>{
        setModal(1-modal)
    }

    const handleSubmit = ()=>{
        console.log(mdata)
        updateNote(mdata,id)
        setModal(1-modal)
    }

    return (
        <div>

            <div className={`modal fade ${modal===0?'fade':'show'}`} id="loginModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{display:(modal===0?'none':'block')}}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-body" style={{ style }}>
                            <form>
                                <div className="form-group">
                                    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter title" name="title" onChange={handleChange} value={mdata.title}/>
                                </div>
                                <div className="form-group my-4">
                                    <textarea className="form-control my-2" id="exampleFormControlTextarea1" rows="3" placeholder="Enter your Notes here" onChange={handleChange} name="body" value={mdata.body}></textarea>
                                </div>
                                <div className="form-group my-4">
                                    <input type="text" className="form-control my-2" id="exampleInputPassword1" placeholder="#tags#personal#rocking" onChange={handleChange} name="tag" value={mdata.tag}/>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={handleClose}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleSubmit}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default EditModal