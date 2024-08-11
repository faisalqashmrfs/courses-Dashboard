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
    const [Masseg, setMasseg] = useState(false);
    const [deleteID, setdeleteID] = useState('');

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
        axios.get(`https://platform.focal-x.com/api/specializations`,
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

    const [deleted, setDeleted] = useState(false);

    const handleDelete = () => {
        setMasseg(false);
        axios.delete(`https://platform.focal-x.com/api/specializations/${deleteID}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                console.log(response);
                setDeleted(true);
                // تحديث حالة Data لإزالة العنصر المحذوف
                setDatas(prevData => prevData.filter(item => item.id !== deleteID));
            })
            .catch(error => {
                console.error(error);
                // setDatas(prevData => prevData.filter(item => item.id !== deleteID));
            });
    };

    function HandelDeletUser(id) {
        setMasseg(true);
        setdeleteID(id);
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
                    <Link to={'./AddSpischalli'}><button className='AddVideo'>إضافة اختصاص</button></Link>
                    <div className={togle ? "FilteringBox" : "FilteringBoxOff"}>
                        <button>تطبيق</button>
                        <select name="" id="">
                            <option value="">رقم الدفعة</option>
                        </select>
                    </div>
                </div>


                <section className='Vidio-Table-section'>
                    <table>
                        <thead>
                            <tr>
                                <th data-label="الإعدادات">الإعدادات</th>
                                <th data-label="صورة الاختصاص">صورة الاختصاص</th>
                                <th data-label="اسم الاختصاص">اسم الاختصاص</th>
                            </tr>
                        </thead>
                        <tbody>
                            {datas.map((e, index) => (
                                <tr key={index}>
                                    <td data-label="الإعدادات">
                                        <button onClick={() => HandelDeletUser(e.id)}>حذف</button>
                                        <button>تعديل</button>
                                    </td>
                                    <td data-label="البريد الالكتروني"><img src={e.image} alt="" /></td>
                                    <td data-label="البريد الالكتروني">{e.name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
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
