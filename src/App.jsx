import { Route, Routes } from 'react-router-dom'
import './App.css'
import Logein from './Components/Logein/Logein'
import MainPage from './Components/MainPage/MainPage'
import UserPage from './Components/UserPage/UserPage'
import SpecializationsPage from './Components/SpecializationsPage/SpecializationsPage'
import { useEffect, useState } from 'react'
import AddVideo from './Components/AddVideo/AddVideo'
import AddUser from './Components/AddUser/AddUser'
import AddSpischalli from './Components/AddSpischalli/AddSpischalli'

function App() {

  const IdNav = localStorage.getItem('NAVid')
  const [ChosingCategory, setChosingCategory] = useState(!IdNav ? 0 : IdNav)

  return (
    <>
      <Routes>
      <Route path='/' element={<Logein />}/>
      <Route path='/MainPage' element={<MainPage setChosingCategory={setChosingCategory} ChosingCategory={ChosingCategory}/>}/>
      <Route path='/MainPage/addVideo' element={<AddVideo />}/>
      <Route path='/UserPage' element={<UserPage setChosingCategory={setChosingCategory} ChosingCategory={ChosingCategory}/>}/>
      <Route path='/UserPage/AddUser' element={<AddUser />}/>
      <Route path='/SpecializationsPage' element={<SpecializationsPage setChosingCategory={setChosingCategory} ChosingCategory={ChosingCategory}/>}/>
      <Route path='/SpecializationsPage/AddSpischalli' element={<AddSpischalli />}/>
    </Routes>
    </>
  )
}

export default App
