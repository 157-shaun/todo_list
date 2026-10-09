import { useState } from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
// import './App.css'
import Index from './page/index'
import Register from './page/register'
import Login from './page/login'
import Home from'./page/home'
import History from './page/history'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/home" element={<Home />}/>
        <Route path="/history" element={<History />}/>
        
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
