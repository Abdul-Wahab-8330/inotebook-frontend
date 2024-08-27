import React, { useContext, useEffect, useRef, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Notes = () => {
    let navigate = useNavigate();
    const context = useContext(noteContext);
    const { notes, getNotes, editNote } = context;

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNotes();
        } else {
            navigate("/signin");
        }
        
    }, [navigate, getNotes]);

    const ref = useRef(null);
    const refClose = useRef(null);
    const [show, setShow] = useState(false);
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
    };

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleClick = (e) => {
        editNote(note.id, note.etitle, note.edescription, note.etag);
        refClose.current.click();
    };

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    return (
        <>
            <h3 className='my-3' style={{ color: "#E4E4E7" }}>Your Notes</h3>
            <div className='row px-2 py-2 mb-4 rounded-4' style={{ backgroundColor: "#2E2E33" }}>
                {notes.length === 0 && <p style={{ color: "#E4E4E7", marginTop:"35px", marginBottom:"35px"}}>No notes to display</p>}
                {notes.map((elem) => {
                    return <Noteitem key={elem._id} note={elem} updateNote={updateNote} />;
                })}
            </div>
            

            <Button className='d-none' ref={ref} variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button>

            <Modal show={show} onHide={handleClose} style={{backgroundColor: "#27272A", boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)"}}>
                <Modal.Header closeButton style={{ backgroundColor: "#27272A", color: "#E4E4E7" ,border:"solid gray 1px"}}>
                    <Modal.Title style={{backgroundColor: "#27272A",display:"block"}}>Edit Note</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: "#27272A", color: "#E4E4E7",border:"solid gray 1px" }}>
                    <Form className=''>
                        <Form.Group className="mb-3">
                            <Form.Label style={{backgroundColor: "#27272A",display:"block"}}>Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Title"
                                value={note.etitle}
                                name="etitle"
                                id="etitle"
                                minLength={5}
                                required
                                onChange={onChange}
                                style={{ backgroundColor: "#3F3F46", color: "#E4E4E7", borderColor: "#5A5A5E" }}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label style={{backgroundColor: "#27272A",display:"block"}}>Description</Form.Label>
                            <Form.Control
                                type="text"
                                id="edescription"
                                value={note.edescription}
                                placeholder="Description"
                                name="edescription"
                                minLength={5}
                                required
                                onChange={onChange}
                                style={{ backgroundColor: "#3F3F46", color: "#E4E4E7", borderColor: "#5A5A5E" }}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label style={{backgroundColor: "#27272A",display:"block"}}>Tag</Form.Label>
                            <Form.Control
                                type="text"
                                id="etag"
                                value={note.etag}
                                placeholder="Tag"
                                name="etag"
                                onChange={onChange}
                                style={{ backgroundColor: "#3F3F46", color: "#E4E4E7", borderColor: "#5A5A5E" }}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer style={{ backgroundColor: "#3A3A3F",border:"solid gray 1px" }}>
                    <Button ref={refClose} variant="secondary" onClick={handleClose} style={{ backgroundColor: "#27272A", color: "#E4E4E7", borderColor: "#5A5A5E" }}>
                        Close
                    </Button>
                    <Button
                        disabled={note.etitle.length < 5 || note.edescription.length < 5}
                        variant="primary"
                        onClick={handleClick}
                        style={{ backgroundColor: "#27272A", color: "#E4E4E7", borderColor: "#5A5A5E" }}
                    >
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Notes;
