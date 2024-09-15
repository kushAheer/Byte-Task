import React from 'react'
import toast from 'react-hot-toast'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import classes from './LoginComp.module.css'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { setGitHubVerified  , setYouTubeVerified} from '../Context/Slice/privateRouteSlice'


function VerifyComp(props) {

    const dispatch = useDispatch()
    const [gitLoading , setGitLoading] = useState(false)
    const [youtubeLoading , setYouTubeLoading] = useState(false)


    const gitHubUser = useSelector((state) => state.githubs.user)
    const googleUser = useSelector((state) => state.googles.user)
    const isGitHubVerified = useSelector((state) => state.privateRoutes.gitHubVerified)
    const isYouTubeVerified = useSelector((state) => state.privateRoutes.youTubeVerified)

    const gitFollowCheck = async ()=>{

        try{
            setGitLoading(true)
            await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/subscription/follow`, {
                method: "GET",
                credentials: "include",
                headers: {
                    "Authorization" : `Bearer ${gitHubUser.accessToken}`,
                    username: gitHubUser.username,
                    
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Credentials": true,
                    "credentials": "include",
                },
            }).then((response) => response.json()).then((res) => {
                if(res.success){
                    
                    dispatch(setGitHubVerified(true))
                    toast.success("You are following the profile")
                }else{
                    dispatch(setGitHubVerified(false))
                    toast.error("You are not following the profile")
                }
            })
        }catch(error){
            console.log(error)
            toast.error("Error in checking the follow")
        }finally{
            setGitLoading(false)
        }
    }

    const youtubeSubscriptionCheck = async ()=>{
        try {
            setYouTubeLoading(true)
            
            await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/subscribed`, {
                method: "GET",
                credentials: "include",
                headers: {
                    "Authorization" : `Bearer ${googleUser.accessToken}`,
                    
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Credentials": true,
                    "credentials": "include",
                },
            }).then((response) => response.json()).then((res) => {
                if(res.success){
                    
                    dispatch(setYouTubeVerified(true))
                    toast.success("You are subscribed to the channel")
                }else{
                    dispatch(setYouTubeVerified(false))
                    toast.error("You are not subscribed to the channel")
                }
            })

            
        } catch (error) {
            
        }finally{
            setYouTubeLoading(false)
        }

    }


    return (
        <>
            <div className={`${classes.verifyBox}`}>
                <h1 className='pt-3'>Verify</h1>
                <div className={`${classes.verifyRoute} pt-3`}>
                    <button className={`${(props.isGitLogedIn) ? classes.verifyButtonDisabled : classes.verifyButtonActive}`} onClick={gitFollowCheck} disabled={props.isGitLogedIn} >
                        {gitLoading ? "Checking...." :  props.isGitLogedIn != null && isGitHubVerified  ? "Gh Verified" : "Verify Github" }
                    </button>
                    <button className={`${(props.isGoogleLogedIn) ? classes.verifyButtonDisabled : classes.verifyButtonActive}`}  onClick={youtubeSubscriptionCheck} disabled={props.isGoogleLogedIn}>
                        {youtubeLoading ? "Checking..." :  props.isGoogleLogedIn != null && isYouTubeVerified  ? "YouTube Verified" : "Verify YouTube" }
                    </button>
                    <Link to={'/private'}><button className={`${classes.verifyButton}`}  disabled={!(isGitHubVerified && isYouTubeVerified && gitHubUser && googleUser)}>Private Route</button></Link>
                </div>

            </div>
        </>
    )
}

export default VerifyComp