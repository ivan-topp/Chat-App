import { createContext, useCallback, useContext, useState } from 'react';
import { ChatContext } from '../context/chat/ChatContext';
import { fetchWithoutToken, fetchWithToken } from '../helpers/fetch';
import { types } from '../types/types';


export const AuthContext = createContext();

const initialState = {
    uid: null,
    checking: true,
    logged: false,
    name: null,
    email: null,
};

export const AuthProvider = ({ children }) => {

    const [ auth, setAuth] = useState(initialState);
    const { dispatch } = useContext(ChatContext);

    const login = async ( email, password ) => {
        const resp = await fetchWithoutToken('login', { email, password }, 'POST');
        if(resp.ok){
            const { user, token } = resp;
            localStorage.setItem('token', token);
            setAuth({
                uid: user.uid,
                checking: false,
                logged: true,
                name: user.name,
                email: user.email,
            });
        }
        return resp;
    };

    const register = async ( name, email, password ) => {
        const resp = await fetchWithoutToken('login/new', { name, email, password }, 'POST');
        if(resp.ok){
            const { user, token } = resp;
            localStorage.setItem('token', token);
            setAuth({
                uid: user.uid,
                checking: false,
                logged: true,
                name: user.name,
                email: user.email,
            });
        }
        return resp;
    };

    const verifyToken = useCallback( async () => {
        const token = localStorage.getItem('token');
        if(!token){
            setAuth({
                uid: null,
                checking: false,
                logged: false,
                name: null,
                email: null,
            });
            return false;
        }
        const resp = await fetchWithToken('login/renew');
        if(resp.ok){
            const { user, token } = resp;
            localStorage.setItem('token', token);
            setAuth({
                uid: user.uid,
                checking: false,
                logged: true,
                name: user.name,
                email: user.email,
            });
            return true;
        } else {
            setAuth({
                uid: null,
                checking: false,
                logged: false,
                name: null,
                email: null,
            });
            return false;
        }
    }, []);

    const logout = () => {
        localStorage.removeItem('token');
        dispatch({ type: types.clearChatState });
        setAuth({
            checking: false,
            logged: false,
        });
    };

    return (
        <AuthContext.Provider value={{ 
            auth,
            login,
            register,
            verifyToken,
            logout,
        }}>
            { children }
        </AuthContext.Provider>
    )
}
