import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { useAlert } from '../context/notes/AlertContext';

const Signup = () => {
  const showAlert = useAlert();
  let navigate = useNavigate()
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem("token", json.authtoken);
      console.log(json.authtoken)
      showAlert("Account Created Successfully", "success");
      setCredentials({ name: "", email: "", password: "", cpassword: "" });
      navigate("/");
    }
    else {
      showAlert("Enter Correct details", "error");
    }
  }
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (
    <div style={{paddingBottom:"15px", color: "#E4E4E7", paddingLeft:"40px", paddingRight:"40px", borderRadius: "8px", boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",height:"100vh" }}>
      <h2 className='mt-4 mb-4' >Create a New Account to use iNoteBook</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" style={{backgroundColor:"#3F3F46",color:"#D4D4D8"}} placeholder="Enter Name" name="name" required onChange={onChange} minLength={3} />
        </Form.Group>

        <Form.Group className="mb-3" >
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" style={{backgroundColor:"#3F3F46",color:"#D4D4D8"}}  placeholder="Enter email" name="email" onChange={onChange} />
          <Form.Text style={{ color: "#A1A1AA" }}>
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" >
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" style={{backgroundColor:"#3F3F46",color:"#D4D4D8"}}  placeholder="Password" name="password" minLength={5} required onChange={onChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label> Confirm Password</Form.Label>
          <Form.Control type="password" style={{backgroundColor:"#3F3F46",color:"#D4D4D8"}}  placeholder="Confirm Password" name="cpassword" minLength={5} required onChange={onChange} />
        </Form.Group>

        <Form.Text style={{ color: "#E4E4E7",marginTop:"30px",display:"block" }}>
          We'll never share your email with anyone else.
        </Form.Text>

        <Button style={{ backgroundColor: "#27272A",marginTop:"20px", color: "#E4E4E7", border: "gray solid 1px" }} variant="primary" type="submit">
          Sign Up
        </Button>
      </Form>
    </div>
  )
}

export default Signup
