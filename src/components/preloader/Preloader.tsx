import React from 'react';
import { FC } from 'react';
import loader from './830.png'
import "./preloader.css"

const Preloader:FC = () => {
  return (
    <div className='loader'>
      <img src={loader} alt="img"/>
    </div>
  );
}

export default Preloader;
