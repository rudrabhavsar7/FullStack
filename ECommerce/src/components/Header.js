import React from "react";
import { Link } from "react-router-dom";


function Header() {
    return (
        <nav className="navbar navbar-expand-lg navbar-white bg-white">
            <div className="container-fluid">
                <Link className="navbar-brand me-3" to="/">ECommerce</Link>
                <div className="collapse navbar-collapse show" id="navbarNav">
                    <ul className="navbar-nav flex-row">
                        <li className="nav-item me-3">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/mycart">MyCart</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Header;
