import React, { useContext } from 'react';
import Card from 'react-bootstrap/Card';
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import noteContext from '../context/notes/noteContext';

const Noteitem = ({ note, updateNote }) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;

  return (
    <>
    <div className='col-xl-3 col-md-4 '>
      <Card className='my-2' style={{ backgroundColor: "#3F3F46", color: "#E4E4E7", borderColor: "#5A5A5E" }}>
        <Card.Body>
          <div className='d-flex align-items-center justify-content-between'>
            <Card.Title className='me-auto' style={{ whiteSpace: 'normal', wordBreak: 'break-word', marginRight: "10px" }}>
              {note.title}
            </Card.Title>
            <RiDeleteBin6Line 
              onClick={() => { deleteNote(note._id); }} 
              style={{ cursor: "pointer", marginLeft: "10px", flexShrink: 0, color: "#E4E4E7" }} 
            />
            <FaRegEdit 
              style={{ cursor: "pointer", marginLeft: "10px", flexShrink: 0, color: "#E4E4E7" }} 
              onClick={() => { updateNote(note); }} 
            />
          </div>
          <Card.Text style={{ color: "#D4D4D8", fontSize:"15px" }}>
            {note.description}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
    
    </>
  );
};

export default Noteitem;
