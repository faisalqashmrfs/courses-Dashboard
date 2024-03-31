import downArow from './../../assets/Images/downArow.png'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function AddUserFrrm() {

    const [drop1, setdrop1] = useState(true)

    function HandelChangeDropMnue() {
      setdrop1(true)
    }
  
    function relodingWindow() {
      window.location.reload()
    }
  
    return (
      <section className='AddVideoFrrm'
      >
        <h3>إضافة مستخدم</h3>
        <form>
          <input type="text" placeholder='اسم المتدرب' />
          <input type="text" placeholder='البريد الإلكتروني' />
          <input type="text" placeholder='كلمة السر' />
          <div>
            <select name="" id="" >
              <option value="">الحالة</option>
            </select>
            <img
              className='Normal'
              src={downArow}
              alt=""
            />
          </div>
          <div>
            <select name="" id="" >
              <option value="">الاختصاص</option>
            </select>
            <img
              className='Normal'
              src={downArow}
              alt=""
            />
          </div>
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
