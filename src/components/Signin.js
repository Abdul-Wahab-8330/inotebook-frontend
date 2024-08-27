import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { useAlert } from '../context/notes/AlertContext';
import {Link} from 'react-router-dom';
const Signin = () => {
    const showAlert = useAlert();
    let navigate = useNavigate()
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password }),
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            localStorage.setItem("token", json.authtoken)
            showAlert("Logged in Successfully", "success");
            navigate("/");
        }
        else {
            showAlert("Enter correct credentials", "error");
        }
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div style={{ paddingBottom: "15px", color: "#E4E4E7", paddingLeft: "40px", paddingRight: "40px", borderRadius: "8px", boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",height:"100vh" }}>
            <h2 className='mt-4 mb-4'>Sign In to continue to iNoteBook</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" style={{ backgroundColor: "#3F3F46", color: "#D4D4D8" }} placeholder="Enter email" onChange={onChange} value={credentials.email} required name="email" />

                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" style={{ backgroundColor: "#3F3F46", color: "#D4D4D8" }} placeholder="Password" onChange={onChange} value={credentials.password} name="password" required minLength={5} />
                </Form.Group>
                <Form.Text style={{ color: "#E4E4E7", marginTop: "30px", display: "block" }}>
                    Don't have an account <Link to='/signup'>Sign Up</Link>
                </Form.Text>
                <Button variant="primary" type="submit" style={{ marginTop: "20px", backgroundColor: "#27272A", border: "gray solid 1px" }} >
                    Sign In
                </Button>
            </Form>
        </div>
    )
}

export default Signin
