import { useState } from "react";
import { useAuthContext } from './useAuthContext';

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext();

    const login = async (email, password) => {
        setIsLoading(true);
        setError(null);

        //making post request
        const response = await fetch('http://localhost:4000/api/user/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        })
        //this will return us JWT or an error message
        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false);
            setError(json.error);
        };
        if (response.ok) {
            //storing JWT in browser in localStorage, so the user is still logged in
            localStorage.setItem('user', JSON.stringify(json));
            //updating authContext with the user email, using dispatch
            dispatch({type: 'LOGIN', payload: json});
            //
            setIsLoading(false);
        };
    };

    return { login, isLoading, error }
}