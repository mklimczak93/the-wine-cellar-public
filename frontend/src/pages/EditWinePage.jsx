import { useState, useEffect } from 'react';
import EditWineForm from '../components/EditWineForm';
import { useParams } from 'react-router';
import { useAuthContext } from '../hooks/useAuthContext';
//images
import WineOutline from "../assets/project-icons/wine-outline.svg";
import SloganCircle from "../assets/project-icons/best-wines-text.svg";
import CrossIcon from "../assets/project-icons/cross.svg";
import WinePattern01 from "../assets/wine-patterns/pattern01s.png";
import WinePattern02 from "../assets/wine-patterns/pattern02s.png";
import WinePattern03 from "../assets/wine-patterns/pattern03s.png";
import WinePattern04 from "../assets/wine-patterns/pattern04s.png";
import WinePattern05 from "../assets/wine-patterns/pattern05s.png";
//css
import '../index.css';



export default function EditWinePage() {
    const {id} = useParams();
    const { user } = useAuthContext();
    const [ chosenWinePattern, setChosenWinePattern ] = useState('');
    const [ chosenImage, setChosenImage] = useState('');
    const [ error, setError ] = useState('');
    const [ wine, setWine ] = useState();
    const [ wineImagePath, setWineImagePath ] = useState();

    
    //fetching existing data 
    useEffect(() => {
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
                let path = "/uploads/" + wineObject.imagePath;
                setWineImagePath(path);
            } else {
                setError(wineObject.error)
            };
        };
        getWine();
    }, [])
    //adding random image
    const winePatterns = [
        WinePattern01, 
        WinePattern02, 
        WinePattern03, 
        WinePattern04, 
        WinePattern05];

    let randomNumber = Math.floor((Math.random()) * winePatterns.length);
    let randomPattern = winePatterns[randomNumber];

    function changeImage() {
        let randomNumber = Math.floor((Math.random()) * winePatterns.length);
        let chosenWinePattern = winePatterns[randomNumber]
        document.getElementById('wine-image').src = winePatterns[randomNumber];
        setChosenWinePattern(chosenWinePattern);
    }
    useEffect(()=> {
        let actualPath = ''
        if (chosenWinePattern === '') {
            actualPath = "../assets/wine-patterns/pattern01s.png"
        } else {
            let imageName = chosenWinePattern.split('/')[3].split('.')[0].concat('.png');
            actualPath = "../assets/wine-patterns/" + imageName;
            setChosenImage(actualPath);
        }
    },[ chosenWinePattern ])

    return(   
        <div className="page">
                <div className="left-div">
                    <img src={ CrossIcon } className="cross-icon" id="cross-icon-1" alt="Cross"></img>
                    <img src={ CrossIcon } className="cross-icon" id="cross-icon-2" alt="Cross"></img>
                    <img src={ CrossIcon } className="cross-icon" id="cross-icon-3" alt="Cross"></img>
                    <img src={ CrossIcon } className="cross-icon" id="cross-icon-4" alt="Cross"></img>

                    <div className="image-closeup">
                        <img src={ SloganCircle } className="slogan-circle" alt="Best wines, best prices slogan."></img>
                        <img src={ chosenWinePattern ? chosenWinePattern : wineImagePath } id="wine-image" className="wine-image random-pattern" alt="Wine image"></img>
                        <img src={ WineOutline } className="wine-image wine-closeup-outline" alt="Wine outline"></img>
                        <button className="round-button random-photo-button" onClick={ changeImage }>
                            <svg className="svg-icon" width="100%" height="100%" viewBox="0 0 200 200" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" xmlSpace="preserve" xmlnsserif="http://www.serif.com/">
                                <g transform="matrix(9.75605,0,0,9.75605,12.1956,-7.31644)">
                                    <g id="Layer35">
                                        <path className="svg-icon-path" d="M6.4,1.05C6.649,0.719 7.119,0.651 7.45,0.9L9.45,2.4C9.781,2.649 9.849,3.119 9.6,3.45L8.1,5.45C7.851,5.781 7.381,5.849 7.05,5.6C6.719,5.351 6.651,4.881 6.9,4.55L7.36,3.936C4.146,4.679 1.75,7.56 1.75,11C1.75,13.683 3.207,16.026 5.376,17.281C5.734,17.488 5.857,17.947 5.649,18.305C5.442,18.664 4.983,18.786 4.624,18.579C2.011,17.067 0.25,14.24 0.25,11C0.25,6.84 3.153,3.359 7.043,2.47L6.55,2.1C6.219,1.851 6.151,1.381 6.4,1.05ZM12.351,3.695C12.558,3.336 13.017,3.214 13.376,3.421C15.989,4.933 17.75,7.76 17.75,11C17.75,15.16 14.847,18.641 10.957,19.53L11.45,19.9C11.781,20.148 11.849,20.619 11.6,20.95C11.352,21.281 10.881,21.349 10.55,21.1L8.55,19.6C8.26,19.383 8.167,18.989 8.329,18.665L9.329,16.665C9.514,16.294 9.965,16.144 10.335,16.329C10.706,16.514 10.856,16.965 10.671,17.335L10.269,18.139C13.668,17.539 16.25,14.571 16.25,11C16.25,8.317 14.793,5.974 12.625,4.719C12.266,4.512 12.143,4.053 12.351,3.695Z"/>
                                    </g>
                                </g>
                            </svg>
                        </button>
                    </div>
                </div>
                <EditWineForm chosenImage = { chosenImage } />
        </div>
)
}