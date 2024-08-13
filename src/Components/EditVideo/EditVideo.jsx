import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import FocalX from './../../assets/Images/FocalX.png';
import back from './../../assets/Images/backkk.svg';

export default function EditVideo() {
    const token = localStorage.getItem('token');

    const { id } = useParams()
    const [datav, setDatav] = useState([]);

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

    const [datas, setDatas] = useState([]);

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
    const [oneData, setoneData] = useState()

    useEffect(() => {
        axios.get(`https://platform.focal-x.com/api/video/${id}`,
            {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            })
            .then(response => {
                setoneData(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });
    }, [token]);

    const [version_id, setversion_id] = useState('')
    const [version_id1, setversion_id1] = useState('')
    const [specialization_id, setspecialization_id] = useState('')
    const [specialization_id2, setspecialization_id2] = useState('')
    const [path, setpath] = useState('')
    const [title, settitle] = useState('')
    const [description, setdescription] = useState('')
    const [number, setnumber] = useState('')
    const [dates, setdates] = useState('')

    useEffect(() => {
        setTimeout(() => {
            settitle(oneData.title)
            setpath(oneData.path)
            setdescription(oneData.description)
            setnumber(oneData.number)
            setdates(oneData.date)
            setspecialization_id(datas.filter(item => item.name == oneData.specialization_id)[0].id)
            setspecialization_id2(oneData.specialization_id)
            setversion_id(datav.filter(item => item.name == oneData.version_id)[0].id)
            setversion_id1(oneData.version_id)
        }, 1000);
    }, [oneData, token, id])




    const [drop1, setdrop1] = useState(true)




    function HandelChangeDropMnue() {
        setdrop1(true)
    }
    const [status, setStatus] = useState('');
    const [status1, setStatus1] = useState('');
    const [status2, setStatus2] = useState('');
    const [status3, setStatus3] = useState('');
    const [status4, setStatus4] = useState('');
    const [status5, setStatus5] = useState('');
    const [status6, setStatus6] = useState('');
    const [status7, setStatus7] = useState('');

    const handleSubmit = async () => {

        if (!title) setStatus('! هذا الحقل مطلوب')
        if (!description) setStatus1('! هذا الحقل مطلوب')
        if (!path) setStatus2('! هذا الحقل مطلوب')
        if (!specialization_id) setStatus3('! هذا الحقل مطلوب')
        if (!version_id) setStatus4('! هذا الحقل مطلوب')
        if (!number) setStatus5('! هذا الحقل مطلوب')
        if (!dates) setStatus6('! هذا الحقل مطلوب')

        if (!title || !description || !path || !specialization_id || !version_id || !number || !dates) {
            return
        }

        const url = `https://platform.focal-x.com/api/video/${id}`;

        const data = {
            version_id: version_id,
            specialization_id: specialization_id,
            path: path,
            title: title,
            description: description,
            number: number,
            date: dates,
        };

        console.log(data);
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        };

        try {
            const response = await axios.put(url, data, { headers });
            if (response.status == 200 || response.status == 201) {
                setStatus7('Updated successfully');
              }
        } catch (error) {
            console.error('There was an error!', error);
        }
    };




    return (
        <section className='AddVideoFrrm'
        >
            <nav className='ADD-videoNav'>
                <div className='side_1'>
                    <Link to={'/MainPage'}>
                        <img className='Secrsh' src={back} alt="Secrsh" />
                    </Link>
                </div>
                <div className='side_2'>
                    <div><h3>اسم الآدمن</h3></div>
                    <Link to={'/MainPage'}>
                        <img src={FocalX} alt="FocalX_Icone" />
                    </Link>
                </div>
            </nav>
            <h3>إضافة فيديو</h3>
            <form>
                <div>
                    {<p className={!status == '' ? 'erroron1' : 'error-off1'}>{status}</p>}
                    <input value={title} type="text" placeholder='عنوان الجلسة' onChange={(e) => (settitle(e.target.value), setStatus(""))} />
                </div>
                <div>
                    {<p className={!status5 == '' ? 'erroron1' : 'error-off1'}>{status5}</p>}
                    <input type="number" placeholder='رقم الجلسة' value={number} onChange={(e) => setnumber(e.target.value)} />
                </div>
                <div>
                    {<p className={!status6 == '' ? 'erroron1' : 'error-off1'}>{status6}</p>}
                    <input type="date" placeholder='تاريخ الجلسة' value={dates} onChange={(e) => setdates(e.target.value)} />
                </div>
                <div>
                    {<p className={!status1 == '' ? 'erroron1' : 'error-off1'}>{status1}</p>}
                    <input type="text" placeholder='وصف الجلسة' value={description} onChange={(e) => setdescription(e.target.value)} />
                </div>
                <div>
                    {<p className={!status2 == '' ? 'erroron1' : 'error-off1'}>{status2}</p>}
                    <input type="text" placeholder='رابط الجلسة' value={path} onChange={(e) => (setpath(e.target.value), setStatus2(""))} />
                </div>
                <div>
                    {<p className={!status3 == '' ? 'erroron1' : 'error-off1'}>{status3}</p>}
                    <select name="" id="" onChange={(event) => (setspecialization_id(event.target.value), setspecialization_id2(true))}>
                        {!specialization_id2 ?
                            <option value="">الاختصاصات</option>
                            :
                            <option> {specialization_id2} : الإختيار السابق </option>}
                        {
                            datas.map((e, index) => (
                                <option key={index} value={e.id}>{e.name}</option>
                            ))
                        }
                    </select>
                </div>
                <div>
                    {<p className={!status4 == '' ? 'erroron1' : 'error-off1'}>{status4}</p>}
                    <select name="" id="" onChange={(event) => (setversion_id(event.target.value), setversion_id1(true))} >
                        {
                            !version_id1 ?
                                <option value="">لدفعة</option>
                                :
                                <option value={datav.filter(item => item.name == oneData.specialization_id)[0]}>{version_id1} : الإختيار السابق </option>
                        }
                        {
                            datav.map((e, index) => (
                                <option key={index} value={e.id}>{e.name}</option>
                            ))
                        }
                    </select>
                </div>
            </form>
            <div className='AddVideoButtons'>
                <Link to={'/MainPage'}>
                    <button className='cancel'>إلغاء</button>
                </Link>
                {<p className={!status7 == '' ? 'succsses' : 'succsses-off'}>{status7}</p>}
                <button
                    className='AddVideo' onClick={handleSubmit}>تعديل فيديو</button>
            </div>
        </section>
    )
}
