import React, {useEffect, useState} from 'react';
import NavBar from './NavBar';
import UserForm from '../business_info/UserForm';
import {userExists} from '../../utils/crud';
import {isAuthenticated, logout} from '../../utils/auth';
import {navigate} from 'gatsby';

// need to provide a logout button just in case the 
// user wants to create a different account under another
// email address.
const DashboardComponent = (props) => {

  const [openUserForm, setOpenUserForm] = useState(false);

  useEffect(() => {
    async function checkUserRegistration() {
      if(await userExists(props.user.email) === false &&
        isAuthenticated()) {
        setOpenUserForm(true);
      } else {
        setOpenUserForm(false);
        logout();
        navigate('/'); 
      }
    }
    checkUserRegistration();
  }, [props.user.email]);

  return (
    <>
      {openUserForm 
        ? <UserForm 
            open={openUserForm} 
            user={props.user} />
        : <NavBar />
      }
    </>
  )
}

export default DashboardComponent;