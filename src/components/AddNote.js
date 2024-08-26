import React, { useContext, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Notes from './Notes';
import noteContext from '../context/notes/noteContext';
import { useAlert } from '../context/notes/AlertContext';

const AddNote = () => {
  const showAlert = useAlert();
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" });
    showAlert("Note Added Successfully", "success");
  }

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  }

  return (
    <div className='container my-3' style={{ color: "#E4E4E7", paddingLeft: "40px", paddingRight: "40px" }}>
      <h3>Add a Note</h3>
      <Form onSubmit={handleClick} className='rounded-4 px-3 py-3' style={{ backgroundColor: "#2E2E33", borderRadius: "8px", boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)" }}>
        <Form.Group className="mb-3">
          <Form.Label style={{ backgroundColor: "#2E2E33",display:"block"}}>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Title"
            name="title"
            value={note.title}
            minLength={5}
            required
            id="title"
            onChange={onChange}
            style={{
              backgroundColor: "#3A3A3F",
              color: "#E4E4E7",
              borderColor: "#5A5A5E"
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label style={{ backgroundColor: "#2E2E33",display:"block"}}>Description</Form.Label>
          <Form.Control
            type="text"
            id="description"
            placeholder="Enter Description"
            value={note.description}
            name="description"
            minLength={5}
            required
            onChange={onChange}
            style={{
              backgroundColor: "#3A3A3F",
              color: "#E4E4E7",
              borderColor: "#5A5A5E"
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label style={{ backgroundColor: "#2E2E33",display:"block"}}>Tag</Form.Label>
          <Form.Control
            type="text"
            id="tag"
            placeholder="Enter Tag"
            name="tag"
            value={note.tag}
            onChange={onChange}
            style={{
              backgroundColor: "#3A3A3F",
              color: "#E4E4E7",
              borderColor: "#5A5A5E"
            }}
          />
        </Form.Group>

        <Button
          variant="primary"
          style={{
            backgroundColor: "#27272A",
            color: "#E4E4E7",
            border: "1px solid #5A5A5E",
            marginTop: "15px"
          }}
          type="submit"
          // onClick={handleClick}
          
        >
          Add Note
        </Button>
      </Form>
      <Notes />
    </div>
  );
}

export default AddNote;
