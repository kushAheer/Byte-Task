import React from 'react'
// import useLogin from '../Hooks/useLogin'
import { useDispatch } from 'react-redux'
// import { logoutGitHub } from '../../../Backend/controller/auth.controller'
import useFollowCheck from '../Hooks/useFollowCheck'
import classes from './LoginComp.module.css'
import { Link } from 'react-router-dom'

function HomeComp() {




    return (
        <>
            <div className={`${classes.centerWrapper} pt-5`}>
				<div className="row">
					<div className="col-md-12">
						<div className={`row text-center`}>
							<div className='col-md-12'>

								<h1>Authorization Required</h1>
							</div>
							<div className='col-md-12 d-flex flex-row justify-content-evenly pt-5'>
                            <Link to={'/public'} ><button className={`${classes.verifyButtonActive} p-3`} >/Public</button></Link>
                            <Link to={'/login'}><button className={`${classes.verifyButtonActive} p-3`} >/private</button></Link>
                            </div>


						</div>
					</div>
				</div>

			</div>
        </>
    )
}

export default HomeComp