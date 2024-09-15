import React from 'react'
import classes from './LoginComp.module.css'
import { useSelector } from 'react-redux'
// import githubLogo from '../../public/github-mark-white.png'
// import useLogin from '../Hooks/useLogin.js'
import { gitLogout } from '../Context/Slice/gitHubSlice'
import { googleLogout } from '../Context/Slice/googleSlice'
import { useDispatch } from 'react-redux'
import VerifyComp from './VerifyComp'

import { setGitHubVerified, setYouTubeVerified } from '../Context/Slice/privateRouteSlice'
function LoginComp() {

	// const {loading , loginFunction} = useLogin()
	const dispatch = useDispatch()

	
	


	const handleGitLogin = async () => {
		// await loginFunction()
		const url = `${import.meta.env.VITE_BACKEND_URL}/auth/github`
		console.log(url)
		window.location.href = url

	}
	const handleGoogleLogin = async () => {

		window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/google`
	}

	const handleLogOut = async (type) => {
		if (type === "github") {
			await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/logout`, {
				method: "POST",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${gitHubUser.accessToken}`
				}
			})
			dispatch(gitLogout());
			dispatch(setGitHubVerified())
		} else {
			await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/logout`, {
				method: "POST",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${googleUser.accessToken}`
				}
			})
			dispatch(googleLogout());
			dispatch(setYouTubeVerified());
		}

	}



	const gitHubUser = useSelector((state) => state.githubs.user)
	const googleUser = useSelector((state) => state.googles.user)

	return (

		<>
			<div className={`${classes.centerWrapper} pt-5`}>
				<div className="row">
					<div className="col-md-12">
						<div className={`row text-center`}>
							<div className='col-md-12'>

								<h1>Authorization Required</h1>
							</div>
							<div className='col-md-12'>

								<div className={`col-md-12 ${classes.formWrapper}`}>
									<div className={`${classes.loginBox}`}>

									{
										!gitHubUser ?
											<button className={`${classes.buttonLog}`} onClick={handleGitLogin}>GitHub</button> :
											<div className={`${classes.loginWrapper}`}>
												<h3>{gitHubUser.displayName}</h3>
												<img src={`${gitHubUser.photos[0].value}`} className='rounded-circle' width={100} height={100} />
												<button onClick={() => handleLogOut("github")} className={`${classes.buttonLog}`}>Log out</button>
											</div>
									}
									{
										!googleUser ?
											<button className={`${classes.buttonLog}`} onClick={handleGoogleLogin} >Google</button> :
											<div className={`${classes.loginWrapper}`}>
												<h3>{googleUser.displayName}</h3>
												<img src={`${googleUser.photos[0].value}`} className='rounded-circle' width={100} height={100} />
												<button onClick={() => handleLogOut("google")} className={`${classes.buttonLog}`}>Log out</button>
											</div>

									}
									</div>

									<VerifyComp
										isGitLogedIn={gitHubUser ? false : true}
										isGoogleLogedIn={googleUser ? false : true}
									/>
									
								</div>

							</div>


						</div>
					</div>
				</div>

			</div>
		</>
	)
}

export default LoginComp