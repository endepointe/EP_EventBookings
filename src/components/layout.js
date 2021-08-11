import * as React from 'react';
import "./styles/layout.css";

const Layout = ({ pageTitle, children }) => {
  return (
    <div>
      <title>{pageTitle}</title> 
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      <main>
        {children}
      </main>
    </div> 
  );
}

export default Layout;