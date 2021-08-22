import React, {useEffect} from 'react';
import NavBar from './NavBar';
import {findUser} from '../../utils/crud';

const DashboardComponent = (props) => {

  console.log(props.user);
  useEffect(() => {
    findUser(props.user)
      .then(res => res.json())
      .then(data => console.log(data)); 
  })

  return (
    <>
      <NavBar user={props.user}/>
    </>
  )
}

export default DashboardComponent;