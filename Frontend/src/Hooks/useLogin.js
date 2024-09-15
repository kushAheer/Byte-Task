import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { gitLogin } from '../Context/Slice/gitHubSlice'
import { googleLogin } from '../Context/Slice/googleSlice'
import toast from 'react-hot-toast'

function useLogin() {

    const [loading , setLoading] = useState(false)
    const [userData , setUserData] = useState(null)
    const dispatch = useDispatch()
     
    const url = `${import.meta.env.VITE_BACKEND_URL}/auth/login/success`
    console.log(url)
    useEffect(() => {
        const getLoginData = async () => {
            try{
                console.log("FETCHING USER DATA")
                // const gitHubId = localStorage.getItem('githubId');
                // const googleId = localStorage.getItem('googleId') || null;
                const gitToken = localStorage.getItem('gitToken') || null;
                const googleToken = localStorage.getItem('googleToken') || null;
                const res = await fetch(url, {
                    method: "GET",
                    credentials: "include",

                    headers: {
                      "gittoken" : gitToken,
                        "googletoken" : googleToken,
                      "Content-Type": "application/json",
                      "credentials": "include",
                      
                    },
                }).then((response) => response.json())
                console.log(res)
                if(res.success && res.type === "github"){
                    dispatch(gitLogin(res.user.user))
                    setUserData(res.user.user)
                    setLoading(false)
                    
                }else if(res.success && res.type === "google"){
                    dispatch(googleLogin(res.user.user))
                    setUserData(res.user)
                    setLoading(false)
                }else{
                    setLoading(false)
                    toast.error("Login failed")
                }
                

            }catch(error){
                console.log(error)
                toast.error(error.message)

                
            }
        }
        getLoginData()
    },[])

    return {loading , userData}
  
}

export default useLogin