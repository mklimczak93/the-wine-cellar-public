import React from 'react';
import { useState } from 'react';
import { useLogin } from '../hooks/useLogin';
import WineCellarPhoto from '../assets/project-photos/photo-06.jpg'
import '../index.css';

export default function LoginPage() {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ emptyFields, setEmptyFields ] = useState('');
    const { login, isLoading, error } = useLogin();

    async function handleSubmit(e) {
        e.preventDefault();
        await login(email, password);
    }

    return(   
        <div className="page login-page">
            <div className="border-rect">
                <div className="border-rect-left">
                    <img src={ WineCellarPhoto } alt="Wine cellar"></img>
                </div>
                <div className="border-rect-right">
                    <h3>Welcome back</h3>
                    <form className="login-form" onSubmit={handleSubmit}>
                        { error && <p className="error-message">Error: {error}</p> }
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

                        <input disabled={isLoading} type="submit" className="simple-button" value="Login"/>
                    </form>
                    <a href="/register-page" className="simple-link">Don't have an account yet? Sign up</a>
                </div>
            </div>
        </div>
)
}