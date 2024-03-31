import './Logein.css'
import VideoFooter from '../VideoFooter/VideoFooter'
import Focal from './../../assets/Images/focal.png'
import showPass from './../../assets/Images/showPass.png'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useState } from 'react'


export default function Logein() {

    const { handleSubmit, errors } = useForm()

    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = (data) => {
        console.log(data.password);
    };


    return (
        <section className='LogeIn'>
            <img className='Logo' src={Focal} alt="Focal photo" />
            <div className='Main-box'>
                <h2>Welcome </h2>
                <h4>Courses platform Dashboard</h4>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input type="Email" name="email" placeholder='Enter your E-mail' />
                    <div className='pass-Area'>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder='Password'
                            name="password"
                        />
                        <img
                            onClick={() => setShowPassword(!showPassword)}
                            src={showPass} alt="showPass" />
                    </div>
                    <Link to={'./MainPage'}><button>Login</button></Link>
                </form>
            </div>
            <div className='Footer'>
                <VideoFooter />
            </div>
        </section>
    )

}
