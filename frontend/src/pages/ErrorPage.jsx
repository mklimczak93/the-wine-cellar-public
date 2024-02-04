import React from 'react';
import {Link} from 'react-router-dom';
import '../index.css';

export default function ErrorPage() {
    return(   
        <div className="full-flex-page">
            <div className="big-message-div">
                <h1 className="margin-bottom">Oops...</h1>
                <h3>The page not found.</h3>
                <p>Go back to <Link to="/" className="simple-link">Home Page</Link>.</p>
            </div>
        </div>
)
}