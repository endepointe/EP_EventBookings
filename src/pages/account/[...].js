import React from 'react';
import { Router } from "@reach/router";
import PrivateRoute from '../../components/PrivateRoute';
import Dashboard from '../../components/dashboard/Dashboard';
import UserForm from '../../components/business_info/UserForm';
import Login from '../../components/Login';

const Account = () => {
  return (
    <Router>
      <PrivateRoute path="/account/business-info" component={UserForm} />
      <PrivateRoute path="/account/dashboard" component={Dashboard} />  
      <Login path="/account/login" />
    </Router>
  )
}

export default Account;