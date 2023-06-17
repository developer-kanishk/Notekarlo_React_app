
import Noteitem from "./Noteitem";
import Mycontext from "./Context/Mycontext";
import { useContext } from "react";
import { useEffect } from "react";



const Note = () => {
    const style = { width: '80%', margin: 'auto'}


    const { notes,fetchNotes } = useContext(Mycontext)

    useEffect(()=>{ 
    //    if(flag){
    //         fetchNotes()
    //         flag=0
    //     }
    fetchNotes()
    },[])


    return (
        <div className='d-flex flex-wrap
        'style={style}>
            {
                notes.map((element) => {
                    const {id,title,body,tag,updatedAt} = element
                    return (
                        <div key={id}>
                            <Noteitem title={title} body={body} tag={tag} updatedAt={updatedAt} id={id}/>
                        </div>
                    )
                })
            }
        </div>
    )
}
export default Note;