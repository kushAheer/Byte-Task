import React, { useState } from 'react'

import { useEffect } from 'react'
function useFollowCheck() {
    
    const [data , setData] = useState()
    const [loading , setLoading] = useState(false)
    
    
    const followCheck = async () => {
        setLoading(true)
        try{
            
            const res = await fetch(`http://localhost:5000/auth/subscription/follow`, {
                method: "GET",
                credentials: "include",
                headers: {
                    
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Credentials": true,
                },
            }).then((response) => response.json())
            setData(res.success)
            setLoading(false)
        }catch(error){
            console.log(error)
        }finally{
            setLoading(false)
        }

    }
    useEffect(() => {
        followCheck()
    },[])
    
    
    return {data , loading}
}

export default useFollowCheck