import './AddVideo.css'
import { Link } from 'react-router-dom'
import FocalX from './../../assets/Images/FocalX.png';
import back from './../../assets/Images/backkk.svg';
import AddVideoFrrm from '../AddVideoFrrm/AddVideoFrrm';

export default function AddVideo() {
    return (
        <section>
            <nav className='ADD-videoNav'>
                <div className='side_1'>
                    <Link to={'/MainPage'}>
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
            <AddVideoFrrm />
        </section>
    )
}
