import './AddVideoFrrm.css'
import downArow from './../../assets/Images/downArow.png'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function AddVideoFrrm() {

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
      <h3>إضافة فيديو</h3>
      <form>
        <input type="text" placeholder='عنوان الجلسة' />
        <div>
          <select name="" id="" >
            <option value="">رقم الجلسة</option>
          </select>
          <img
            className='Normal'
            src={downArow}
            alt=""
          />
        </div>
        <div>
          <select name="" id="" >
            <option value="">تاريخ الجلسة</option>
          </select>
          <img
            className='Normal'
            src={downArow}
            alt=""
          />
        </div>
        <input type="text" placeholder='وصف الجلسة' />
        <input type="text" placeholder='رابط الجلسة' />
        <div>
          <select name="" id=""
            onClickCapture={() => HandelChangeDropMnue()}
          >
            <option value="">الاختصاص1</option>
            <option value="">الاختصاص2</option>
            <option value="">الاختصاص3</option>
            <option value="">الاختصاص4</option>
            <option value="">الاختصاص4</option>
          </select>
          <img
            className={drop1 ? "Normal" : "UnNormal"}
            src={downArow}
            alt=""
          />
        </div>
        <div>
          <select name="" id="">
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
