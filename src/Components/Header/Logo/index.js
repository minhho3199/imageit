import React from 'react';
import logos from './logo.png'
import './styles.css'

const Logo = () => {
 return (
   <div className="logo">
   <img src={logos} alt="a logo" />
   </div>
 );
};

export default Logo;

