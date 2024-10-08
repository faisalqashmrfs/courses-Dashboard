import React, { useState } from 'react';
import  new_article from './../../assets/Images/add-circle.svg'
import './ImageDropZone.css'


const ImageDropZone = ({onChildValueChange}) => {
  
    const [image, setImage] = useState(null);
    const [imageVisible, setImageVisible] = useState(true);
    const handleImageLoad = () => {
        setImageVisible(false);
    };
    const handleDrop = (e) => {
      e.preventDefault();
    const file = e.dataTransfer.files[0];
    onChildValueChange(file)
      handleImage(file); 
    };
    
    const handleDragOver = (e) => {
    e.preventDefault();
    };
    
    const handleImage = (file) => {
    const reader = new FileReader();
     reader.onload = (event) => {
     setImage(event.target.result);
    };
    reader.readAsDataURL(file);
    }; 

  return (
    <div
    
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className='HJ_form-image'> 
         <img src={image}   onLoad={handleImageLoad} alt=''
          style={{ width: '100%', height: '400px'}}
           />
         <img  className={imageVisible ? 'HJ_new' : 'hidden'} src={new_article} alt="new article" />  
    </div>
  )
}

export default ImageDropZone

