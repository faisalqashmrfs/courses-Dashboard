import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './AddUserFrrm.css';

export default function AddUserFrrm() {
  const token = localStorage.getItem('token');

  const [versions, setVersions] = useState([{ version_id: '', specialization_id: '' }]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ name: '', email: '', password: '', versions: [] });

  const handleChange = (index, event) => {
    const values = [...versions];
    values[index][event.target.name] = Number(event.target.value);
    setVersions(values);
  };

  const handleAddFields = () => {
    setVersions([...versions, { version_id: '', specialization_id: '' }]);
  };

  const handleRemoveFields = (index) => {
    const values = [...versions];
    values.splice(index, 1);
    setVersions(values);
  };

  const handlename = (event) => {
    setName(event.target.value)
    setStatus('')
  };

  const handlemail = (event) => {
    setEmail(event.target.value)
    setStatus1('')
  };

  const handlPassword = (event) => {
    setPassword(event.target.value)
    setStatus2('')
  };

  const [status, setStatus] = useState('');
  const [status1, setStatus1] = useState('');
  const [status2, setStatus2] = useState('');

  const handleSubmit = async (event) => {
    setStatus('');

    event.preventDefault();

    if (!name) {
      setStatus('! هذا الحقل مطلوب');
    }
    if (!email) {
      setStatus1('! هذا الحقل مطلوب');
    }
    if (!email) {
      setStatus2('! هذا الحقل مطلوب');
    }

    const data = {
      name,
      email,
      password,
      password_show: password,
      version_id: versions.map(version => version.version_id),
      specialization_id: versions.map(version => version.specialization_id),
    };

    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    console.log(data);
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/user', data, { headers });
      console.log('Response:', response.data);
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  const [datav, setDatav] = useState([]);
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/version`, {
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
    axios.get(`http://127.0.0.1:8000/api/specializations`, {
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

  return (
    <section className='AddVideoFrrm'>
      <h3>إضافة مستخدم</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <div>
          {<p className={!status == '' ? 'erroron1' : 'error-off1'}>{status}</p>}
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={name}
            onChange={(event) => handlename(event)}
            style={{ borderColor: status !== '' ? 'red' : '' }}
          />
          </div>
            <div>
            {<p className={!status1 == '' ? 'erroron1' : 'error-off1'}>{status1}</p>}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => handlemail(e)}
            style={{ borderColor: status1 !== '' ? 'red' : '' }}
          />
            </div>
            <div>
            {<p className={!status2 == '' ? 'erroron1' : 'error-off1'}>{status2}</p>}
          <input
            type="text"
            name="password"
            placeholder="password"
            value={password}
            onChange={(e) => handlPassword(e)}
            style={{ borderColor: status2 !== '' ? 'red' : '' }}
          />
            </div>
        </div>
        {versions.map((version, index) => (
          <div key={index}>
            <select
              name="version_id"
              value={version.version_id}
              onChange={(event) => handleChange(index, event)}
            >
              <option value="">اختر رقم الدفعة</option>
              {datav.map((option) => (
                <option key={option.id} value={option.id}>{option.name}</option>
              ))}
            </select>

            <select
              name="specialization_id"
              value={version.specialization_id}
              onChange={(event) => handleChange(index, event)}
            >
              <option value="">اختر رقم الاختصاص</option>
              {datas.map((option) => (
                <option key={option.id} value={option.id}>{option.name}</option>
              ))}
            </select>
            <button type="button" onClick={() => handleRemoveFields(index)}>Remove</button>
          </div>
        ))}
        <button type="button" onClick={handleAddFields}>Add More</button>
        <div className='AddVideoButtons'>
          <Link to={'/UserPage'}>
            <button className='cancel'>إلغاء</button>
          </Link>
          <button type="submit" className='AddVideo'>إضافة مستخدم</button>
        </div>
      </form>
    </section>
  );
}
