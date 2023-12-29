"use client";
import React, { useContext } from 'react'
import { ZiplyAuthenticationContext } from '../context/ZiplyAuthContext'

const baseUrl = 'https://cxpapi-dev.nwestnetwork.com'

const useAuth = () => {
    const { data, error, loading, setAuthState } = useContext(ZiplyAuthenticationContext);

    const signIn = async ({ loginID, password }: { loginID: string, password: string }) => {
        setAuthState({ data: null, error: null, loading: true });
        try {
            const response = await fetch(`${baseUrl}/api/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ loginID, password: btoa(password) })
            });
            const data = await response.json();
            if(data.content.error){
                setAuthState({ data:null, error: data.content.error.description, loading: false });
            }else{
                localStorage.setItem('loginResponse', JSON.stringify(data))
                setAuthState({ data, error: null, loading: false });
            }
        } catch (error: any) {
            setAuthState({ data: null, error: error, loading: false });
        }
    }

    const signOut = async () => {   
        localStorage.removeItem('loginResponse')
        sessionStorage.removeItem('loginResponse')
        setAuthState({ data: null, error: error, loading: false });
    }

    return {
        signIn,
        signOut
    }
};

export default useAuth