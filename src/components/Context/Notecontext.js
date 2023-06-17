
import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import Mycontext from "./Mycontext"

const Notecontext = (props) => {

    const navigate = useNavigate()


    const [user, setUser] = useState(0)
    const [notes, setNotes] = useState([])
    const [showAlert, setShowAlert] = useState('')

    //fetch notes
    const fetchNotes = async () => {
        const jwtToken = localStorage.getItem('jwtToken')
        if (!jwtToken) {
            navigate('/login')
        }
        try {
            const response = await fetch('http://localhost:8000/api/note/getallnotes', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwtToken}`,
                }
            });
            const res = await response.json();
            console.log(res)
            if (res.success) {
                setUser(1)
                setNotes(res.data.notes)
            }
            else if(response.status === 401 || response.status===403){
                    alert('Please log in again')
                    navigate('/login')
            }
            // else {
            //     alert(res.error)
            //     setUser(1)
            // }
        } catch (error) {
            alert('some error occured')
            console.error('Error: ', error.message);
        }
    }

    const alert = (alert) => {
        setShowAlert(alert)
        setTimeout(() => {
            setShowAlert('')
        }, 5000)
    }

    //adding a note
    const addNote = async (note) => {
        const jwtToken = localStorage.getItem('jwtToken')
        if (!jwtToken) {
            navigate('/login')
        }
        try {
            const { title, body, tag } = note
            const response = await fetch('http://localhost:8000/api/note/createnote', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwtToken}`,
                },
                body: JSON.stringify({ title, body, tag })
            });
            const res = await response.json();
            console.log(res)
            if (res.success) {
                const newNotes = [...notes]
                newNotes.reverse()
                newNotes.push(res.data.note)
                newNotes.reverse()
                setNotes(newNotes)
                alert('note added')
            }
            else {
                alert(res.error)
            }
        } catch (error) {
            console.error('Error:', error);
            alert('some error occured')
        }

    }

    const deleteNote = async (key) => {

        const jwtToken = localStorage.getItem('jwtToken')
        if (!jwtToken) {
            navigate('/login')
        }
        try {
            const response = await fetch(`http://localhost:8000/api/note/deletenote/${key}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwtToken}`,
                }
            });
            const res = await response.json();
            console.log(res)
            if (res.success) {
                const newNotes = [...notes].filter((element) => {
                    return (element.id !== key)
                })
                setNotes(newNotes)
                alert('note deleted!')
            }
            else {
                alert(res.error)
            }
        } catch (error) {
            console.error('Error:', error);
            alert('some error occured')
        }
    }

    const updateNote = async (note, id) => {

        const jwtToken = localStorage.getItem('jwtToken')
        if (!jwtToken) {
            navigate('/login')
        }
        try {
            // console.log(note)
            const {title,body,tag} = note
            const response = await fetch(`http://localhost:8000/api/note/updatenote/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwtToken}`,
                },
                body: JSON.stringify({title,body,tag })
            });
            const res = await response.json();
            console.log(res)
            if (res.success) {
                var newNotes=[]
                for(let key in notes){
                    if(notes[key].id===id){
                        continue
                    }
                    else{
                        newNotes.push(notes[key])
                    }
                }
                newNotes.reverse()
                newNotes.push(res.data.note)
                console.log(newNotes)
                newNotes.reverse()
                setNotes(newNotes)
                alert('note updated!')
            }
            else {
                alert(res.error)
            }
        } catch (error) {
            console.error('Error:', error);
            alert('some error occured')
        }
    }


    return (
        <Mycontext.Provider value={{ notes, setNotes, addNote, deleteNote, alert, showAlert, fetchNotes,updateNote,user,setUser}}>
            {props.children}
        </Mycontext.Provider>
    )
}

export default Notecontext