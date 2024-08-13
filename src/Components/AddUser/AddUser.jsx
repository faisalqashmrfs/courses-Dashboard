import { Link } from 'react-router-dom'
import FocalX from './../../assets/Images/FocalX.png';
import back from './../../assets/Images/backkk.svg';
import AddUserFrrm from '../AddUserFrrm/AddUserFrrm';

export default function AddUser() {
  return (
    <section>
            <nav className='ADD-videoNav'>
                <div className='side_1'>
                    <Link to={'/UserPage'}>
                        <img className='Secrsh' src={back} alt="Secrsh" />
                    </Link>
                </div>
                <div className='side_2'>
                    <div><h3>اسم الآدمن</h3></div>
                    <Link to={'/MainPage'}>
                        <img src={FocalX} alt="FocalX_Icone" />
                    </Link>
                </div>
            </nav>
            <AddUserFrrm />
        </section>
  )
}
