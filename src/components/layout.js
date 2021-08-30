import React, {useEffect} from 'react';
import "./styles/layout.css";
import {useDispatch} from 'react-redux';
import {populate} from '../state/eventListSlice';

const Layout = ({ pageTitle, children }) => {

  const dispatch = useDispatch();

  useEffect(() => {
    async function eb() {
      try {
        let data = await fetch(`${process.env.EXPRESS_API_HOST}/eventbrite/read`);
        let events = await data.json();
        console.log('in layout.js', events);
        for (let i = 0; i < events.length; i++) {
          dispatch(populate(events[i]));
        }
      } catch (err) {
        console.error(err); 
      } 
    }
    eb();
  }, []);

  return (
    <div>
      <title>{pageTitle}</title> 
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      <>
        {children}
      </>
    </div> 
  );
}

export default Layout;