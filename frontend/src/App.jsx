import React from 'react'
import {BrowserRouter , Routes , Route} from 'react-router-dom'

import Home from './pages/Home'
import About from './pages/About'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Projects from './pages/Projects'
import Register from './pages/Register'
import Header from './components/Header'
import Footer from './components/Footer'

const App = () => {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/projects' element={<Projects/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App