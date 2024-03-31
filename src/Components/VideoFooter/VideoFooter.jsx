import './VideoFooter.css'
import x from './../../assets/Images/x.png'
import insta from './../../assets/Images/insta.png'
import linkedin from './../../assets/Images/linkedin.png'
import behance from './../../assets/Images/behance.png'
import facebook from './../../assets/Images/facebook.png'

export default function VideoFooter() {
    return (
        <footer className='Video-Footer'>
            <div className='contant'>
                <p>
                    2021 - 2023 focal X agency All Right Reserved
                </p>
                <div className='IconsFather'>
                    <div>
                        <img src={x} alt="" />
                    </div>
                    <div>
                        <img src={insta} alt="" />
                    </div>
                    <div>
                        <img src={linkedin} alt="" />
                    </div>
                    <div>
                        <img src={behance} alt="" />
                    </div>
                    <div>
                        <img src={facebook} alt="" />
                    </div>
                </div>
            </div>
        </footer>
    )
}
