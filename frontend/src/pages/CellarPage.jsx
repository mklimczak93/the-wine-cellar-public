import React from 'react';
import { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
//components
import WineComponent from "../components/WineComponent";
import '../index.css';


export default function CellarPage() {
    const [ generalCellar, setGeneralCellar] = useState([]);
    const [ userCellar, setUserCellar] = useState([]);
    const [ chosenCellar, setChosenCellar] = useState([]);
    const [ chosenWineType, setChosenWineType] = useState('all');
    const [ shelves, setShelves ] = useState(null);
    const { user } = useAuthContext();
    const [ userObject, setUserObject ] = useState('');
    const [ error, setError ] = useState('');
    const [ mssg, setMssg ] = useState('');

    // --- --- --- GETTING USER DATA --- --- --- //
    useEffect(() => {
        if (!user) {
            setMssg('Loading...');
        } else {
            setMssg('');
            const fetchedData = async () => {
                //fetching  user data
                const response = await fetch('http://localhost:4000/api/user/user-profile', {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });
                const fetchedUser = await response.json();
                //checking if response is OK
                if (response.ok) {
                    setUserObject(fetchedUser);
                //response NOT OK
                } else {
                    setError('Failed to fetch user.')
                }
            }
            //calling the async function
            fetchedData()
        }
    },[user])

    
    // --- --- --- GETTING CELLAR DATA --- --- --- //
    useEffect(() => {
        if (!user) {
            setMssg('Loading...');
        } else {
            setMssg('');
            //fetching cellar
            const fetchedData = async () => {
                const response = await fetch('http://localhost:4000/api/cellar', {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });
                const fetchedCellar = await response.json();
                //checking if resposne is OK
                if (response.ok) {
                    setGeneralCellar(fetchedCellar);
                } else {
                    setError('Failed to fetch cellar.')
                }
            };
            //calling on async function
            fetchedData();
        };
    }, [user])
    
    // --- --- --- GETTING ONLY USER CELLAR --- --- --- //
    useEffect(() => {
        const  getUserCellar = () => {
            let userCellarArray = [];
            for (let i=0; i<generalCellar.length; i++) {
                if (generalCellar[i].userId === userObject._id) {
                    userCellarArray.push(generalCellar[i]);
                };
            };
            setUserCellar(userCellarArray);
        }
        getUserCellar();
    },[generalCellar, userObject])
    
    // --- --- --- FILTERING USER CELLAR --- --- --- //

    useEffect(()=> {
        const filterWineList = (wineType) => {
            //executing rest of code
            let thisTypeWineList = [];
            if (wineType === 'all') {
                thisTypeWineList = userCellar;
            } else {
                for (let i=0; i<userCellar.length; i++) {
                    if (userCellar[i].wineType === wineType) {
                        thisTypeWineList.push(userCellar[i]);
                    };
                };
            };
            return thisTypeWineList;
            
        };
        const theChosenCellar = filterWineList(chosenWineType);
        setChosenCellar(theChosenCellar);
    }, [userCellar, chosenWineType])

    function changeTypeOnClick(wineType) {
        setChosenWineType(wineType);
    }

    // --- putting wines into the right cellar shelves --- //
    function putWinesOnShelves() {
        let shelvesElements = '';
        if (chosenCellar) {
            const winesAmount = chosenCellar.length;
            if (winesAmount <= 3) {
                const winesToBePut = chosenCellar.map((wine) => (
                    <Link to={wine._id.toString()} className="wine-closup-link" key={wine._id.toString()}>
                        <WineComponent wine={wine} />
                    </Link>
                ));
                shelvesElements = [
                    <div>
                        <div className="cellar-frame-shelf">
                            {winesToBePut}
                        </div>
                        <div className="cellar-frame-shelf"></div>
                        <div className="cellar-frame-shelf"></div>
                    </div>
                ];
            } else if (3 < winesAmount && winesAmount <= 6) {
                const winesToBePut = chosenCellar.map((wine) => (
                    <Link to={wine._id.toString()} className="wine-closup-link" key={wine._id.toString()}>
                        <WineComponent wine={wine} />
                    </Link>
                ));
                const winesOnShelf01 = winesToBePut.slice(0,3);
                const winesOnShelf02 = winesToBePut.slice(3);
                shelvesElements = [
                    <div>
                        <div className="cellar-frame-shelf">
                            {winesOnShelf01}
                        </div>
                        <div className="cellar-frame-shelf">
                            {winesOnShelf02}
                        </div>
                        <div className="cellar-frame-shelf"></div>
                    </div>
                ];
            } else if (winesAmount > 6) {
                const subdividedCellar = [];
                let currentShelf = [];
                for (let i = 0; i < chosenCellar.length; i++) {
                    if (currentShelf.length < 3) {
                        currentShelf.push(chosenCellar[i]);
                    } else {
                        subdividedCellar.push(currentShelf);
                        currentShelf = [];
                        currentShelf.push(chosenCellar[i]);
                    }
                    //pushing final shelf even if it isn't full (less then 3 wines)
                };
                subdividedCellar.push(currentShelf);
                shelvesElements = subdividedCellar.map((shelf) => {
                    if (shelf.length === 3) {
                        return (
                            <div className="cellar-frame-shelf">
                                <Link to={shelf[0]._id.toString()} className="wine-closup-link" key={shelf[0]._id.toString()}>
                                    <WineComponent wine={shelf[0]} />
                                </Link>
                                <Link to={shelf[1]._id.toString()} className="wine-closup-link" key={shelf[1]._id.toString()}>
                                    <WineComponent wine={shelf[1]} />
                                </Link>
                                <Link to={shelf[2]._id.toString()} className="wine-closup-link" key={shelf[2]._id.toString()}>
                                    <WineComponent wine={shelf[2]} />
                                </Link>
                            </div>)
                    }
                    else if (shelf.length === 2 ) {
                        return (
                            <div className="cellar-frame-shelf">
                                <Link to={shelf[0]._id.toString()} className="wine-closup-link" key={shelf[0]._id.toString()}>
                                    <WineComponent wine={shelf[0]} />
                                </Link>
                                <Link to={shelf[1]._id.toString()} className="wine-closup-link" key={shelf[1]._id.toString()}>
                                    <WineComponent wine={shelf[1]} />
                                </Link>
                            </div>)
                    }
                    else if (shelf.length === 1) {
                        return (
                            <div className="cellar-frame-shelf">
                                <Link to={shelf[0]._id.toString()} className="wine-closup-link" key={shelf[0]._id.toString()}>
                                    <WineComponent wine={shelf[0]} />
                                </Link>
                            </div>)
                    }
                    
                });
            };
        } else {
            const threeShelves = ['sh', 'sh', 'sh']
            shelvesElements = threeShelves.map((shelf) => (<div className="cellar-frame-shelf"></div>))
        }
        return shelvesElements
    }

    useEffect(()=> {
        setShelves(putWinesOnShelves())
    }, [chosenCellar])

 


    return (   
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

            {/* --- --- --- CELLAR --- --- --- */}
            {!error && user && <div className="page cellar-page">
                <div className="left-div">
                    <div className="cellar-frame-div">
                        { shelves }
                    </div>
                </div>
                <div className="right-div cellar-menu-div">
                    <h1 className="shifted-title first-part">Your</h1>
                    <h1 className="shifted-title second-part">Cellar</h1>
                    {!userCellar.length  && <p>You don't have any wines saved yet. 
                                    Add more wines to your cellar.</p>}
                    {(userCellar.length>0) && <p>  Here are the wines you have enjoyed recently.
                                    Pick the wine type you want to filter by,
                                    or add a new wine.
                                </p>}
                    {(userCellar.length>0) && <ul className="wine-types-menu">
                        <li onClick={()=>{changeTypeOnClick("white")}}      style={chosenWineType === "white" ? {textAlign: "end"} : {textAlign: "start"}}      >White</li>
                        <li onClick={()=>{changeTypeOnClick("rose")}}       style={chosenWineType === "rose" ? {textAlign: "end"} : {textAlign: "start"}}       >Rosé</li>
                        <li onClick={()=>{changeTypeOnClick("orange")}}     style={chosenWineType === "orange" ? {textAlign: "end"} : {textAlign: "start"}}     >Orange</li>
                        <li onClick={()=>{changeTypeOnClick("red")}}        style={chosenWineType === "red" ? {textAlign: "end"} : {textAlign: "start"}}        >Red</li>
                        <li onClick={()=>{changeTypeOnClick("bubbles")}}    style={chosenWineType === "bubbles" ? {textAlign: "end"} : {textAlign: "start"}}    >Bubbles</li>
                        <li onClick={()=>{changeTypeOnClick("all")}}        style={chosenWineType === "all" ? {textAlign: "end"} : {textAlign: "start"}}        >All</li>
                    </ul>}
                    <Link to="/add-new-wine">
                        <button className="simple-button">Add new wine</button>
                    </Link>
                </div>
            </div>}
        </div>
        );
};

