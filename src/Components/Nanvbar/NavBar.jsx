import FocalX from './../../assets/Images/FocalX.png'
import Secrsh from './../../assets/Images/secrtch.png'
import Leave from './../../assets/Images/Leave.png'
import './NavBar.css'
import { Link } from 'react-router-dom'

export default function NavBar({setleave }) {

  function handelLeaving()
  {
    setleave(true)
  }
  return (
    <nav className="The-Navbar">
        <div className='side_1'> 
            <img 
            onClick={() => handelLeaving()}
            src={Leave} alt="Leave" />
            <Link to={'./'}>
            <img className='Secrsh' src={Secrsh} alt="Secrsh" />
            </Link>
        </div>
        <div className='side_2'> 
            <div><h3>اسم الآدمن</h3></div>
            <Link to={'/HomePage'}>
            <img src={FocalX} alt="FocalX_Icone" />
            </Link>
        </div>
    </nav>
  )
}
