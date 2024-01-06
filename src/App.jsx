import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'

import React from 'react'
import { useContext } from "react";
import { AuthContext } from './context/AuthContext'
import Error from './components/Error'
function App() {
  
const {currentUser} = useContext(AuthContext)
  

 

  return (
    <Router>
      <Routes>
        <Route path='/'>
        <Route index
            element={
              currentUser?
                <Home /> :
                <Login></Login>
             
            }/>
          <Route path='register' element={
                <Register></Register>}/>
          <Route path='login' element={
                <Login></Login>}/>
          <Route path=':id' element={
                <Error/>}/>
        </Route>
      </Routes>
    </Router>
  )
}

export default App
