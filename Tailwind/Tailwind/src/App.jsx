import './App.css'
import { Form } from "antd";
import Login from './components/Login';
import Register from './components/register';
import { useState } from 'react';

function App() {
  // const [login,setLogin]=useState(true)
  return (
    <>
     <Login/>
     {/* <h1>Register</h1>
     <Register/> */}
    </>
  )
}
export default App
