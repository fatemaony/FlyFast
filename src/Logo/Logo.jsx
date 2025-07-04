import React from 'react'
import Ellipse from '/Ellipse2.png'
import { Link } from 'react-router';

const Logo = () => {
  return (
    <Link to={"/"}>
        <div>
      <div>
        <img className='w-9 h-6 mt-2 ms-3' src={Ellipse} alt="" />
      </div>
      <div>
        <h1 className='font-bold text-2xl -mt-3'>FlyFast</h1>
      </div>
    </div>
    </Link>
  )
}

export default Logo;