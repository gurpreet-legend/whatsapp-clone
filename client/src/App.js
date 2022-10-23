import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import Signin from './pages/signin'
import { GoogleAuthProvider, signInWithPopup, signInWithRedirect, onAuthStateChange, signout } from "firebase/auth/"
import { AuthContextProvider } from './context/authContext'

function App() {

  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signin' element={<Signin />} />
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
