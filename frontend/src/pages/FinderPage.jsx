import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import WineDeal from '../components/WineDeal';
import WineOutline from "../assets/project-icons/wine-outline.svg";
import '../index.css';

export default function FinderPage() {
    const { id } = useParams();
    const { user } = useAuthContext();
    const [ chosenWine, setChosenWine ] = useState('');
    const [ DealsComponents, setDealsComponents ] = useState([]);
    const [ SimiliarDealsComponents, setSimiliarDealsComponents ] = useState([]);
    const [ wineImagePath, setWineImagePath] = useState('');
    const [ error, setError ] = useState('');
    const [ mssg, setMssg ] = useState('');

    //getting the chosen wine
     async function getWine() {
        if (!user) {
            setError('You must be logged in to see wine details.')
            return
        }
        const res = await fetch('http://localhost:4000/api/cellar/' + id, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        });
        const wineObject = await res.json();
        if (res.ok) {
            setChosenWine(wineObject);
            let path = "/uploads/" + wineObject.imagePath;
            setWineImagePath(path);
        } else {
            setError(wineObject.error)
        }
    };
    useEffect(() => {
        getWine();
    }, []);

    //getting all deals based on name of the wine
    useEffect(() => {
        const getDeals = async () => {
            if (!user) {
                setError('You must be logged in to see wine details.')
                return
            }
            const res = await fetch('http://localhost:4000/api/deals/' + id, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const wineDealsObject = await res.json();
            if (res.ok) {
                //wine deals - searched by name/denominations
                let importedDeals = [];
                let importedRecommendations = [];

                wineDealsObject.forEach((deal) => {
                    if (deal.matchedBy === "name") {
                        importedDeals.push(<WineDeal wine = {deal} number = {importedDeals.length + 1 } />);
                    } else if (deal.matchedBy === "similiarity") {
                        importedRecommendations.push(<WineDeal wine = {deal} number = {importedRecommendations.length + 1 } />);
                    }
                });
                console.log(importedDeals);
                console.log(importedRecommendations);
                setDealsComponents(importedDeals)
                setSimiliarDealsComponents(importedRecommendations)
                
            } else {
                setError(wineDealsObject.error)
            } 
        };
        getDeals();
    }, []);

    //getting other recomendations



    return( 
        <div className="full-flex-page"> 
            {/* --- --- --- ERROR --- --- --- */}
            {error && user &&  <div className="big-message-div">
            <h3>Error</h3>
            <p>{error}</p>
            </div>}

            {mssg && !error  && <div className="big-message-div">
                <h3>Hey,</h3>
                <p>{mssg}</p>
            </div>}

            {!user && !error && !mssg  && <div className="big-message-div">
                <h3>You need to be logged in to access this page.</h3>
                <Link to="/login-page">Click here to login. </Link>
            </div>}

            {/* --- --- --- FINDER --- --- --- */}
            {user && !error && !mssg && <div className="full-flex-page">
                <div className='finder-wrapper'>
                    <h1 className="finder-main-title">Find the best deals</h1>

                    {/* analyzed wine */}
                    <div className="analyzed-wine-div">
                        <div className="finder-photo-div">
                            <img src={wineImagePath} className="wine-image uploaded-photo finder-photo" alt="Wine image"></img>
                            <img src={WineOutline} className="wine-image wine-closeup-outline finder-photo" alt="Wine outline"></img>
                        </div>
                        <div className="wine-info-text-and-buttons-div">
                            <div className="finder-wine-info">
                                <div className="finder-wine-title">
                                    <p>Chosen wine:</p>
                                    <h4>{chosenWine.name}</h4>
                                </div>
                                <div className="finder-wine-qualities">
                                    <p>{chosenWine.wineType}</p>
                                    <p>{chosenWine.sweatness}</p>
                                    <p>{chosenWine.grape}</p>
                                </div>
                            </div>
                            
                        </div>
                        <div className="finder-wine-details-buttons">
                                <Link to="/cellar-page">
                                    <button className="simple-button small">
                                        <p className="button-text-right">Cellar</p>
                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M3.29492 12.9751H12.9326V2.89062" stroke="white"/>
                                            <path d="M12.9326 12.9753L1.20898 1.3252" stroke="white"/>
                                        </svg>

                                    </button>
                                </Link>
                            </div>
                    </div>

                    {/* deals based on name */}
                    <h2 className="finder-subtitle">Search results</h2>
                    <div className="finder-div">
                        <h3 className="rotated-slogan">Best wines, best prices.</h3>
                        <div className="finder-titles">
                            <p className="finder-title">No.</p>
                            <p className="finder-title">Wine</p>
                            <p className="finder-title">Available</p>
                            <p className="finder-title">Price</p>
                            <p className="finder-title">Link</p>
                        </div>
                        {/* if no deals found */}
                        { DealsComponents.length === 0 && <div className="wine-deal not-found">
                            <h4>No wine matching chosen criteria was found.</h4>
                            <p className="deal-p">Perhaps try changing the wine name, or see below for similiar wines found.</p>
                        </div>}
                        {/* if deals found */}
                        { DealsComponents }
                    </div>

                    {/* recommendation deals */}
                    <h2 className="finder-subtitle">Other recomendations</h2>
                    <div className="finder-div">
                        <div className="finder-titles">
                            <p className="finder-title">No.</p>
                            <p className="finder-title">Wine</p>
                            <p className="finder-title">Available</p>
                            <p className="finder-title">Price</p>
                            <p className="finder-title">Link</p>
                        </div>
                        {/* if no deals found */}
                        { SimiliarDealsComponents.length === 0 && <div className="wine-deal not-found">
                            <h4>No wine matching chosen criteria was found.</h4>
                            <p className="deal-p">Perhaps try changing the wine name, or see below for similiar wines found.</p>
                        </div>}
                        {/* if deals found */}
                        { SimiliarDealsComponents }
                    </div>
                </div>
            </div>}

            {/* --- --- --- END --- --- --- */}
        </div>
)
}