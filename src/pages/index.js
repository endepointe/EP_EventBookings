import * as React from "react"
import {Router} from '@reach/router';
import LandingPage from '../components/LandingPage';

const IndexPage = () => {
  return (
    <Router>
      <LandingPage path="/"/>
    </Router>
  )
}

export default IndexPage;
