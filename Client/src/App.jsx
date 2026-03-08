import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/SignUp';
import Task from './pages/Task';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/task' element={
          <ProtectedRoute>
            <Task/>
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
    // <Task/>
  )
}

export default App
