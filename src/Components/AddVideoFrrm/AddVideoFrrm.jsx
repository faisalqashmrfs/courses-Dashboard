import './AddVideoFrrm.css'
import downArow from './../../assets/Images/downArow.png'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function AddVideoFrrm() {

  const [drop1, setdrop1] = useState(true)

  const token = localStorage.getItem('token');

  function HandelChangeDropMnue() {
    setdrop1(true)
  }

  const [version_id, setversion_id] = useState('')
  const [specialization_id, setspecialization_id] = useState('')
  const [path, setpath] = useState('')
  const [title, settitle] = useState('')
  const [description, setdescription] = useState('')
  const [number, setnumber] = useState('')
  const [dates, setdates] = useState('')


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
  const [status, setStatus] = useState('');
  const [status1, setStatus1] = useState('');
  const [status2, setStatus2] = useState('');
  const [status3, setStatus3] = useState('');
  const [status4, setStatus4] = useState('');
  const [status5, setStatus5] = useState('');
  const [status6, setStatus6] = useState('');
  const [status7, setStatus7] = useState('');

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
    const url = 'https://platform.focal-x.com/api/video';

    const data = {
      version_id: version_id,
      specialization_id: specialization_id,
      path: path,
      title: title,
      description: description,
      number: number,
      dates: dates,
    };

    console.log(data);
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    try {
      const response = await axios.post(url, data, { headers });
      if (response.status == 200 || response.status == 201) {
        setStatus7('Created successfully');
      }
      console.log(response.data);
    } catch (error) {
      console.error('There was an error!', error);
    }
  };




  return (
    <section className='AddVideoFrrm'
    >
      <h3>إضافة فيديو</h3>
      <form>
        <div>
          {<p className={!status == '' ? 'erroron1' : 'error-off1'}>{status}</p>}
          <input type="text" placeholder='عنوان الجلسة' onChange={(e) => (settitle(e.target.value), setStatus(""))} />
        </div>
        <div>
          {<p className={!status5 == '' ? 'erroron1' : 'error-off1'}>{status5}</p>}
          <input type="number" placeholder='رقم الجلسة' onChange={(e) => (setnumber(e.target.value), setStatus5(""))} />
        </div>
        <div>
          {<p className={!status6 == '' ? 'erroron1' : 'error-off1'}>{status6}</p>}
          <input type="date" placeholder='تاريخ الجلسة' onChange={(e) => (setdates(e.target.value), setStatus6(""))} />
        </div>
        <div>
          {<p className={!status1 == '' ? 'erroron1' : 'error-off1'}>{status1}</p>}
          <input type="text" placeholder='وصف الجلسة' onChange={(e) => (setdescription(e.target.value), setStatus1(""))} />
        </div>
        <div>
          {<p className={!status2 == '' ? 'erroron1' : 'error-off1'}>{status2}</p>}
          <input type="text" placeholder='رابط الجلسة' onChange={(e) => (setpath(e.target.value), setStatus2(""))} />
        </div>
        <div>
          {<p className={!status3 == '' ? 'erroron1' : 'error-off1'}>{status3}</p>}
          <select name="" id="" onChange={(event) => (setspecialization_id(event.target.value), setStatus3(""))} >
            <option value="">الاختصاصات</option>
            {
              datas.map((e, index) => (
                <option key={index} value={e.id}>{e.name}</option>
              ))
            }
          </select>
        </div>
        <div>
          {<p className={!status4 == '' ? 'erroron1' : 'error-off1'}>{status4}</p>}
          <select name="" id="" onChange={(event) => (setversion_id(event.target.value), setStatus4(""))} >
            <option value="">رقم الدفعة</option>
            {datav.map((e, index) => (
              <option key={index} value={e.id}>{e.name}</option>
            ))}
          </select>
        </div>
      </form>
      <div className='AddVideoButtons'>
        <Link to={'/MainPage'}>
          <button className='cancel'>إلغاء</button>
        </Link>
        {<p className={!status7 == '' ? 'succsses' : 'succsses-off'}>{status7}</p>}
        <button
          className='AddVideo' onClick={handleSubmit}>إضافة فيديو</button>
      </div>
    </section>
  )
}
