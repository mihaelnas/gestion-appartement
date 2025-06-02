import React from "react";
import "../styles/Navbar.css"

const Navbar = ({ onAddClick}) => {
    return (
        <nav className="navbar">
            <h1 className="logo">Mon application</h1>
            <button className="add-btn" onClick={onAddClick}>Ajouter</button>
        </nav>
    )
}

export default Navbar;