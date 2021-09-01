import * as React from "react"
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {getAllEvents, fetchEvents} from '../state/eventListSlice';
import { Link } from 'gatsby';
import Layout from "../components/layout";
// import SphereVideo from "../assets/video.mp4";
import * as styles from "../components/styles/index.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleRight,
  faBars, faLock, faTimes
} from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { isAuthenticated } from "../utils/auth";

const IndexPage = () => {
  const [menu, setMenu] = useState(false);

  const dispatch = useDispatch();
  const events = useSelector(getAllEvents);
  const eventStatus = useSelector(state => state.events.status);

 
  useEffect(() => {
    console.log(eventStatus);
    if (eventStatus === 'idle') {
      dispatch(fetchEvents());
    }
  }, [eventStatus,dispatch]);

  const openMenu = () => {
    setMenu(!menu); 
  }
  const startHere = () => {
    console.log('start here clicked');
  }

  return (
    <Layout pageTitle="Event Bookings">
      <section  
        className={styles.showcase}>
        <header>
          <h2 className={styles.logo}>Event Bookings</h2>   
          <FontAwesomeIcon 
            onClick={openMenu}
            className={menu ? `${styles.hide}`: `${styles.barsIcon}` }
            icon={faBars} />   
        </header>

        {/* <video muted loop autoPlay>
          <source src={SphereVideo} /> 
        </video> */}
        {/* Video by Pressmaster from Pexels */}

        <div className={styles.overlay}></div>

        <div className={styles.headline}>
          <div className={styles.text}>
            <h2>Keep pushing</h2> 
            <h3>Foreward</h3>
            <p>Find your event today.</p>
          </div>
          <div>
            {/* <p className={styles.tester}>Find your event today</p> */}
            <button 
              onClick={startHere}
              className={styles.arrowBtn}>
              <div className={styles.arrowText}>Start Here</div>
              <div className={styles.arrows}>
                <FontAwesomeIcon 
                  className={styles.arrow}
                  icon={faAngleRight} />
                <FontAwesomeIcon 
                  className={styles.arrow}
                  icon={faAngleRight} />
                <FontAwesomeIcon 
                  className={styles.arrow}
                  icon={faAngleRight} />
              </div>
            </button>
          </div>
        </div>

        <ul className={styles.social}>
          <li>
            <a href="twitter.com">
              <FontAwesomeIcon 
                className={styles.socialIcon}
                icon={faTwitter} />
              Twitter</a>
          </li> 
          <li>
            <a href="facebook.com">
              <FontAwesomeIcon 
                className={styles.socialIcon}
                icon={faFacebook} />  
              Facebook
            </a>
          </li> 
          <li>
            <a href="http://localhost:8000">
              <FontAwesomeIcon 
                className={styles.socialIcon}
                icon={faLock} />  
              Privacy
            </a>
          </li> 
        </ul>
      </section>

      <div className={
        menu ? 
          `${styles.menu} ${styles.active}`
          : `${styles.menu}`}>
        <FontAwesomeIcon 
          className={styles.closeIcon}
          onClick={openMenu} icon={faTimes} color="white" />
        <ul className={styles.menuList}>
          <li>
            {/* <Link 
              className={styles.link}
              to="/dashboard">Dashboard</Link> */}
              {/* goes to the same auth process 
                  with the given url, so no problem 
              */}
            {isAuthenticated() ? (
              <Link 
                className={styles.link}
                to="/dashboard">Dashboard</Link>
            ) : (
              <Link 
                className={styles.link}
                to="/dashboard">Login</Link>
            )}
          </li>
          <li>
            <Link 
              className={styles.link}
              to="/about">About</Link>
          </li>
          <li>
            <Link 
              className={styles.link}
              to="/contact">Contact</Link>
            </li>
        </ul>
      </div>
    </Layout>
  )
}

export default IndexPage;
