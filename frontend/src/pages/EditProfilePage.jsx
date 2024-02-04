import React from 'react';
import { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { default as FormData } from "form-data";
import { Link } from 'react-router-dom';
import ProfilePhoto01 from '../assets/profile-placeholders/profile-placeholder-06.png';
import ProfilePhoto02 from '../assets/profile-placeholders/profile-placeholder-05.png';
import '../index.css';

export default function EditProfilePage() {
    const { user } = useAuthContext();
    const [ userObject, setUserObject ] = useState('');
    const [ error, setError ] = useState('');
    const [ mssg, setMssg ] = useState('');
    const [ userBirthDate, setUserBirthdate ] = useState('');
    //user infor that can be edited
    const [ userLocation, setUserLocation ] = useState('');
    const [ userFirstName, setUserFirstName ] = useState('');
    const [ userLastName, setUserLastName ] = useState('');
    const [ profilePhoto, setProfilePhoto ] = useState('');
    const [ changedPhoto, setChangedPhoto ] = useState('');
    const [ visiblePhoto, setVisiblePhoto ] = useState('');
    const [ preview, setPreview ] = useState('');



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
                    //birthdate
                    const yearBD        = fetchedUser.birthDate.toString().slice(0,4);
                    const monthBD       = fetchedUser.birthDate.toString().slice(5,7);
                    const dayBD         = fetchedUser.birthDate.toString().slice(8,10);
                    let formatBirthdate = dayBD + '.' + monthBD + '.' +  yearBD;
                    setUserBirthdate(formatBirthdate)
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
                        setUserLocation('Location');
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



   //handling submit
    async function handleSubmit(e) {
        e.preventDefault();
        if (!user) {
            setError('You must be logged in to edit your profile.')
            return
        }
        //creating an edited user object
        const editedUser = {
            firstName: userFirstName,
            lastName: userLastName,
            location: userLocation,
            changedPhoto: changedPhoto
        }
        //creating a formData object to include image
        const formData = new FormData();
        formData.append("file", profilePhoto);
        formData.append("textData", JSON.stringify(editedUser));

        const response = await fetch('http://localhost:4000/api/user/edit-profile', {
                method: "PATCH",
                body: formData,
                headers: {
                    "Authorization": `Bearer ${user.token}`
                }
                
            });
            const json = await response.json();
            //checking if resposne is OK
            if (response.ok) {
                setMssg(json.mssg)
            } else {
                setError('Failed to edit user.')
            }
    };



    //changing default image
    async function changeImage() {
        if (changedPhoto === '') {
            setVisiblePhoto(ProfilePhoto02);
            setChangedPhoto('profile-placeholder-05.png');
        } else if (changedPhoto === 'profile-placeholder-05.png') {
            setVisiblePhoto(ProfilePhoto01);
            setChangedPhoto('profile-placeholder-06.png');
        } else if (changedPhoto === 'profile-placeholder-06.png') {
            setVisiblePhoto(ProfilePhoto02);
            setChangedPhoto('profile-placeholder-05.png');
        }
    };

    //setting preview of the loaded image
    useEffect(() => {
        if (typeof profilePhoto === 'string') {
            setPreview(profilePhoto)
            return
        }
        if (profilePhoto) {
          const objectUrl = URL.createObjectURL(profilePhoto); // create here
          setPreview(objectUrl);
        }
        return () => URL.revokeObjectURL(profilePhoto); 
    }, [profilePhoto]);


    return(   
        <div className="full-flex-page">

            {/* --- --- --- ERRORS / MSSGS --- --- --- */}
            {error && !mssg && <div className="big-message-div">
                <h3>Error</h3>
                <p>{error}</p>
            </div>}
            {!user && !error && !mssg && <div className="big-message-div">
                <h1>You need to be logged in to access this page.</h1>
                <Link to="/login-page">Click here to login.</Link>
            </div>}
            {mssg  &&  <div className="big-message-div">
                <h3>Hey,</h3>
                <p>{mssg}</p>
                <Link to="/profile-page">Back to profile.</Link>
            </div>}

            {/* --- --- --- NO ERROR --- --- --- */}
            {!error && !mssg && user && <div className="page">
                
                {/* --- --- --- LEFT SIDE --- --- --- */}
                <div className="left-side">
                    <h1>Edit</h1>
                    <h1>Profile</h1>
                    <div className="profile-info">
                        {/* --- --- --- BASIC DATA --- --- --- */}
                        <h5 className="form-subtitle">BASIC DATA:</h5>
                        {/* <p>This data cannot be changed.</p> */}
                        <div className="profile-info-line">
                            <h3 className="profile-info-label">E-mail:</h3>
                            <h3 className="profile-info-data">{ userObject.email }</h3>
                        </div>
                        <div className="profile-info-line">
                            <h3 className="profile-info-label">Birthdate:</h3>
                            <h3 className="profile-info-data">{ userBirthDate }</h3>
                        </div>
                         {/* --- --- --- ADDITIONAL INFO --- --- --- */}
                         <form className="form" onSubmit={handleSubmit}>
                            <h5 className="form-subtitle">Additional info:</h5>
                            {/* <p>Here you can set additional information.</p> */}
                            <div className="form-sub-div">
                                <input 
                                    placeholder='Location'
                                    type="text" className="form-input" 
                                    onChange={(e) => setUserLocation(e.target.value)} 
                                    value={userLocation}>
                                </input>
                                
                                <input 
                                    placeholder="First Name"
                                    type="text" className="form-input" 
                                    onChange={(e) => setUserFirstName(e.target.value)} 
                                    value={userFirstName}>
                                </input>

                                <input 
                                    placeholder="Last Name"
                                    type="text" className="form-input" 
                                    onChange={(e) => setUserLastName(e.target.value)} 
                                    value={userLastName}>
                                </input>   
                            </div>
                            <div className="form-photo-div">
                                <p>Upload your own photo:</p>
                                <label htmlFor="file-upload" className="custom-file-upload">
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
                                    onChange={(e) => setProfilePhoto(e.target.files[0])} 
                                    name="file">
                                </input>
                            </div>

                            <input type="submit" className="simple-button form-button"/>
                        </form>
                    </div>
                </div>

                {/* --- --- --- RIGHT SIDE --- --- --- */}
                <div className="right-side">
                    <img src={ visiblePhoto ? visiblePhoto : preview } className="profile-photo" alt="Profile photo"></img>
                    <button className="round-button profile-photo-button color-button" onClick={ changeImage }>
                        <svg className="svg-icon" width="100%" height="100%" viewBox="0 0 200 200" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" xmlSpace="preserve" xmlnsserif="http://www.serif.com/">
                            <g transform="matrix(9.75605,0,0,9.75605,12.1956,-7.31644)">
                                <g id="Layer35">
                                    <path className="svg-icon-path" d="M6.4,1.05C6.649,0.719 7.119,0.651 7.45,0.9L9.45,2.4C9.781,2.649 9.849,3.119 9.6,3.45L8.1,5.45C7.851,5.781 7.381,5.849 7.05,5.6C6.719,5.351 6.651,4.881 6.9,4.55L7.36,3.936C4.146,4.679 1.75,7.56 1.75,11C1.75,13.683 3.207,16.026 5.376,17.281C5.734,17.488 5.857,17.947 5.649,18.305C5.442,18.664 4.983,18.786 4.624,18.579C2.011,17.067 0.25,14.24 0.25,11C0.25,6.84 3.153,3.359 7.043,2.47L6.55,2.1C6.219,1.851 6.151,1.381 6.4,1.05ZM12.351,3.695C12.558,3.336 13.017,3.214 13.376,3.421C15.989,4.933 17.75,7.76 17.75,11C17.75,15.16 14.847,18.641 10.957,19.53L11.45,19.9C11.781,20.148 11.849,20.619 11.6,20.95C11.352,21.281 10.881,21.349 10.55,21.1L8.55,19.6C8.26,19.383 8.167,18.989 8.329,18.665L9.329,16.665C9.514,16.294 9.965,16.144 10.335,16.329C10.706,16.514 10.856,16.965 10.671,17.335L10.269,18.139C13.668,17.539 16.25,14.571 16.25,11C16.25,8.317 14.793,5.974 12.625,4.719C12.266,4.512 12.143,4.053 12.351,3.695Z"/>
                                </g>
                            </g>
                        </svg>
                    </button>
                </div>
            </div>}
            
        </div>
)
}