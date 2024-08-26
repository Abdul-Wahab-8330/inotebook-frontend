import './App.css';
import './index.css';
import Home from './components/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
//to use react-Bootstrap, after installing package use.. 
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/NavBar';
import NoteState from './context/notes/NoteState';
import { Container } from 'react-bootstrap';
import Signin from './components/Signin';
import Signup from './components/Signup';


function App() {
  return (
    <div style={{backgroundColor:"#27272A"}}>
      <NoteState>
        <BrowserRouter>
          <NavBar />
          <Container className='mt-4'>
            <Routes>
              <Route path='/' element={<Home />}></Route>
              <Route path='/signup' element={<Signup />}></Route>
              <Route path='/signin' element={<Signin />}></Route>
            </Routes>
          </Container>
        </BrowserRouter>
      </NoteState>
    </div>
  );
}

export default App;
