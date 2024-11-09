import React from 'react';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top w-100" style={{"backgroundColor": "#C8102E"}}>
      <a className="navbar-brand ms-2" href="#">FreeNU</a>
      <a className="navbar-brand text-end " href="">other</a>
    </nav>
  );
}

export default Navbar;
