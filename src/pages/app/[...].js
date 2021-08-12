import React from 'react';
import { Router } from "@reach/router";
import PrivateRoute from '../../components/PrivateRoute';
import Dashboard from '../../components/dashboard/Dashboard';
import Login from '../../components/Login';

const App = () => {
  return (
    <Router>
      <PrivateRoute path="/app/dashboard" component={Dashboard} />  
      <Login path="/app/login" />
    </Router>
  )
}

export default App;