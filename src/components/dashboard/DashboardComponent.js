import React, {useEffect, useState} from 'react';
import NavBar from './NavBar';
import UserForm from '../business_info/UserForm';
import {userExists} from '../../utils/crud';

const DashboardComponent = (props) => {

  const [openUserForm, setOpenUserForm] = useState(false);

  useEffect(async () => {
    if(await userExists(props.user.email) === false) {
      setOpenUserForm(true);
    };
  });

  return (
    <>
      {openUserForm 
        ? <UserForm open={openUserForm}/>
        : <NavBar user={props.user}/>
      }
    </>
  )
}

export default DashboardComponent;