import downArow from './../../assets/Images/downArow.png'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Upload from './../../assets/Images/Upload.png'
import './AddSpischalForm.css'
import ImageDropZone from '../ImageDropZone/ImageDropZone'


export default function AddSpischalForm() {
    
    const [faile, setChildValue] = useState(null); //chosing

    const [drop1, setdrop1] = useState(true)

    function HandelChangeDropMnue() {
        setdrop1(true)
    }

    function relodingWindow() {
        window.location.reload()
    }

    const handleChildValueChange = (faile) => {
        setChildValue(faile);
      };

    return (
        <section className='AddVideoFrrm'
        >
            <h3>إضافة اختصتص</h3>
            <form>
                <input type="text" placeholder='اسم الاختصاص' />
                <div>
                    <select name="" id="" >
                        <option value="">رقم الدفعة</option>
                    </select>
                    <img
                        className='Normal'
                        src={downArow}
                        alt=""
                    />
                </div>
            </form>
            <div className='Upload-Area'>
                <img src={Upload} alt="Upload photo" />
                <h3>اضغط لرفع  صورة الاختصاص</h3>
            </div>
            <div className='contant-fq'>
                    <ImageDropZone 
                    onChildValueChange={handleChildValueChange}
                    />
                </div>
            <div className='AddVideoButtons'>
                <Link to={'/MainPage'}>
                    <button className='cancel'>إلغاء</button>
                </Link>
                <button
                    onClick={() => relodingWindow()}
                    className='AddVideo'>إضافة فيديو</button>
            </div>
        </section>
    )
}
