import React, { useState } from "react";
import { Link } from "react-router-dom";
import '../../css/style.css'



const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/index" className="navbar-logo">
          <img
            src={process.env.PUBLIC_URL + "/../static/img/logotipo.png"}
            alt="Logo Synapse"
            className="logo-img"
          />
        </Link>

        {/* Botón hamburguesa */}
        <button className="menu-btn" onClick={() => setOpen(!open)}>
          ☰
        </button>

        {/* Links */}
        <ul className={`menu-links ${open ? "open" : ""}`}>
          <li><Link to="/index">Inicio</Link></li>
          <li><Link to="/mision">Misión</Link></li>
          <li><Link to="/register">Registro</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;