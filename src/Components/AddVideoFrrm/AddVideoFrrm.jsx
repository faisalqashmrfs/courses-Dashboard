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

  const handleSubmit = async () => {
    const url = 'http://127.0.0.1:8000/api/video';

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
      // console.log(response.data);
    } catch (error) {
      console.error('There was an error!', error);
    }
  };




  return (
    <section className='AddVideoFrrm'
    >
      <h3>إضافة فيديو</h3>
      <form>
        <input type="text" placeholder='عنوان الجلسة' onChange={(e) => settitle(e.target.value)} />
        <div>
          <input type="number" placeholder='رقم الجلسة' onChange={(e) => setnumber(e.target.value)} />
        </div>
        <div>
          <input type="date" placeholder='تاريخ الجلسة' onChange={(e) => setdates(e.target.value)} />
        </div>
        <input type="text" placeholder='وصف الجلسة' onChange={(e) => setdescription(e.target.value)} />
        <input type="text" placeholder='رابط الجلسة' onChange={(e) => setpath(e.target.value)} />

        <select name="" id="" onChange={(event) => setspecialization_id(event.target.value)} >
          <option value="">الاختصاصات</option>
          {
            datas.map((e, index) => (
              <option key={index} value={e.id}>{e.name}</option>
            ))
          }
        </select>
        <select name="" id="" onChange={(event) => setversion_id(event.target.value)} >
          <option value="">رقم الدفعة</option>
          {datav.map((e, index) => (
            <option key={index} value={e.id}>{e.name}</option>
          ))}
        </select>
      </form>
      <div className='AddVideoButtons'>
        <Link to={'/MainPage'}>
          <button className='cancel'>إلغاء</button>
        </Link>
        <button
          className='AddVideo'onClick={handleSubmit}>إضافة فيديو</button>
      </div>
    </section>
  )
}
