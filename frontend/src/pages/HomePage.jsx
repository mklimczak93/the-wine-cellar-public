import React from 'react';
import { Link } from 'react-router-dom';
import MainLogo from '../assets/project-icons/home-page-wc-logo.svg';
import MainPhoto from '../assets/project-photos/home-page-photo-01.jpg';
import '../index.css';

export default function HomePage() {
    return(   
        <div className="page home-page">
            <div className="left-div">
                <img src={MainPhoto} className="home-page-photo" alt="Bottle of red wine"></img>
                <Link to="/cellar-page">
                        <button className="color-accent-button">Wine Cellar</button>
                </Link>
            </div>
            <div className="right-div">
                <div className="main-title-div">
                    <img src={MainLogo} className="main-title-logo" alt="Wine Cellar - best wines, best prices."></img>
                </div>
                <p>Never forget a great wine again. 
                    With Wine Cellar, you can easily store and organize all your favorite wines
                    in one place. Our app also helps you find the best deals online
                    so you can enjoy your favorite wines at a fraction of the price.
                    Cheers to saving time, money, and tasting the finest wines!
                </p>
                <Link to="/find-out-more">
                    <button className="simple-button find-out-more-button">Find out more</button>
                </Link>
            </div>
        </div>
)
}
