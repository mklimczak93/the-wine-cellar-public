import React from 'react';
import { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
//images
import ProfilePhoto01 from '../assets/profile-placeholders/profile-placeholder-06.png';
import '../index.css';

export default function ProfilePage() {
    const { user } = useAuthContext();
    const [ noOfBottles, setNoOfBottles ] = useState(0);
    const [ cellar, setCellar ] = useState('');
    const [ userObject, setUserObject ] = useState('');
    const [ error, setError ] = useState('');
    const [ mssg, setMssg ] = useState('');
    const [ deletingAccountState, setDeletingAccountState ] = useState('');
    const [ age, setAge ] = useState(0);
    const [ userLocation, setUserLocation ] = useState('');
    const [ userFirstName, setUserFirstName ] = useState('');
    const [ userLastName, setUserLastName ] = useState('');
    const [ profilePhoto, setProfilePhoto ] = useState();
    const { logout } = useLogout();

    // --- --- --- GETTING USER DATA --- --- --- //
    useEffect(() => {
        if (!user) {
            setMssg('You need to be logged in to see this page.');
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
                    getAge(fetchedUser.birthDate);
                    //profile photo
                    if (fetchedUser.profilePhoto) {
                        let fileName = (fetchedUser.profilePhoto).split('\\')[4];
                        let path = "/uploads/" + fileName;
                        setProfilePhoto(path)
                    } else {
                        setProfilePhoto(ProfilePhoto01);
                    };
                    //location
                    if ( fetchedUser.location === '' || fetchedUser.location == null ) {
                        setUserLocation('Not set.');
                    } else {
                        setUserLocation(fetchedUser.location)
                    };
                    //first name
                    if ( fetchedUser.firstName === '' || fetchedUser.firstName == null ) {
                        setUserFirstName('First name');
                    } else {
                        setUserFirstName(fetchedUser.firstName)
                    }
                    //last name
                    if ( fetchedUser.lastName === '' || fetchedUser.lastName == null ) {
                        setUserLastName('Last name');
                    } else {
                        setUserLastName(fetchedUser.lastName)
                    }
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
            setMssg('You need to be logged in to see this page.');
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
                    setCellar(fetchedCellar);
                    getNoOfBottles(fetchedCellar);
                } else {
                    setError('Failed to fetch cellar.')
                }
            };
            //calling on async function
            fetchedData();
        };
    }, [user])


    // --- --- --- OTHER FUNCTIONS --- --- --- //
    //getting no of bottles
    function getNoOfBottles(cellar) {
        const allBottles = cellar.length;
        let userBottles = [];
        for (let i = 0; i < allBottles; i++) {
            if (cellar[i].userId === userObject._id ) {
                userBottles.push(cellar[i])
            };
        };
        setNoOfBottles(userBottles.length);
    }
    useEffect(()=> {
        getNoOfBottles(cellar);
    }, [cellar])

    //getting age
    function getAge(givenDate) {
        const dateObject    = new Date().toLocaleDateString('en-GB');
        const currentDate   = dateObject.toString();
        const yearCD        = currentDate.slice(6,10);
        const monthCD       = currentDate.slice(3,5);
        const dayCD         = currentDate.slice(0,2);
        const yearBD        = givenDate.toString().slice(0,4);
        const monthBD       = givenDate.toString().slice(5,7);
        const dayBD         = givenDate.toString().slice(8,10);
        if ( monthCD > monthBD ) {
            setAge(yearCD - yearBD);
        } else {
            if ( dayCD > dayBD ) {
                setAge(yearCD - yearBD);
            } else {
                setAge(yearCD - yearBD -1);
            }
        }
    };

    // --- --- --- DELETE USER LOGIC --- --- --- //
    //deleting account - popup
    const makeSureToDeleteAccount = () => {
        let deleteThis = 'DELETE';
        setDeletingAccountState(deleteThis);
    }

    //actually sending delete request
    async function actuallyDeleteAccount() {
        if (!user) {
            setError('You must be logged in to edit your profile.')
            return
        }
        const response = await fetch('http://localhost:4000/api/user/delete-account', {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${user.token}`
            }
            
        });
        const json = await response.json();
        //checking if resposne is OK
        if (response.ok) {
            setMssg(json.mssg);
             //logging out logic
            logout();
            window.location.reload();
        } else {
            setError('Failed to delete user.')
        };
    };

    //refreshing the page
    function pageRefresh() {
        setError('');
        setMssg('');
        setDeletingAccountState('');
        window.location.reload();
    }



    return(   
        <div className="full-flex-page">

            {/* --- --- --- ERROR --- --- --- */}
            {error && user && !mssg && !deletingAccountState && <div className="big-message-div">
                <h3>Error</h3>
                <p>{error}</p>
            </div>}

            {mssg && !error && !deletingAccountState && <div className="big-message-div">
                <h3>Hey,</h3>
                <p>{mssg}</p>
            </div>}

            {!user && !error && !mssg && !deletingAccountState && <div className="big-message-div">
                <h3>You need to be logged in to access this page.</h3>
                <Link to="/login-page">Click here to login. </Link>
            </div>}

            {deletingAccountState && user && !error && !mssg && <div className="big-message-div">
                <h3>Are you sure you want to delete your account?</h3>
                <p>This action cannot be reversed.</p>
                <button className="simple-button" onClick={actuallyDeleteAccount}>
                    Delete profile
                </button>
                <button className="simple-link" onClick={pageRefresh}>
                    Click <strong>here</strong> to go back to your profile.
                </button>
            </div>}

            {/* --- --- --- NO ERROR --- --- --- */}
            {!mssg && !error && !deletingAccountState && user && <div className="page profile-page">
                
                {/* --- --- --- LEFT SIDE --- --- --- */}
                <div className="left-side">
                    <h1 className="shifted-title first-part">Your</h1>
                    <h1 className="shifted-title second-part margin-bottom">Profile</h1>
                    <div className="profile-info">
                        <div className="profile-info-line">
                            <h3 className="profile-info-label">E-mail:</h3>
                            <h3 className="profile-info-data">{userObject.email}</h3>
                        </div>
                        <div className="profile-info-line">
                            <h3 className="profile-info-label">Age:</h3>
                            <h3 className="profile-info-data">{ age }</h3>
                        </div>
                        <div className="profile-info-line">
                            <h3 className="profile-info-label">Location:</h3>
                            <h3 className="profile-info-data">{ userLocation }</h3>
                        </div>
                        <div className="profile-buttons-div">
                            <Link to="/edit-profile">
                                <button className="simple-button">
                                    Edit profile
                                </button>
                            </Link>
                            <button className="simple-button delete-button" onClick={makeSureToDeleteAccount}>
                                Delete profile
                            </button>
                        </div>
                     </div>
                </div>

                {/* --- --- --- RIGHT SIDE --- --- --- */}
                <div className="right-side">
                    <img src={ profilePhoto } className="profile-photo" alt="Profile"></img>
                    <h1 className="shifted-title first-part tablet-mobile-only">Your</h1>
                    <h1 className="shifted-title second-part margin-bottom tablet-mobile-only">Profile</h1>
                    
                    <h2 className="profile-name">{ userFirstName } {userLastName }</h2>
                    <Link to="/cellar-page">
                        <button className="simple-button">
                                <h5 className="number-of-bottles">{ noOfBottles }</h5>
                                <p>bottles in cellar</p>
                        </button>
                    </Link>
                </div>
            </div>}
        </div>
)
}