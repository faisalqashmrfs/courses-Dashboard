import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Upload from './../../assets/Images/Upload.png'
import './AddSpischalForm.css'
import ImageDropZone from '../ImageDropZone/ImageDropZone'
import axios from 'axios'


export default function AddSpischalForm() {

    const token = localStorage.getItem('token');
    const [status, setStatus] = useState('');
    const [status2, setStatus2] = useState('');
    //// 

    const [ChildValue, setChildValue] = useState(null); //chosing
    const [names, setnames] = useState('');

    const [drop1, setdrop1] = useState(true)

    // function HandelChangeDropMnue() {
    //     setdrop1(true)
    // }

    function HandelChangenames(e) {
        setnames(e.target.value)
    }

    const handleChildValueChange = (faile) => {
        setChildValue(faile);
    };

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

    const handleSubmit = async (event) => {
        setStatus('');
        setStatus2('');
        event.preventDefault();
        
        if (!ChildValue && !names) {
          setStatus('.قم بإختيار اسم الاختصاص و الصورة أولاًًُ');
          return;
        }else if(!names) {
            setStatus('.قم بإختيار اسم الاختصاص أولاًًُ');
            return;
          }else if(!ChildValue) {
            setStatus('.قم بإختيار الصورة أولاًًُ');
            return;
          }
        
        const formData = new FormData();
        formData.append('image', ChildValue);
        formData.append('name', names);
        
        try {
          const response = await axios.post('https://platform.focal-x.com/api/specializations', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${token}`
            },
          });
    
          if(response.status == 200 || response.status == 201)
          {
            setStatus2('Created successfully');
          }
          console.log('Response:', response);
        } catch (error) {
          setStatus(`Error: ${error.response.data.message}`);
        }
      };

    return (
        <section className='AddVideoFrrm'
        >
            <h3>إضافة اختصاص</h3>
            <form>
                <input type="text" placeholder='اسم الاختصاص' onChange={ (e) => HandelChangenames(e) }/>
            </form>
            <div className='Upload-Area'>
                <img src={Upload} alt="Upload photo" />
                <h3>اضغط لرفع  صورة الاختصاص</h3>
            </div>
            <div className='contant-fq'>
                <ImageDropZone
                    onChildValueChange={handleChildValueChange}
                />
            </div>
            {<p className={!status == '' ? 'erroron' : 'error-off'}>{status}</p>}
            {<p className={!status2 == '' ? 'succsses' : 'succsses-off'}>{status2}</p>}
            <div className='AddVideoButtons'>
                <Link to={'/SpecializationsPage'}>
                    <button className='cancel'>إلغاء</button>
                </Link>
                <button
                    onClick={handleSubmit}
                    className='AddVideo'
                    >إضافة اختصاص</button>
            </div>
        </section>
    )
}
