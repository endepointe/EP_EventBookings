import React from 'react';
import { getUser } from '../../services/auth';
import NavBar from './NavBar';

const Dashboard = () => {
  return (
    <>
      <NavBar/>
      <div>dashboard</div> 
      <p>name: {getUser().name} </p>
      <p>email: {getUser().email} </p>
    </>
  )
}

export default Dashboard;