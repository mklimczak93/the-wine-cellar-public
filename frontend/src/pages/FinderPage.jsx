import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import WineDeal from '../components/WineDeal';
import Deals from '../example-deals.json';
import '../index.css';

export default function FinderPage() {
    const { id } = useParams();
    const { user } = useAuthContext();
    const [ chosenWine, setChosenWine ] = useState('');
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


    //placeholder data for deals - to be altered
    const wines = Deals.deals
    const wine01 = wines[0];
    const wine02 = wines[1];
    const wine03 = wines[2];
    const wine04 = wines[3];

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
                    <div className="analyzed-wine-div">
                        <img src={wineImagePath} className="finder-wine-photo" alt="Chosen wine"></img>
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
                            <div className="finder-wine-details-buttons">
                                <Link to={ '/cellar-page/'+id }>
                                    <button className="simple-button  small">
                                        <svg className="svg-icon" width="100%" height="100%" viewBox="0 0 200 200" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" xmlSpace="preserve" xmlnsserif="http://www.serif.com/">
                                            <g transform="matrix(0.442003,0,0,0.439336,-965.574,-126.816)">
                                                <g id="Layer35">
                                                    <path className="svg-icon-path" d="M2388.05,296.421L2388.05,293.653C2388.05,290.891 2390.29,288.653 2393.05,288.653C2401.8,288.653 2419.77,288.653 2428.51,288.653C2431.27,288.653 2433.51,290.891 2433.51,293.653L2433.51,296.421C2434.68,296.522 2435.78,297.032 2436.62,297.867C2437.55,298.805 2438.08,300.077 2438.08,301.403C2438.08,304.897 2438.08,309.543 2438.08,313.037C2438.08,314.363 2437.55,315.635 2436.62,316.573C2435.78,317.409 2434.68,317.918 2433.51,318.019L2433.51,404.406C2459.3,413.723 2477.74,438.425 2477.74,467.403L2477.74,728.885C2477.74,732.863 2476.16,736.678 2473.35,739.491C2470.53,742.304 2466.72,743.885 2462.74,743.885C2436.97,743.885 2384.59,743.885 2358.82,743.885C2354.84,743.885 2351.03,742.304 2348.22,739.491C2345.4,736.678 2343.82,732.863 2343.82,728.885L2343.82,467.403C2344,438.611 2362.4,413.841 2388.05,404.458L2388.05,318.019C2386.89,317.918 2385.78,317.409 2384.95,316.573C2384.01,315.635 2383.48,314.363 2383.48,313.037C2383.48,309.543 2383.48,304.897 2383.48,301.403C2383.48,300.077 2384.01,298.805 2384.95,297.867C2385.78,297.032 2386.89,296.522 2388.05,296.421ZM2410.78,430.052L2422.8,434.396C2436.33,439.284 2446.07,452.201 2446.07,467.403L2446.07,712.019L2375.5,712.019L2375.5,467.533C2375.62,452.367 2385.36,439.351 2398.88,434.406L2410.78,430.052Z"/>
                                                </g>
                                            </g>
                                        </svg>
                                        <p className="button-text-right">wine</p>
                                    </button>
                                </Link>
                                <Link to="/cellar-page">
                                    <button className="simple-button small">
                                        <svg className="svg-icon" width="100%" height="100%" viewBox="0 0 200 200" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" xmlSpace="preserve" xmlnsserif="http://www.serif.com/">
                                            <g transform="matrix(1.19625,0,0,1.19625,1.70814,-10.6259)">
                                                <g id="Layer35">
                                                    <path className="svg-icon-path" d="M134.013,66.746C134.013,34.709 108.96,8.883 78.241,8.883C47.521,8.883 22.468,34.709 22.468,66.746C22.468,66.746 22.468,176.073 22.468,176.073L134.013,176.073L134.013,66.746ZM120.013,133.745L120.013,162.073C120.013,162.073 36.468,162.073 36.468,162.073L36.468,133.745L120.013,133.745ZM36.468,82.24L36.468,119.823L120.013,119.823L120.013,82.24L36.468,82.24ZM120.013,68.403L36.468,68.403L36.468,66.746C36.468,42.6 55.087,22.883 78.241,22.883C101.394,22.883 120.013,42.6 120.013,66.746L120.013,68.403Z"/>
                                                </g>
                                            </g>
                                        </svg>
                                        <p className="button-text-right">cellar</p>
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="finder-div">
                        <h3 className="rotated-slogan">Best wines, best prices.</h3>
                        <div className="finder-titles">
                            <p className="finder-title">Name</p>
                            <p className="finder-title">Store</p>
                            {/* <p className="finder-title">Location</p> */}
                            <p className="finder-title">Available</p>
                            <p className="finder-title">Price</p>
                            <p className="finder-title">Link</p>
                        </div>
                        <WineDeal wine={ wine01 } />
                        <WineDeal wine={ wine02 } />
                        <WineDeal wine={ wine03 } />
                        <WineDeal wine={ wine04 } />
                        <WineDeal wine={ wine01 } />
                        <WineDeal wine={ wine02 } />
                        <WineDeal wine={ wine03 } />
                        <WineDeal wine={ wine04 } />
                    </div>
                </div>
            </div>}

            {/* --- --- --- END --- --- --- */}
        </div>
)
}