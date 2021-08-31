import React, {useEffect, useState} from 'react';
import Layout from '../layout';
import Dashboard from './Dashboard';
import UserForm from '../business_info/UserForm';
import {userExists} from '../../utils/crud';
import {isAuthenticated} from '../../utils/auth';

// need to provide a logout button just in case the 
// user wants to create a different account under another
// email address.
const DashboardComponent = (props) => {

  const [openUserForm, setOpenUserForm] = useState(false);

  useEffect(() => {
    async function checkUserRegistration() {
      // for new accounts
      if(await userExists(props.user.email) === false &&
        isAuthenticated()) {
        handleOpenUserForm();
      }
      return;
    }
    checkUserRegistration();
    
  }, [props.user.email]);

  const handleOpenUserForm = () => {
    setOpenUserForm(!openUserForm);
  }

  return (
    <Layout>
      {/* change back to true after getting a working event list design */}
      {!openUserForm 
        ? <UserForm 
            open={openUserForm} 
            handleOpenUserForm={handleOpenUserForm}
            user={props.user} />
        : <Dashboard />
      }
    </Layout>
  )
}

export default DashboardComponent;