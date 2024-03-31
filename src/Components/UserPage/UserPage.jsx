import React, { useEffect, useState } from 'react'
import { HashLoader } from 'react-spinners'
import { Link } from 'react-router-dom';
import NavBar from '../Nanvbar/NavBar';
import downArow from './../../assets/Images/downArow.png'
import UserTable from '../UserTable/UserTable';

export default function UserPage({setChosingCategory , ChosingCategory}) {
  const [loding, setloding] = useState(false)

    const [leave, setleave] = useState(false)

    function handelChangCategory(ID) {
        setChosingCategory(ID)
        // console.log('UserPage')
    }

    const [togle, settogle] = useState(false)

    // useEffect(() => {
    //     setloding(true)
    //     setTimeout(() => {
    //         setloding(false)
    //     }, 5000);
    // }, [])

    function handelLeaving() {
        setleave(!leave)
        setloding(false)
    }

    return (
        <>
            <div className={loding ? "loader-spinner" : "loader-spinnerOf"}>
                <HashLoader color="#ef8507" />
            </div>
            <main className={loding ? "ForBlur" : ""}>
                <NavBar setleave={setleave} />
                <div className='CategoryData'>
                    <ul className='list'>
                        <Link to={'/MainPage'}>
                            <li onClick={() => handelChangCategory(0)} className={ChosingCategory === 0 ? "Chosingitem" : "item"}><span>الفيديوهات</span></li>
                        </Link>
                        <Link to={'/UserPage'}>
                            <li onClick={() => handelChangCategory(1)} className={ChosingCategory === 1 ? "Chosingitem" : "item"}><span>المستخدمين</span></li>
                        </Link>
                        <Link to={'/SpecializationsPage'}>
                            <li onClick={() => handelChangCategory(2)} className={ChosingCategory === 2 ? "Chosingitem" : "item"}><span>الاختصاصات</span></li>
                        </Link>
                    </ul>
                </div>
                <div className='FillteringArea'>
                    <button onClick={() => settogle(!togle)} className='FillterButton' ><img className={togle ? "imgDefaulterON" : "imgDefaulter"} src={downArow} alt="downArow" /> ترتيب حسب</button>
                    <Link to={'./AddUser'}><button className='AddVideo'>إضافة فيديو</button></Link>
                    <div className={togle ? "FilteringBox" : "FilteringBoxOff"}>
                        <button>تطبيق</button>
                        <select name="" id="">
                            <option value="">الاسم</option>
                        </select>
                        <select name="" id="">
                            <option value="">رقم الدفعة</option>
                        </select>
                        <select name="" id="">
                            <option value="">الاختصاصات</option>
                        </select>
                    </div>
                </div>
                <UserTable />
            </main>








            <div className={leave ? 'LeaveFather' : 'LeaveFatherDis'}>
                <div className={leave ? 'Leave' : 'Leaveoff'}>
                    <h3>هل تريد الخروج؟</h3>
                    <div>
                        <Link to={'/'}>
                            <button className='yes'>نعم</button>
                        </Link>
                        <button
                            onClick={() => handelLeaving()}
                            className='no'>لا</button>
                    </div>
                </div>
            </div>
        </>
  )
}
