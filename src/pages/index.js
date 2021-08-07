import * as React from "react"
import { useState } from 'react';
import Layout from "../components/layout";
import SphereVideo from "../assets/video.mp4";
import * as styles from "../components/styles/index.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars, faTimes
} from '@fortawesome/free-solid-svg-icons';

const IndexPage = () => {
  const [menu, setMenu] = useState(false);

  const openMenu = () => {
    console.log('open the menu');
    setMenu(!menu); 
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

        <div className={styles.text}>
          <h2>never stop</h2> 
          <h3>making</h3>
          <p>some motivational text</p>
          <button>explore</button>
        </div>

        <ul className={styles.social}>
          <li><a href="twitter.com">twitter</a><img src="" alt="" /></li> 
          <li><a href="facebook.com">facebook</a><img src="" alt="" /></li> 
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
