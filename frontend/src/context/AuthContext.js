import { createContext, useReducer } from 'react';
import { useEffect } from 'react';

//creating context
export const AuthContext = createContext();

//custom authReducer function, handling different cases(login/logout)
//based on action.type
export const authReducer = (state, action) => {
    switch(action.type) {
        //if the action.type is LOGIN - return action.payload - user
        case 'LOGIN':
            return { user: action.payload }
        //if the action.type is LOGOUT - return null as user
        case 'LOGOUT':
            return { user: null };
        //if there are no changes, return original state
        default:
            return state
    }
}

//creating custom component, wrapping the application
//and providing the value of the context
//children represent whatver the component wraps

export const AuthContextProvider = ({children}) => {
    //using useReducer hook with custom authReducer function
    //and initial state which is an object with user property 
    //which is null to begin with, as the user is not logged in
    const user = JSON.parse(localStorage.getItem('user'));
    const [ state, dispatch ] = useReducer(authReducer, {
        user: user
    });
    //checking for the login token in the local storage when
    //the component fires
    // useEffect(() => {
    //     //if user in local storage - update AuthContext
    //     if (user) {
    //         dispatch({ type: 'LOGIN', payload: user })
    //     }
    // }, []);

    console.log('AuthContext state', state);

    //wrapping the context around the whole app to provide
    //a globally accessed value: user property & dispatch function
    return(
        <AuthContext.Provider value={{...state, dispatch}}>
            { children }
        </AuthContext.Provider>
    )
}