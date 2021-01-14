import React from 'react';
import loader from './830.png'
import "./preloader.css"

const Preloader = () => {
  return (
    <div className='loader'>
      <img src={loader} alt="img"/>
    </div>
  );
}

export default Preloader;
