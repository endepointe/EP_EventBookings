import * as React from "react"
import { useState } from 'react';
import Layout from "../components/layout";
import SphereVideo from "../assets/video.mp4";
import * as styles from "../components/styles/index.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleRight,
  faBars, faTimes
} from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter } from "@fortawesome/free-brands-svg-icons";

const IndexPage = () => {
  const [menu, setMenu] = useState(false);

  const openMenu = () => {
    setMenu(!menu); 
  }
  const test = () => {
    console.log('test');
  }
  return (
    <Layout pageTitle="Event Bookings">
      <section  
        className={styles.showcase}>
        <header>
          <h2 className={styles.logo}>Event Bookings</h2>   
          <FontAwesomeIcon 
            onClick={openMenu}
            className={styles.barsIcon}
            icon={faBars} size="lg" />   
        </header>

        {/* <video muted loop autoPlay>
          <source src={SphereVideo} /> 
        </video> */}

        <div className={styles.overlay}></div>

        <div className={styles.headline}>
          <div className={styles.text}>
            <h2>Keep pushing</h2> 
            <h3>Foreward</h3>
          </div>
          <div>
            <p>Find your event today</p>
            <button 
              onClick={test}
              className={styles.arrowBtn}>
              <div className={styles.arrowText}>Explore</div>
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
            <FontAwesomeIcon 
              className={styles.socialIcon}
              icon={faTwitter} />
            <a href="twitter.com">
              twitter</a>
            </li> 
          <li>
            <FontAwesomeIcon 
              className={styles.socialIcon}
              icon={faFacebook} />
            <a href="facebook.com">facebook</a></li> 
        </ul>
      </section>

      <div className={
        menu ? 
          `${styles.menu} ${styles.active}`
          : `${styles.menu}`}>
        <FontAwesomeIcon 
          className={styles.closeIcon}
          onClick={openMenu} icon={faTimes} color="black" />
        <ul className={styles.menuList}>
          <li>link</li>
          <li>link</li>
          <li>link</li>
        </ul>
      </div>
    </Layout>
  )
}

export default IndexPage
