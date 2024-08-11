import React, { useEffect, useState } from 'react'
import { HashLoader } from 'react-spinners'
import { Link } from 'react-router-dom';
import NavBar from '../Nanvbar/NavBar';
import downArow from './../../assets/Images/downArow.png'
import axios from 'axios';

export default function UserPage({ setChosingCategory, ChosingCategory }) {

    const [loding, setloding] = useState(false)
    const token = localStorage.getItem('token');
    const [leave, setleave] = useState(false)

    function handelChangCategory(ID) {
        setChosingCategory(ID)
        localStorage.setItem('NAVid', ID)
    }

    const [togle, settogle] = useState(false)

    function handelLeaving() {
        setleave(!leave)
        setloding(false)
    }

    const [Masseg, setMasseg] = useState(false);
    const [deleteID, setdeleteID] = useState('');
    const [datav, setDatav] = useState([]);
    const [data, setData] = useState([]);
    const [datas, setDatas] = useState([]);
    const [error, seterror] = useState('');

    useEffect(() => {
        axios.get(`https://platform.focal-x.com/api/version`,
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

    const [V, setV] = useState('')
    const [S, setS] = useState('')
    const [name, setname] = useState('')

    useEffect(() => {
        seterror('')
        axios.get(`https://platform.focal-x.com/api/user${name == '' ? '' : `?name=${name}&`}${V == '' ? '' : `?version=${V}&`}${S && V ? '&' : ''}${S == '' ? '' : `specialization=${S}`}`,
            {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            })
            .then(response => {
                setData(response.data.data);
                console.log(response.data.data);
                seterror('')
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
                seterror('Not Founded')
            });
    }, [token, V, S, name]);

    const [deleted, setDeleted] = useState(false);

    const handleDelete = () => {
        setMasseg(false);
        axios.delete(`https://platform.focal-x.com/api/user/${deleteID}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                console.log(response);
                setDeleted(true);
                // تحديث حالة Data لإزالة العنصر المحذوف
                setData(prevData => prevData.filter(item => item.id !== deleteID));
            })
            .catch(error => {
                console.error(error);
            });
    };

    function HandelDeletUser(id) {
        setMasseg(true);
        setdeleteID(id);
    }


    useEffect(() => {
        axios.get(`https://platform.focal-x.com/api/specializations`,
            {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            })
            .then(response => {
                setDatas(response.data.data);


            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });
    }, [token]);

    // Create a new array with repeated elements from the main array based on the subarray length
    const repeatedData = data.flatMap(user =>
        user.relation.map((relationItem, index) => ({
            ...user,
            relationItem
        }))
    );

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
                    <Link to={'./AddUser'}><button className='AddVideo'>إضافة مستخدم</button></Link>
                    <div className={togle ? "FilteringBox" : "FilteringBoxOff"}>
                        <button>تطبيق</button>
                        <input type="text" placeholder='Name' onChange={(e) => setname(e.target.value)} />
                        <select name="" id="" onChange={(event) => setV(event.target.value)} >
                            <option value="">رقم الدفعة</option>
                            {datav.map((e, index) => (
                                <option key={index} value={e.id}>{e.name}</option>
                            ))}
                        </select>
                        <select name="" id="" onChange={(event) => setS(event.target.value)} >
                            <option value="">الاختصاصات</option>
                            {
                                datas.map((e, index) => (
                                    <option key={index} value={e.id}>{e.name}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>
                <section className='Vidio-Table-section'>
                    <table>
                        <thead>
                            <tr>
                                <th data-label="الإعدادات">الإعدادات</th>
                                <th data-label="الاختصاص">الاختصاص</th>
                                <th data-label="رقم الدفعة">رقم الدفعة</th>
                                <th data-label="كلمة السر">كلمة السر</th>
                                <th data-label="البريد الالكتروني">البريد الالكتروني</th>
                                <th data-label="اسم المتدرب">اسم المتدرب</th>
                            </tr>
                        </thead>
                        <tbody>
                            {repeatedData.map((e, index) => (
                                <tr key={index}>
                                    <td data-label="الإعدادات">
                                        <button onClick={() => HandelDeletUser(e.id)}>حذف</button>
                                        <Link to={`/UserPage/EditUser/${e.id}`}><button >تعديل</button></Link>
                                        
                                    </td>
                                    <td data-label="رقم الدفعة">{datas.map((namev) => (
                                        <>{e.relationItem.specialization_id === namev.id && <li key={namev.id}>{namev.name}</li>}</>
                                    ))}</td>
                                    <td data-label="الاختصاص">{datav.map((namev) => (
                                        <>{e.relationItem.version_id === namev.id && <li key={namev.id}>{namev.name}</li>}</>
                                    ))}</td>
                                    <td data-label="كلمة السر">{e.password_show
                                    }</td>
                                    <td data-label="البريد الالكتروني">{e.email}</td>
                                    <td data-label="اسم المتدرب">{e.name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
                {/* <section className='Vidio-Table-section'>
                    <ul className='main'>
                        <li>الإعدادات</li>
                        <li>الاختصاص</li>
                        <li>رقم الدفعة</li>
                        <li>كلمة السر</li>
                        <li>البريد الالكتروني</li>
                        <li>اسم المتدرب</li>
                    </ul>
                    <h2 style={{ color: 'red', textAlign: 'center' }}>{error == '' ? '' : error}</h2>
                    {repeatedData.map((e, index) => (
                        <ul key={index} className='VideoROW'>
                            <li className="edit-del">
                                <button>حذف</button>
                                <button>تعديل</button>
                            </li>
                            <li className="item"></li>
                            <li className="item"></li>
                            <li className="item"></li>
                            <li className="item"></li>
                            <li className="item-With-Check">{e.name}</li>
                        </ul>
                    ))}
                </section> */}
            </main>
            <section className='DeletingMasseg-box'>
                <div className={Masseg ? 'DeletingMasseg' : 'DeletingMasseg-off'}>
                    <h2>Do You Want To Delete This Row</h2>
                    <div>
                        <button className='Yes' onClick={handleDelete}>Yes</button>
                        <button className='No' onClick={() => setMasseg(false)}>No</button>
                    </div>
                </div>
            </section>
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
