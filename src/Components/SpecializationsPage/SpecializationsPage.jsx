import React, { useEffect, useState } from 'react'
import { HashLoader } from 'react-spinners'
import { Link } from 'react-router-dom';
import NavBar from '../Nanvbar/NavBar';
import downArow from './../../assets/Images/downArow.png'
import SpeciallTable from '../SpeciallTable/SpeciallTable';
import axios from 'axios';

export default function SpecializationsPage({ setChosingCategory, ChosingCategory }) {

    const [loding, setloding] = useState(false)
    const token = localStorage.getItem('token');
    const [leave, setleave] = useState(false)

    function handelChangCategory(ID) {
        setChosingCategory(ID)
        localStorage.setItem('NAVid', ID)
    }

    const [togle, settogle] = useState(false)
    const [datas, setDatas] = useState([]);

    function handelLeaving() {
        setleave(!leave)
        setloding(false)
    }


    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/specializations`,
            {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            })
            .then(response => {
                setDatas(response.data.data);
                console.log(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });
    }, [token]);

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
                    <Link to={'./AddSpischalli'}><button className='AddVideo'>إضافة فيديو</button></Link>
                    <div className={togle ? "FilteringBox" : "FilteringBoxOff"}>
                        <button>تطبيق</button>
                        <select name="" id="">
                            <option value="">رقم الدفعة</option>
                        </select>
                    </div>
                </div>
                <section className='Vidio-Table-section'>
                    <ul className='main'>
                        <li>الإعدادات</li>
                        <li>صورة الاختصاص</li>
                        <li>اسم الاختصاص</li>
                    </ul>
                    {datas.map((e) => (
                        <ul className='VideoROW'>
                            <li className="edit-del">
                                <button>حذف</button>
                                <button>تعديل</button>
                            </li>
                            <li className="item"><img src={e.image} alt="" /></li>
                            <li className="item">{e.name}</li>
                        </ul>
                    ))}

                </section>
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
