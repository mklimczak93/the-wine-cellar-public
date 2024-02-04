import React from 'react';
import { Link } from 'react-router-dom';
//photos
import Photo01 from '../assets/project-photos/photo-01.jpg';
import Photo02 from '../assets/project-photos/photo-02.jpg';
import Photo03 from '../assets/project-photos/photo-03.jpg';
import Photo04 from '../assets/project-photos/photo-04.jpg';
import '../index.css';

export default function FindOutMorePage() {
    return(   
        <div className="page find-out-more-page">
            <h1>Wine Cellar</h1>
            <h4 className="fom-subtitle">Discover and Save Your Favorite Wines</h4>
            <div className="fom-part-01">
                <div className="vert-line">
                    
                </div>
                <div className="fom-grid">
                
                    <img src={Photo01} className="fom-photo" alt=""></img>
                    <div className="fom-text">
                        <h4>Create your personal wine profile</h4>
                        <p>With Wine Cellar, you can easily create your own user profile 
                            to store and organize all your favorite wines in one place.  
                            Keep track of your wine preferences, explore new ones, 
                            and share your recommendations with friends.
                        </p>
                    </div>
                
                
                
                    <div className="fom-text right-alignment">
                        <h4>Build your private wine cellar</h4>
                        <p>Never lose track of your favorite wines again! 
                            Wine Cellar allows you to save and organize all the wines you love 
                            in one convenient location. Keep a record of their details, including name, 
                            type, sweetness, denomination, grape variety, location, year, tasting notes, 
                            and suitable pairings.
                        </p>
                    </div>
                    <img src={Photo02} className="fom-photo" alt=""></img>
                

                
                    <img src={Photo03} className="fom-photo" alt=""></img>
                    <div className="fom-text">
                        <h4>Find the best deals online</h4>
                        <p>No more searching multiple websites for the best prices on your favorite wines.
                        Our built-in app wine finder analyzes available online wine providers to find 
                        you the greatest deals and best prices. 
                        Save both time and money with Wine Cellar.
                        </p>
                    </div>
                

                
                    <div className="fom-text right-alignment">
                        <h4>Take your wine collection on the go</h4>
                        <p>Wine Cellar is designed to be user-friendly and accessible on all devices. 
                            Whether you're at home or on-the-go, access your wine cellar from anywhere 
                            using our fully mobile-optimized app.
                            Whether you're a seasoned sommelier or just starting your wine journey, 
                            our user-friendly app will enhance your experience.
                        </p>
                    </div>
                    <img src={Photo04} className="fom-photo" alt=""></img>
                </div>
            </div>
            <h3>Spend less time searching and more time enjoying your favorite wines.</h3>
            <Link to="/register-page">
                <button className="simple-button">Start your Wine Cellar</button>
            </Link>
            <p className="bottom-text">Wine Cellar © 2024</p>
            
        </div>
)
}