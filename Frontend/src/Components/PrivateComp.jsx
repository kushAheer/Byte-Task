import React from 'react'
import classes from './LoginComp.module.css'
function PrivateComp() {
    return (
        <>
            <div className={`${classes.centerWrapper} pt-5`}>
                <div className="row">
                    <div className="col-md-12">
                        <div className={`row text-center`}>
                            <div className='col-md-12'>

                                <h1>This is a Private Page</h1>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>

    )
}

export default PrivateComp