import * as React from "react"
import Layout from "../components/layout";
import SphereVideo from "../assets/video.mp4";
import * as styles from "../components/styles/index.module.css";

const IndexPage = () => {

  const openMenu = () => {
    const menuToggle = document.querySelector('.toggle');
    const showcase = document.querySelector('.showcase');
    menuToggle.classList.toggle('active');
    showcase.classList.toggle('active'); 
  }
  return (
    <Layout pageTitle="Event Bookings">
      <section className={styles.showcase}>
        <header>
          <h2 className={styles.logo}>Event Bookings</h2>   
          <div 
            onClick={openMenu}
            className={styles.toggle}></div>
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

      <div className={styles.menu}>
        <ul>
          <button>link</button>
          <button>link</button>
          <button>link</button>
        </ul>
      </div>
    </Layout>
  )
}

export default IndexPage
