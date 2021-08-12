import React, {useState} from 'react';
import { getUser } from '../../services/auth';
import NavBar from './NavBar';

const Dashboard = () => {

  return (
    <>
      <NavBar />
      <p>name: {getUser().name} </p>
      <p>email: {getUser().email} </p>
    </>
  )
}

export default Dashboard;