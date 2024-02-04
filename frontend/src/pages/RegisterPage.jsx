import React from 'react'
import { useState } from 'react';
import { useRegister } from '../hooks/useRegister';
import WineCellarPhoto from '../assets/project-photos/photo-07.jpg'
import '../index.css';

export default function RegisterPage() {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ birthDate, setBirthDate ] = useState('');
    const [ emptyFields, setEmptyFields ] = useState('');
    //getting the function & states from useRegister custom hooks
    const { register, isLoading, error } = useRegister();

    async function handleSubmit(e) {
        e.preventDefault();
        await register(email, password, birthDate);
    }

    return(   
        <div className="page login-page">
            <div className="border-rect">
                <div className="border-rect-left">
                    <img src={ WineCellarPhoto } alt="Wine cellar"></img>
                </div>
                <div className="border-rect-right">
                    <h3>Sign Up</h3>
                    { error && <p className="error-message">Error: {error}</p>}
                    <form className="login-form" onSubmit={handleSubmit}>
                        <label className="form-label">E-mail</label>
                        <input 
                        type="email"
                        className={emptyFields.includes('email') ? "error-input form-input login" : "form-input login"} 
                        onChange={(e) => setEmail(e.target.value)} 
                        value={email}>
                        </input>

                        <label className="form-label">Password</label>
                        <input 
                        type="password"
                        className={emptyFields.includes('password') ? "error-input form-input login" : "form-input login"} 
                        onChange={(e) => setPassword(e.target.value)} 
                        value={password}>
                        </input>

                        <label className="form-label">Birth date</label>
                        <input 
                        type="date"
                        className={emptyFields.includes('birthDate') ? "error-input form-input login" : "form-input login"} 
                        onChange={(e) => setBirthDate(e.target.value)} 
                        value={birthDate}>
                        </input>

                        <input type="submit" disabled={isLoading} className="simple-button" value="Sign up"/>
                    </form>
                    <a href="/login-page" className="simple-link">Already have an account? Sign in.</a>
                </div>
            </div>
        </div>
)
}