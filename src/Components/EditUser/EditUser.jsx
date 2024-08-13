import { Link, useParams } from 'react-router-dom'
import FocalX from './../../assets/Images/FocalX.png';
import back from './../../assets/Images/backkk.svg';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function EditUser() {

  const token = localStorage.getItem('token');
  const { id } = useParams()

  const [versions, setVersions] = useState([{ version_id: '', specialization_id: '' }]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ name: '', email: '', password: '', versions: [] });

  const [oneData, setoneData] = useState()

  useEffect(() => {
    axios.get(`https://platform.focal-x.com/api/user/${id}`, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
    .then(response => {
      // const user = response.data.find(user => user.id == id);
      setoneData(response.data.data);
      console.log(response.data.data);
    })
    .catch(error => {
      console.error('Error fetching data: ', error);
    });
    
}, [token]);

useEffect(() => {
  if (oneData) {
    setName(oneData.name);
    setEmail(oneData.email);
    setPassword(oneData.password_show);
    setVersions(oneData.relation.map(item => ({
      version_id: item.version_id,
      specialization_id: item.specialization_id
    })));
  }
}, [oneData]);


// console.log(versions[0].pivot.version_id);


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
    setName(event.target.value);
    setStatus('');
  };

  const handlemail = (event) => {
    setEmail(event.target.value);
    setStatus1('');
  };

  const handlPassword = (event) => {
    setPassword(event.target.value);
    setStatus2('');
  };

  const [status, setStatus] = useState('');
  const [status1, setStatus1] = useState('');
  const [status2, setStatus2] = useState('');
  const [status3, setStatus3] = useState('');
  const [status4, setStatus4] = useState('');

  const validateFields = () => {
    const newErrors = { name: '', email: '', password: '', versions: [] };

    if (!name) setStatus('! هذا الحقل مطلوب');
    if (name.length < 3 && name.length !== 0) setStatus('! الاسم أقصر من المتوقع');
    if (!email) setStatus1('! هذا الحقل مطلوب');
    if (!password) setStatus2('! هذا الحقل مطلوب');
    if (password.length < 6 && password.length !== 0) setStatus2('! يجب أن تحتوي كلمة المرو 6 أحرف على الأقل ');

    versions.forEach((version, index) => {
      const versionErrors = { version_id: '', specialization_id: '' };
      if (!version.version_id) versionErrors.version_id = '! هذه الحقول مطلوبة';
      if (!version.specialization_id) versionErrors.specialization_id = '! هذا الحقل مطلوب';
      newErrors.versions[index] = versionErrors;
    });

    setErrors(newErrors);
    return (
      !newErrors.name &&
      !newErrors.email &&
      !newErrors.password &&
      versions.length === newErrors.versions.length &&
      newErrors.versions.every(version => !version.version_id && !version.specialization_id)
    );
  };

  const handleSubmit = async (event) => {
    setStatus('');
    setStatus3('');
    event.preventDefault();

    if (!validateFields()) return;

    if(!name || !email || !password || name.length < 3 || password.length < 7 )
    {
      return
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
      const response = await axios.put(`https://platform.focal-x.com/api/user/${id}`, data, { headers });
      console.log('Response:', response.data);
      if(response.status == 200 || response.status == 201)
        {
          setStatus3('Updated successfully');
        }
    } catch (error) {
      console.error('There was an error!', error);
      setStatus(`Error: ${error.response.data.message}`);
    }
  };

  const [datav, setDatav] = useState([]);
  useEffect(() => {
    axios.get(`https://platform.focal-x.com/api/version`, {
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
    axios.get(`https://platform.focal-x.com/api/specializations`, {
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
    <>
      <section>
        <nav className='ADD-videoNav'>
          <div className='side_1'>
            <Link to={'/UserPage'}>
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
        
      </section>
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
        {versions && versions.map((version, index) => (
  <div key={index}>
    <select
      name="version_id"
      value={version.version_id}
      onChange={(event) => handleChange(index, event)}
      style={{ borderColor: errors.versions[index]?.version_id ? 'red' : '' }}
    >
      <option value="">اختر رقم الدفعة</option>
      {datav.map((option) => (
        <option key={option.id} value={option.id}>{option.name}</option>
      ))}
    </select>
    {errors.versions[index]?.version_id && <p className={!errors.versions[index]?.version_id == '' ? 'erroron1' : 'error-off1'}  style={{ color: 'red' }}>{errors.versions[index].version_id}</p>}

    <select
      name="specialization_id"
      value={version.specialization_id}
      onChange={(event) => handleChange(index, event)}
      style={{ borderColor: errors.versions[index]?.specialization_id ? 'red' : '' }}
    >
      <option value="">اختر الاختصاص</option>
      {datas.map((option) => (
        <option key={option.id} value={option.id}>{option.name}</option>
      ))}
    </select>
    {errors.versions[index]?.specialization_id && <p style={{ color: 'red' }}>{errors.versions[index].specialization_id}</p>}
    <button style={{backgroundColor:'red',color:'white', border:'none',padding : '6px 12px'
      , fontSize:"16px" , margin : '5px 0', cursor:'pointer'
    }} type="button" onClick={() => handleRemoveFields(index)}>Remove</button>
  </div>
))}

        <button type="button" onClick={handleAddFields} style={{backgroundColor:'green',color:'white', border:'none',padding : '6px 12px'
      , fontSize:"16px" , margin : '5px 0' , cursor:'pointer'
    }} >Add More</button>
        <div className='AddVideoButtons'>
          <Link to={'/UserPage'}>
            <button className='cancel'>إلغاء</button>
          </Link>
          {<p className={!status3 == '' ? 'succsses' : 'succsses-off'}>{status3}</p>}
          {<p className={!status4 == '' ? 'erroron' : 'error-off'}>{status4}</p>}
          <button style={{color:'white'}} type="submit" className='AddVideo'>إضافة مستخدم</button>
        </div>
      </form>
    </section>
    </>
  )
}
