"use client";

import React, { useContext, useEffect, useRef, useState } from 'react'
import useAuth from '../../hooks/useAuth'
import { ZiplyAuthenticationContext } from '../../context/ZiplyAuthContext';
import { redirect, useRouter } from "next/navigation";
type Props = {}

export function Login({ }: Props) {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [apiError, setApiError] = useState<string | null>(null);
    const { data, error, loading, setAuthState } = useContext(ZiplyAuthenticationContext);
    const router = useRouter();
    const { signIn } = useAuth();


    useEffect(() => {
        if (error) {
            setApiError(error);
            setTimeout(()=>{
                setAuthState({
                    data:null,
                    error:null,
                    loading:false
                })
            }, 5000)
        }else{
            setApiError(null);

            if(data && !loading){
                router.push("/editor");
            }
        }
    }, [data, error, loading]);

    const handleSignIn = (e: any) => {
        e.preventDefault();
        if (emailRef.current?.value && passwordRef.current?.value) {
            signIn({ loginID: emailRef.current.value, password: passwordRef.current.value })
        }
    }
    return (
        <div className="relative flex flex-col justify-center h-screen overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-lg">
                <h1 className="text-3xl font-semibold text-center text-ziplycolor pb-10">RecipeUI - Ziply Fiber Login</h1>
          
                {apiError ? (<div role="alert" className="alert alert-error">
                            <span>{apiError}</span>
                        </div>) : null}
                        
                <form className="space-y-4 pt-4">
                    <div>
                        <label className="label">
                            <span className="text-base label-text">Ziply Network Id</span>
                        </label>
                        <input ref={emailRef} type="text" placeholder="Ziply Network Id" className="w-full input input-bordered input-primary" />
                    </div>
                    <div>
                        <label className="label">
                            <span className="text-base label-text">Password</span>
                        </label>
                        <input ref={passwordRef} type="password" placeholder="Enter Password"
                            className="w-full input input-bordered input-primary" />
                    </div>
                    <div>
                        <button className="btn btn-primary" onClick={handleSignIn}>Login</button>
                    </div>
                </form>
            </div>
        </div>
    )
}








