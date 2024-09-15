import { useState } from 'react'

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LoginComp from './Components/LoginComp.jsx'
import useLogin from './Hooks/useLogin.js'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import HomeComp from './Components/HomeComp.jsx'
import { Toaster } from 'react-hot-toast'
import { useSelector } from 'react-redux'
import PrivateComp from './Components/PrivateComp.jsx'
import PublicComp from './Components/PublicComp.jsx'


function App() {

	
	const {loading , userData} = useLogin()
	



	
	const gitHubVerify = useSelector((state) => state.privateRoutes.gitHubVerified)
	const youTubeVerify = useSelector((state) => state.privateRoutes.youTubeVerified)
	const isGoogleLoggedIn = useSelector((state) => state.googles.user)
	const isGitHubLoggedIn = useSelector((state) => state.githubs.user)

	const isAuth = isGoogleLoggedIn && isGitHubLoggedIn && gitHubVerify && youTubeVerify

	
	const router = createBrowserRouter([
		{path : '/', element : <HomeComp /> },
		{path : '/public', element : <PublicComp /> },
		{
			path : '/login',
			element : <LoginComp /> 
		},
		{
			path : "/private",
			element : isAuth ? <PrivateComp/> :  <Navigate to="/login" />
		}


	])
	return (
		<>
			<RouterProvider router={router}/>
			<Toaster />
				
		</>

	)
}

export default App
