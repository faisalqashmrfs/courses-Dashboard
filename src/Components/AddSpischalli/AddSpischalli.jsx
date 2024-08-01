import { Link } from 'react-router-dom'
import FocalX from './../../assets/Images/FocalX.png';
import back from './../../assets/Images/back.png';
import AddSpischalForm from '../AddSpischalForm/AddSpischalForm';

export default function AddSpischalli() {
    return (
        <section>
                <nav className='ADD-videoNav'>
                    <div className='side_1'>
                        <Link to={'/SpecializationsPage'}>
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
                <AddSpischalForm />
            </section>
      )
}
