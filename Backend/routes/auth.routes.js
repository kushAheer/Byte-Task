import { Router } from "express";
import { callBackFunction, gitAuth, googleAuth, googleCallBack,checkYouTubeSubscription ,loginFailed, loginSuccess, subScriptionValidation, logout } from "../controller/auth.controller.js";

const router = Router();


router.get('/github',gitAuth)

router.get('/google',googleAuth)

router.get('/google/callback', googleCallBack)

router.get('/github/callback',callBackFunction)

router.get('/login/success',loginSuccess)

router.get('/login/failed',loginFailed)

router.get('/subscription/follow' , subScriptionValidation)

router.get('/subscribed' , checkYouTubeSubscription)

router.post('/logout' , logout)


export default router;