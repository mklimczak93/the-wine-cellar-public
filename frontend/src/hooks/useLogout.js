import { useAuthContext } from './useAuthContext';

export const useLogout = () => {
    const { dispatch } = useAuthContext();
    //clearing out global state using dispatch action & clearing out JWT from localStorage
    const logout = () => {
        //remove user from storage
        localStorage.removeItem('user');
        //clearing out global state by dispatch 'LOGOUT' action
        dispatch({type: 'LOGOUT'});
    };
    return {logout}
}