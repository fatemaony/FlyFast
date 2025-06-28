import React from 'react'
import Banner from '../Home/Banner'
import HowItWork from '../Home/HowItWork'
import Counting from '../Component/Counting'
import SalesTeam from '../Home/SalesTeam'
import Merchant from '../Home/Marchent'

const Home = () => {
  return (
   <div>
    <Banner/>
    <Counting/>
    <HowItWork/>
    <Merchant/>
    <SalesTeam/>
   </div>
  )
}

export default Home