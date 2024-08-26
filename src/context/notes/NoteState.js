import { useState } from "react";
import noteContext from "./noteContext";
import { useAlert } from "./AlertContext";
const NoteState = (props) => {
  const showAlert = useAlert();
  const host = "http://localhost:5000"

  const initialnotes = []
  const [notes, setNotes] = useState(initialnotes)

  //get all Notes
  const getNotes = async () => {
    //api call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    });
    const json = await response.json();
    setNotes(json)
  }


  //Add a Note
  const addNote = async (title, description, tag) => {
    //api call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag }),
    });
    // eslint-disable-next-line
    const note = await response.json();
    setNotes([...notes, note])
    } 

  //Delete a Note
  const deleteNote = async (id) => {
    //api call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    });
    const json = await response.json();
    console.log(json);
    const newNotes = notes.filter((note) => note._id !== id); 
    showAlert("Deleted Successfully", "success")
  setNotes(newNotes);
  }
  //Edit a Note
  const editNote = async (id, title, description, tag) => {
    //api call
    // eslint-disable-next-line
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag }),
    });

    //logic to edit in client
    let newNotes = JSON.parse(JSON.stringify(notes))

    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title
        newNotes[index].description = description
        newNotes[index].tag = tag
        break;
      }
    }
    setNotes(newNotes);
    showAlert("Updated Successfully", "success")
  }

  return (
    <noteContext.Provider value={{ notes, addNote, deleteNote, editNote,getNotes }}>
      {props.children}
    </noteContext.Provider>
  )
}

export default NoteState;