import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
//images
import WineOutline              from "../assets/project-icons/wine-outline.svg";
import CheesePairingIcon        from "../assets/project-icons/pairing-cheese.svg";
import VegetablesPairingIcon    from "../assets/project-icons/pairing-vegetables.svg";
import SeafoodPairingIcon       from "../assets/project-icons/pairing-seafood.svg";
import WhiteMeatPairingIcon     from "../assets/project-icons/pairing-white-meat.svg";
import RedMeatPairingIcon       from "../assets/project-icons/pairing-red-meat.svg";
import StarchesPairingIcon      from "../assets/project-icons/pairing-starches.svg";
import BakedGoodsPairingIcon    from "../assets/project-icons/pairing-baked-goods.svg";
import SloganCircle             from "../assets/project-icons/best-wines-text.svg";
import CrossIcon                from "../assets/project-icons/cross.svg";
import '../index.css';


export default function CloseupPage() {
    const { id } = useParams();
    const [wine, setWine] = useState('');
    const [wineImagePath, setWineImagePath] = useState('');
    const [pairing, setPairing] = useState('');
    const [separateNotes, setSeparateNotes] = useState('');
    const [deleted, setDeleted] = useState('');
    const [error, setError] = useState('');
    const { user } = useAuthContext();

    //pairing pairing with icons
    function getPairingIcons(wine) {
        const pairingText = wine.pairing;
        const pairingIconsImages = [];
        for (let i=0; i<pairingText.length; i++) {
            switch(pairingText[i]) {
                case "cheese":
                    pairingIconsImages.push(CheesePairingIcon);
                    break;
                case "vegetables":
                    pairingIconsImages.push(VegetablesPairingIcon);
                    break;
                case "seafood":
                    pairingIconsImages.push(SeafoodPairingIcon);
                    break;
                case "white meat":
                    pairingIconsImages.push(WhiteMeatPairingIcon);
                    break;
                case "red meat":
                    pairingIconsImages.push(RedMeatPairingIcon);
                    break;
                case "starches":
                    pairingIconsImages.push(StarchesPairingIcon);
                    break;
                case "baked goods":
                    pairingIconsImages.push(BakedGoodsPairingIcon);
                    break;
            }
        }
        const pairingIcons = pairingIconsImages.map((icon) => (
            <img className="food-pairing-icon" src={icon} alt="Wine pairing"></img>
        ))
        setPairing(pairingIcons);
    }
   //getting single notes
   function getNotesParagraphs(wine) {
    let notesParagraph =[];
    let arrayToMap = wine.notes[0].split(",");
    if (wine.notes.length === 0) {
        notesParagraph.push(<p></p>)
    } else {
        notesParagraph = arrayToMap.map(wineNote => (
            <p>{wineNote}</p>
        ))
    };
    setSeparateNotes(notesParagraph);
   }

    //getting single wine
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
            setWine(wineObject);
            getPairingIcons(wineObject);
            getNotesParagraphs(wineObject);
            let path = "/uploads/" + wineObject.imagePath;
            setWineImagePath(path);
        } else {
            setError(wineObject.error)
        }
    }
    useEffect(() => {
        getWine();
    }, [])
    

    //deleting function
    async function deleteWine() {
        if (!user) {
            setError('You must be logged in to delete a wine.')
            return
        }
        const res = await fetch('http://localhost:4000/api/cellar/' + id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        });
        const json = await res.json();
        if (res.ok) {
            setDeleted('deleted');
        } else {
            setError(json.error)
        };
    }

    return(  
        <div>
            {deleted && !error && <div className="big-message-div">
                    <h3>Wine deleted.</h3>
                    <p>You have successfully deleted the chosen wine.</p>
                    <Link to="/cellar-page">
                        <button className="simple-button">Wine Cellar</button>
                    </Link>
                </div>}
                {error && <div className="big-message-div">
                    <h3>Something went wrong.</h3>
                    <p>Please go back to the main wine cellar menu and try again.</p>
                    <Link to="/cellar-page">
                        <button className="simple-button">Wine Cellar</button>
                    </Link>
                </div>}
            {!deleted && !error && 
                <div className="page">
                <div className="left-div">
                        <img src={ CrossIcon } className="cross-icon" id="cross-icon-1" alt="Cross"></img>
                        <img src={ CrossIcon } className="cross-icon" id="cross-icon-2" alt="Cross"></img>
                        <img src={ CrossIcon } className="cross-icon" id="cross-icon-3" alt="Cross"></img>
                        <img src={ CrossIcon } className="cross-icon" id="cross-icon-4" alt="Cross"></img>
                    <div className="image-closeup">
                        <img src={SloganCircle} className="slogan-circle" alt="Best wines, best prices slogan."></img>
                        <img src={wineImagePath} className="wine-image uploaded-photo" alt="Wine image"></img>
                        <img src={WineOutline} className="wine-image wine-closeup-outline" alt="Wine outline"></img>
                    </div>
                </div>
                <div className="right-div">
                        <img src={ CrossIcon } className="cross-icon" id="cross-icon-1" alt="Cross"></img>
                        <img src={ CrossIcon } className="cross-icon" id="cross-icon-2" alt="Cross"></img>
                        <img src={ CrossIcon } className="cross-icon" id="cross-icon-3" alt="Cross"></img>
                        <img src={ CrossIcon } className="cross-icon" id="cross-icon-4" alt="Cross"></img>

                    <h4>{wine.denomination}</h4>
                    <h1 className="closeup-title">{wine.name}</h1>
                    <div className="wine-details-categories">
                        <p>{wine.wineType}</p>
                        <p>{wine.sweatness}</p>
                        {separateNotes}
                    </div>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                            Sunt explicabo ea veniam a similique consequuntur, eos, 
                            illo necessitatibus ipsam, culpa minima quaerat rerum molestias. 
                    </p>
                    <div className="wine-pairing-icons-div">
                        {pairing}
                    </div>
                    <div className="buttons-div">
                        <Link to={`/finder-page/${id}`}>
                            <button className="simple-button">
                                Find the best deal
                            </button>
                        </Link>
                        <Link to={`/cellar-page/edit/${id}`}>
                            <button className="simple-button" id="edit-button"> 
                                <svg className="svg-icon" width="100%" height="100%" viewBox="0 0 200 200" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" xmlSpace="preserve" xmlnsserif="http://www.serif.com/">
                                    <g id="Layer35">
                                        <path className="svg-icon-path" d="M88.112,89.424L80.625,119.375L110.575,111.888C112.64,111.371 114.522,110.306 116.027,108.801L189.22,35.608C193.803,31.026 193.803,23.595 189.219,19.013C189.22,19.014 180.987,10.779 180.987,10.779C176.404,6.197 168.975,6.197 164.392,10.779L91.199,83.973C89.695,85.477 88.628,87.361 88.112,89.424ZM107.04,99.285L179.014,27.31L172.689,20.986L100.715,92.96L98.607,101.393L107.04,99.285ZM100,-0L27.31,-0C12.227,-0 0,12.227 0,27.31C0,27.31 0,172.69 0,172.69C0,187.773 12.227,200 27.31,200L172.69,200C187.773,200 200,187.773 200,172.69L200,100L186.916,100L186.916,172.69C186.916,180.547 180.547,186.916 172.69,186.916C172.69,186.916 27.31,186.916 27.31,186.916C19.453,186.916 13.084,180.547 13.084,172.69L13.084,27.31C13.084,19.453 19.453,13.084 27.31,13.084L100,13.084L100,-0Z"/>
                                    </g>
                                </svg>
                            </button>
                        </Link>
                        <button className="simple-button" id="delete-button" onClick={deleteWine}> 
                            <svg className="svg-icon" width="100%" height="100%" viewBox="0 0 200 200" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" xmlSpace="preserve" xmlnsserif="http://www.serif.com/">
                                <g transform="matrix(0.972371,0,0,0.972371,2.7629,7.4204)">
                                    <g id="Layer35">
                                        <path className="svg-icon-path" d="M44.764,28.073L4.79,28.073L4.79,43.335L20.961,43.335L20.961,166.618C20.961,183.979 35.035,198.052 52.395,198.052L147.605,198.052C164.966,198.052 179.039,183.979 179.039,166.618L179.039,43.335L195.21,43.335L195.21,28.073L155.236,28.073L155.236,23.803C155.236,6.442 141.163,-7.631 123.803,-7.631L76.197,-7.631C58.837,-7.631 44.764,6.442 44.764,23.803L44.764,28.073ZM36.224,43.335L163.776,43.335C163.776,43.335 163.776,166.618 163.776,166.618C163.776,175.549 156.536,182.789 147.605,182.789C147.605,182.789 52.395,182.789 52.395,182.789C43.464,182.789 36.224,175.549 36.224,166.618L36.224,43.335ZM128.073,71.408L128.073,154.717L143.335,154.717L143.335,71.408L128.073,71.408ZM92.369,71.408L92.369,154.717L107.631,154.717L107.631,71.408L92.369,71.408ZM56.665,71.408L56.665,154.717L71.927,154.717L71.927,71.408L56.665,71.408ZM139.974,28.073L60.026,28.073L60.026,23.803C60.026,14.871 67.266,7.631 76.197,7.631L123.803,7.631C132.734,7.631 139.974,14.871 139.974,23.803L139.974,28.073Z"/>
                                    </g>
                                </g>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>}
        </div>
)
}

