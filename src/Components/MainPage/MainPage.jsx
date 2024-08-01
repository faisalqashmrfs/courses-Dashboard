import React, { useEffect, useState } from 'react'
import { HashLoader } from 'react-spinners'
import './MainPage.css';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from '../Nanvbar/NavBar';
import downArow from './../../assets/Images/downArow.png'
import VideosTable from '../VideosTable/VideosTable';
import axios from 'axios';

export default function MainPage({ setChosingCategory, ChosingCategory }) {

    const [loding, setloding] = useState(false)

    const [leave, setleave] = useState(false)

    const navigate = useNavigate();

    const token = localStorage.getItem('token');

    const [error, setError] = useState('');

    const [datav, setDatav] = useState([]);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/version`,
            {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            })
            .then(response => {
                setDatav(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });
    }, [token]);

    const [datas, setDatas] = useState([]);

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

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/logout',
                {},
                {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    }
                }
            );
            if (response.status === 200) {
                navigate('/');
                localStorage.removeItem('token')
            } else {
                setError('خطأ في تسجيل الخروج.');
            }
        } catch (error) {
            console.error('حدث خطأ غير متوقع:', error);
            setError('حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.');
        }
    };

    function handelChangCategory(ID) {
        setChosingCategory(ID)
        localStorage.setItem('NAVid',ID)
    }

    const [togle, settogle] = useState(false)

    const [data, setData] = useState([]);

    const [ V , setV] = useState('')
    const [ S , setS] = useState('')

    console.log(S);
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/video${V == '' ? '' : `?version=${V}&`}${S && V ? '&' : ''}${S == '' ? '' : `specialization=${S}`}`,
            {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            })
            .then(response => {
                setData(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });
    }, [V , token , S]);

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
                    <Link to={'./addVideo'}><button className='AddVideo'>إضافة فيديو</button></Link>
                    <div className={togle ? "FilteringBox" : "FilteringBoxOff"}>
                        <button>تطبيق</button>
                        <select name="" id="">
                            <option value="">الى</option>
                        </select>
                        <select name="" id="">
                            <option value="">من</option>
                        </select>
                        <p>التاريخ</p>
                        <select name="" id="" onChange={ (event) => setV(event.target.value)} >
                            <option value="">رقم الدفعة</option>
                            {datav.map(( e , index ) => (
                                <option key={index} value={e.id}>{e.name}</option>
                            ))}
                        </select>
                        <select name="" id="" onChange={ (event) => setS(event.target.value)} >
                            <option value="">الاختصاصات</option>
                            {
                                datas.map(( e , index )=>(
                                    <option key={index} value={e.id}>{e.name}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>
                <section className='Vidio-Table-section'>
                    <ul className='main'>
                        <li>الإعدادات</li>
                        <li>رقم الدفعة</li>
                        <li>الاختصاص</li>
                        <li>رابط الجلسة</li>
                        <li>تاريخ الجلسة</li>
                        <li>رقم الجلسة</li>
                        <li>عنوان الجلسة</li>
                    </ul>
                    {
                        data.map((e , index) => (
                            <ul className='VideoROW' key={index}>
                                <li className="edit-del">
                                    <button>حذف</button>
                                    <button>تعديل</button>
                                </li>
                                <li className="item">{e.version_id}</li>
                                <li className="item">{e.specialization_id}</li>
                                <li className="item">{e.path}</li>
                                <li className="item">{e.date}</li>
                                <li className="item">{e.number}</li>
                                <li className="item">{e.title.split(' ').slice(0, 5).join(' ')}</li>
                            </ul>
                        ))
                    }
                </section>
            </main>

            <div className={leave ? 'LeaveFather' : 'LeaveFatherDis'}>
                <div className={leave ? 'Leave' : 'Leaveoff'}>
                    <h3>هل تريد الخروج؟</h3>
                    <div>
                        <Link onClick={handleLogin}>
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