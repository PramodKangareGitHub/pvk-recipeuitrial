"use client"
import React, { useEffect, useState } from 'react'
import jwt_decode from "jwt-decode";
import { DateTime } from "luxon";

interface State {
    loading: boolean,
    data: any | null,
    error: string | null,
}

interface AuthState extends State {
    setAuthState: React.Dispatch<React.SetStateAction<State>>
}

export const ZiplyAuthenticationContext = React.createContext<AuthState>({
    loading: false,
    data: null,
    error: null,
    setAuthState: () => { },
});



export default function AuthContext({
    children,
}: {
    children: React.ReactNode
}) {
    const [authState, setAuthState] = useState<State>({
        loading: false,
        data: null,
        error: null,
    });

    const fetchUser = () => {
        try {
            let loginResponse: any = localStorage.getItem('loginResponse');
            if (!loginResponse) {
                setAuthState({
                    loading: false,
                    data: null,
                    error: null
                });
            } else {
                loginResponse = JSON.parse(loginResponse);
                loginResponse = loginResponse.content.response;
                let decodedToken: any = jwt_decode(loginResponse.token);
                let expiryDate = decodedToken.exp;
                const expiryDateFromUnixTimeStamp = DateTime.fromSeconds(decodedToken.exp).toISO();
                const expiryTime = new Date(expiryDateFromUnixTimeStamp).getTime();
                const dateTimeNow = new Date().getTime();
                const difference = dateTimeNow - expiryTime;
                if (difference > 0) {
                    localStorage.removeItem('loginResponse');
                    sessionStorage.removeItem('loginResponse');
                    setAuthState({
                        loading: false,
                        data: null,
                        error: null
                    });
                } else {
                    setAuthState({
                        loading: false,
                        data: loginResponse,
                        error: null
                    });
                    sessionStorage.setItem('loginResponse', JSON.stringify(loginResponse));
                }
            }
        }
        catch (e: any) {
            setAuthState({
                loading: false,
                data: null,
                error: "Error fetching user data"
            });
        }
    }

    useEffect(() => {
        fetchUser();
    }, []);


    return (
        <ZiplyAuthenticationContext.Provider value={{ ...authState, setAuthState }}>
            {children}
        </ZiplyAuthenticationContext.Provider>
    )
}


