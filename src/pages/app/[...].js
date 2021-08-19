import React from 'react';
import { Router } from "@reach/router";
import PrivateRoute from '../../components/PrivateRoute';
import Dashboard from '../../components/dashboard/Dashboard';
import UserForm from '../../components/collect_business_info/UserForm';
import Login from '../../components/Login';

const App = () => {
  return (
    <Router>
      <PrivateRoute path="/app/collect-business-info" component={UserForm} />
      <PrivateRoute path="/app/dashboard" component={Dashboard} />  
      <Login path="/app/login" />
    </Router>
  )
}

export default App;