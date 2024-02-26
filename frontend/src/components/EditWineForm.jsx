import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { useAuthContext } from '../hooks/useAuthContext';
import { default as FormData } from "form-data";
import CrossIcon from "../assets/project-icons/cross.svg";
import '../index.css';

export default function EditWineForm(props) {
    //importing chosen image from props
    let chosenImage = props.chosenImage;
    const { user } = useAuthContext();
    const { id } = useParams();
    //states
    const [ wineObject, setWineObject ]             = useState();
    const [ randomWinePath, setRandomWinePath ]     = useState();
    //wine properties
    //creating states for each of wine properties
    const [ wineName, setWineName ]                 = useState();
    const [ wineType, setWineType ]                 = useState();
    const [ wineSweatness, setWineSweatness ]       = useState();
    const [ wineDenomination, setWineDenomination ] = useState('');
    const [ wineGrape, setWineGrape ]               = useState('');
    const [ wineOrigin, setWineOrigin ]             = useState('');
    const [ wineYear, setWineYear ]                 = useState('');
    const [ wineNotes, setWineNotes ]               = useState([]);
    const [ winePairing, setWinePairing ]           = useState([]);
    const [ existingImagePath, setExistingImagePath ] = useState('');
    const [ wineImagePath, setWineImagePath ]       = useState('');
    //others
    const [ error, setError]                        = useState(null);
    const [ success, setSuccess ]                   = useState(null);
    const [ emptyFields, setEmptyFields ]           = useState(['empty']);
    const [ file, setFile ]                         = useState();


    // --- --- --- SETTING VALUES FROM  PROPS --- --- --- //
    useEffect(() => {
        setRandomWinePath(chosenImage);
    },[chosenImage])
    

    // --- GETTING CHOSEN WINE DATA --- ///
    useEffect(() => {
        async function getWine() {
            if (!user) {
                setError('You must be logged in to see wine details.')
                return
            };
            const res = await fetch('http://localhost:4000/api/cellar/' + id, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const wineObject = await res.json();
            console.log(wineObject)
            if (res.ok) {
                setWineObject(wineObject);
                setWineName(wineObject.name);
                setWineType(wineObject.wineType);
                setWineSweatness(wineObject.sweatness);
                setWineDenomination(wineObject.denomination);
                setWineGrape(wineObject.grape);
                setWineOrigin(wineObject.origin);
                setWineYear(wineObject.year);
                setWineNotes(wineObject.notes);
                setWinePairing(wineObject.pairing);
                setExistingImagePath(wineObject.wineImagePath);
                setEmptyFields(["empty"]);
            } else {
                setError(wineObject.error)
            }
        }
        getWine();
    }, [user, id])
    
    //filling in the select options
    useEffect(()=> {
        document.getElementById("select-type").value = wineType ? wineType : "";
        document.getElementById("select-sweatness").value = wineSweatness ? wineSweatness : "";
        document.getElementById("select-pairing").value = winePairing ? winePairing : "";
    }, [wineObject])
    
    // --- custom photo or random photo
    function choosePhotoMethod() {
        const uploadInput = document.getElementById('file-upload');
        const uploadInputLabel = document.getElementById('custom-file-upload');
        const yesRadio = document.getElementById('random-photo-yes');
        const noRadio = document.getElementById('random-photo-no');
        //if yes - add random photo
        if (yesRadio.checked === true) {
            console.log('yes')
            //disable upload input
            uploadInput.disabled = true;
            uploadInputLabel.className = "custom-file-upload disabled-button"
        } 
        //if no - add your own photo
        if (noRadio.checked === true) {
            console.log('no')
            //enable upload input
            uploadInput.disabled = false;
            uploadInputLabel.className = "custom-file-upload"
        }
    }

    const handleSubmit = async (e) => {
        console.log('Handling submit')
        e.preventDefault();
        //checking if the user is logged in
        if (!user) {
            setError('You must be logged in to add a new wine.');
            return 
        };
        //creating a wine object
        const wine = {
            name: wineName,
            wineType: wineType,
            sweatness: wineSweatness,
            denomination: wineDenomination,
            grape: wineGrape,
            origin: wineOrigin,
            year: wineYear,
            notes: wineNotes,
            pairing: winePairing,
            randomWinePath: randomWinePath,
            existingImagePath: existingImagePath
        };
        //creating a formData object to include image
        const formData = new FormData();
        formData.append("file", file)
        formData.append("textData", JSON.stringify(wine))
        // console.log(Object.fromEntries(formData))
        console.log(emptyFields)
        //sending it through POST
        const response = await fetch('http://localhost:4000/api/cellar/' + id, {
            method: 'PATCH',
            body: formData,
            headers: {
                //apparently best not to set the content-type parameter
                // 'Content-Type' : 'multipart/form-data',
                'Authorization': `Bearer ${user.token}`
            }
        });
        //getting back json object if successful or an error message
        const jsonObject = await response.json()
        if (!response.ok) {
            setError(jsonObject.error);
            setEmptyFields(jsonObject.emptyFields)
        } 
        if (response.ok) {
            setError(null);
            setEmptyFields([]);
            setSuccess('The wine was edited.');
            //setting back wine states to none
            setWineName('');
            setWineType('');
            setWineSweatness('');
            setWineDenomination('');
            setWineGrape('');
            setWineOrigin('');
            setWineYear('');
            setWineNotes([]);
            setWinePairing([]);
            setFile();
            console.log('New wine added to the cellar: ', jsonObject)
        }
    }

    //enabling choosing multiple pairings
    // const possiblePairings = [
    //     {value: "cheese", label: "cheese"},
    //     {value: "vegetables", label: "vegetables"},
    //     {value: "white meat", label: "white meat"},
    //     {value: "red meat", label: "red meat"},
    //     {value: "seafood", label: "seafood"},
    //     {value: "starches", label: "starches"},
    //     {value: "baked goods", label: "baked goods"}
    //   ]
    // function pickMultiplePairings(e) {
    //     const options = e.target.options;
    //     const list = [];
    //     for (let i = 0; i < options.length; i++) {
    //       if (options[i].selected) {
    //         list.push(options[i].value);
    //       }
    //     };
    //     setWinePairing(list)
    // }

    return (
        <div className="right-div">
            <img src={ CrossIcon } className="cross-icon" id="cross-icon-1" alt="Cross"></img>
            <img src={ CrossIcon } className="cross-icon" id="cross-icon-2" alt="Cross"></img>
            <img src={ CrossIcon } className="cross-icon" id="cross-icon-3" alt="Cross"></img>
            <img src={ CrossIcon } className="cross-icon" id="cross-icon-4" alt="Cross"></img>
            {error && <p className="error-message">Error: {error}</p>}
            {success && <p className="success-message">{success}</p>}
            {/* <form className="form add-new-wine" onSubmit={handleSubmit} enctype="multipart/form-data"></form> */}
            <form className="form" onSubmit={handleSubmit}>
                {/* --- --- --- NAME --- --- --- */}
                <h5 className="form-subtitle">Name of the wine:</h5>
                
                    <input 
                        data-testid = "input-name-1"
                        placeholder= {wineName}
                        type="text" 
                        className={emptyFields?.includes('name') ? "error-input form-input" : "form-input"} 
                        onChange={(e) => setWineName(e.target.value)} 
                        value={wineName}>
                    </input>
                

                {/* --- --- --- BAISICS --- --- --- */}
                <h5 className="form-subtitle">Baiscs:</h5>
                <div className="form-sub-div">

                    <select 
                        id="select-type"
                        data-testid = "selectWineType"
                        className={emptyFields?.includes('wineType') ? "error-input form-select" : "form-select"} 
                        onChange={(e) => setWineType(e.target.value)}>
                        <option value="">Choose type:</option>
                        <option value="white">White</option>
                        <option value="rose">Rosé</option>
                        <option value="orange">Orange</option>
                        <option value="red">Red</option>
                        <option value="bubbles">Bubbles</option>
                    </select>
                
                    <select 
                        id="select-sweatness"
                        className={emptyFields?.includes('sweatness') ? "error-input form-select" : "form-select"} 
                        onChange={(e) =>  setWineSweatness(e.target.value)}>
                        <option value="">Choose sweatness:</option>
                        <option value="sweet">Sweet</option>
                        <option value="semi-sweet">Semi-sweet</option>
                        <option value="semi-dry">Semi-dry</option>
                        <option value="dry">Dry</option>
                    </select>
                
                    <input 
                        placeholder={wineOrigin}
                        className={emptyFields?.includes('origin') ? "error-input form-input" : "form-input"}
                        onChange={(e) => setWineOrigin(e.target.value)} 
                        value={wineOrigin}>
                    </input>
                
                    <input 
                        placeholder={wineYear}
                        type="number" 
                        min="1800" 
                        className={emptyFields?.includes('origin') ? "error-input form-input" : "form-input"}
                        onChange={(e) => setWineYear(e.target.value)} value={wineYear}>
                    </input>
                
                </div>
                
                {/* --- --- --- ADDITIONAL INFO --- --- --- */}
                <h5 className="form-subtitle">Additional info:</h5>
                <div className="form-sub-div">
                    <input 
                        placeholder={wineDenomination ? wineDenomination : 'Denomination'}
                        type="text" className="form-input" 
                        onChange={(e) => setWineDenomination(e.target.value)} 
                        value={wineDenomination}>
                    </input>
                    
                    <input 
                        placeholder={ wineGrape ? wineGrape : "Grape" }
                        type="text" className="form-input" 
                        onChange={(e) => setWineGrape(e.target.value)} 
                        value={wineGrape}>
                    </input>
                    
                    <input 
                        placeholder={ wineNotes ? wineNotes : "Notes"}
                        type="text" 
                        className="form-input" 
                        onChange={(e) => setWineNotes(e.target.value)} 
                        value={wineNotes}>
                    </input>
                    
                    <select
                        // isMulti
                        // options = {possiblePairings}
                        id="select-pairing"
                        className="form-select" 
                        onChange={(e) =>  setWinePairing(e.target.value)} >
                        <option value="">Choose pairing:</option>
                        <option value="cheese">Cheese</option>
                        <option value="vegetables">Vegetables</option>
                        <option value="white meat">White meat</option>
                        <option value="red meat">Red meat</option>
                        <option value="seafood">Seafood</option>
                        <option value="starches">Starches</option>
                        <option value="baked goods">Baked goods</option>
                    </select>
                </div>

                {/* --- --- --- PHOTO --- --- --- */}
                <h5 className="form-subtitle">Photo:</h5>
                <div className="form-sub-div">
                    <div className="form-photo-div">
                        <p>Add random wine image?</p>
                        <input type="radio" className="form-radio" id="random-photo-yes" name="random-photo" value="yes" onClick = { choosePhotoMethod } />
                        <label className="label-radio" htmlFor="random-photo-yes">Yes</label>
                        <input type="radio" className="form-radio" id="random-photo-no" name="random-photo" value="no" onClick = { choosePhotoMethod } checked/>
                        <label className="label-radio" htmlFor="random-photo-no">No</label>
                    </div>
                    <div className="form-photo-div">
                        <p>Upload your own photo:</p>
                        <label htmlFor="file-upload" className="custom-file-upload" id="custom-file-upload">
                            <svg className="svg-icon" width="100%" height="100%" viewBox="0 0 200 200" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" xmlSpace="preserve" xmlnsserif="http://www.serif.com/">
                                <g id="Layer35">
                                    <path className="svg-icon-path" d="M31.707,24.39C24.972,24.39 19.512,29.85 19.512,36.585L19.512,136.585L51.22,136.585C60.649,136.585 68.293,144.229 68.293,153.659C68.293,155.006 69.385,156.098 70.732,156.098L129.268,156.098C130.616,156.098 131.707,155.006 131.707,153.659C131.707,144.229 139.351,136.585 148.78,136.585L180.488,136.585L180.488,36.585C180.488,29.85 175.028,24.39 168.293,24.39L139.024,24.39C134.983,24.39 131.707,21.114 131.707,17.073C131.707,13.032 134.983,9.756 139.024,9.756L168.293,9.756C183.11,9.756 195.122,21.768 195.122,36.585L195.122,173.171C195.122,187.988 183.11,200 168.293,200L31.707,200C16.89,200 4.878,187.988 4.878,173.171L4.878,36.585C4.878,21.768 16.89,9.756 31.707,9.756L60.976,9.756C65.017,9.756 68.293,13.032 68.293,17.073C68.293,21.114 65.017,24.39 60.976,24.39L31.707,24.39ZM180.488,151.22L148.78,151.22C147.433,151.22 146.341,152.311 146.341,153.659C146.341,163.088 138.698,170.732 129.268,170.732L70.732,170.732C61.302,170.732 53.659,163.088 53.659,153.659C53.659,152.311 52.567,151.22 51.22,151.22L19.512,151.22L19.512,173.171C19.512,179.906 24.972,185.366 31.707,185.366L168.293,185.366C175.028,185.366 180.488,179.906 180.488,173.171L180.488,151.22ZM100,131.707C104.042,131.707 107.317,128.431 107.317,124.39L107.317,29.268L113.659,37.724C116.084,40.956 120.67,41.612 123.902,39.187C127.136,36.762 127.791,32.176 125.366,28.943L105.854,2.927C104.472,1.084 102.303,0 100,0C97.697,0 95.529,1.084 94.147,2.927L74.635,28.943C72.21,32.176 72.865,36.762 76.098,39.187C79.331,41.612 83.917,40.956 86.342,37.724L92.683,29.268L92.683,124.39C92.683,128.431 95.959,131.707 100,131.707Z"/>
                                </g>
                            </svg>
                            <p className="button-text-right">Upload</p>
                        </label>
                        <input 
                            type="file"
                            id="file-upload" 
                            className="form-input file-upload" 
                            onChange={(e) => setFile(e.target.files[0])} 
                            name="file">
                        </input>
                    </div>
                </div>

                <input type="submit" className="simple-button form-button" data-testid="edit-wine-form-submit-button"/>
            </form>
        </div>
    )
}