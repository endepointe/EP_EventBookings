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
      console.log('props.user.email: ', props.user.email);
      let exists = await userExists(props.user.email);
      console.log('exists: ', exists);
      if (!exists){ // &&  
      //if(await userExists(props.user.email) === false &&
        // isAuthenticated()) {
        handleOpenUserForm();
      }
      return;
    }
    checkUserRegistration();
    
  }, [props.user.email]);

  useEffect(() => {
  
  })

  const handleOpenUserForm = () => {
    setOpenUserForm(!openUserForm);
  }

  return (
    <Layout>
      {openUserForm 
        ? <UserForm 
            open={openUserForm} 
            handleOpenUserForm={handleOpenUserForm}
            user={props.user} />
        : <Dashboard user={props.user} />
      }
    </Layout>
  )
}

export default DashboardComponent;