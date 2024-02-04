//main imports
import React from 'react';
import { useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useLogout } from '../hooks/useLogout';
import { NavLink, Outlet } from "react-router-dom";
//images
import MainLogo from "../assets/project-logos/The-Wine-Cellar-logo-hor-letters.svg";
//css
import '../index.css';


export default function RootLayout() {
    const { user } = useAuthContext();
    const [ openMenu, SetOpenMenu ] = useState('false');

    function openSmallMenu() {
        let menuToBeOpened = null;
        if (user) {
            menuToBeOpened = document.getElementById('navbar-links-loggedin')
        } else {
            menuToBeOpened = document.getElementById('navbar-links-loggedout')
        }
        
        if (openMenu === 'false') {
            menuToBeOpened.style.display='flex';
            SetOpenMenu('true');
        } else {
            menuToBeOpened.style.display='none';
            SetOpenMenu('false');
        }
    }

    //logging out logic
    const { logout } = useLogout();
    function handleClick() {
        logout();
    }

    return (
        <div className="root-layout">
            <div className="header">
                <nav className="navbar">
                    <div className="nav-part-01">
                        <NavLink to="/">
                            <img src={MainLogo} className="main-logo" alt="The Wine Cellar Logo"></img>
                        </NavLink>
                        <div className="navbar-toggle-button"  id="navbar-toggle-button" onClick={openSmallMenu}>
                            <span className="bar"></span>
                            <span className="bar"></span>
                            <span className="bar"></span>
                        </div>
                    </div>
                    {user && <div className="navbar-links" id="navbar-links-loggedin">
                        <NavLink to="/cellar-page" className="navbar-link">Cellar</NavLink>
                        <NavLink to="/profile-page" className="navbar-link">Profile</NavLink>
                        <button onClick={handleClick} className="logout-button">Log Out</button>
                    </div>}
                    {!user && <div className="navbar-links" id="navbar-links-loggedout">
                        <NavLink to="/find-out-more" className="navbar-link">Find out more</NavLink>
                        <NavLink to="/login-page" className="navbar-link">Log In</NavLink>
                        <NavLink to="/register-page" className="navbar-link">Register</NavLink>
                    </div>}
                </nav>
            </div>
            <main>
                <Outlet />
                <div className="social-media-links">
                    <div className="vert-line"></div>
                    <a href="https://www.instagram.com/" className="rotated-side-text" target="_blank" rel="noreferrer">Instagram</a>
                    <a href="https://www.tiktok.com/" className="rotated-side-text" target="_blank" rel="noreferrer">Tiktok</a>
                    <a href="https://www.facebook.com/" className="rotated-side-text" target="_blank" rel="noreferrer">Facebook</a>
                    <div className="vert-line"></div>
                </div>
                <div className="copyright-text-div">
                    <p className="rotated-side-text">The Wine Cellar © 2024</p>
                </div>
            </main>
        </div>
    )
}