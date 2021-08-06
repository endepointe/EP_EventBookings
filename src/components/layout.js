import * as React from 'react';
import "./styles/layout.css";

const Layout = ({ pageTitle, children }) => {
  return (
    <div>
      <title>{pageTitle}</title> 
      <main>
        {children}
      </main>
    </div> 
  );
}

export default Layout;