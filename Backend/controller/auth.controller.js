import axios from "axios";
import passport from "passport"
import jwt from "jsonwebtoken";


export const  gitAuth = async (req, res) => {
    passport.authenticate('github', { scope: [ 'user:email' ] })(req, res);
}

export const callBackFunction = async (req, res, next) => {
    passport.authenticate('github', { failureRedirect: process.env.CLIENT_URL_LOGIN }, (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.redirect(process.env.CLIENT_URL_LOGIN);
        }

        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }

            const token = jwt.sign({ user , type : 'github' }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.redirect(`${process.env.CLIENT_URL_LOGIN}?gittoken=${token}`);
        });
    })(req, res, next);
};

export const googleAuth = async (req, res) => {
    passport.authenticate('google', { scope: ['email', 'profile', 'https://www.googleapis.com/auth/youtube.readonly', 'openid'], prompt: 'consent' })(req, res);
};

export const googleCallBack = async (req, res) => {
    passport.authenticate('google', { failureRedirect: process.env.CLIENT_URL_LOGIN })(req, res, () => {
        const token = jwt.sign({ user: req.user , type : 'google'}, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.redirect(`${process.env.CLIENT_URL_LOGIN}?googletoken=${token}`);
    });
}

export const loginFailed = async (req, res) => {

    return res.send({success : false, message: 'Login failed'})
}

export const loginSuccess = async (req, res) => {
    try {
        // const accessToken = req;
        // console.log('accessToken', accessToken);
        // console.log(req);

        
        // const accessToken = req.headers.authorization?.split(' ')[1];
        
            const gitToken = req.query.gittoken;
            const googleToken = req.query.googletoken;

            
            if(gitToken){
                const user = jwt.decode(gitToken);
                return res.status(200).json({
                    success: true,
                    message: 'Login success',
                    type: user.type,
                    user,
                });
            
            }else{
                const user = jwt.decode(googleToken);
                return res.status(401).json({
                    success: false,
                    message: 'Login failed',
                    user
                });
            }
            
        
        
        
        
        // console.log(req);
        // if (req.user) {
        //     // console.log('req.user', req.user);
        //     const type = req.user.provider;
        //     // const data = {
        //     //     username: req.user.username,
        //     //     email: req.user.email,
        //     //     avatar: req.user.avatar,
        //     //     accessToken: req.user.accessToken
        //     // }
        
        //     return res.status(200).json({
        //         type: type,
        //         token : req.user.accessToken,
        //         success: true,
        //         message: 'Login success',
        //         user: req.user,
        //     })
        // }else{
        //     res.status(401).json({
        //         success: false,
        //         message: 'Login failed',
        //         user : req.user
        //     });
        // }
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'An error occurred',
            error: error.message
        });
    }
}


export const subScriptionValidation = async (req, res) => {
    try{
        
        const token = req.headers.authorization?.split(' ')[1];
        
        const username = req.headers.username;
        

        const response = await axios.get(`https://api.github.com/users/${username}/following/bytemait`, {
            
            headers: {
                
                Authorization: `token ${token}`
            }
        });
        
        if(response.status === 204){
            return res.status(200).json({
                success: true,
                message: 'Subscription is valid'
            });
        }else{
            return res.status(401).json({
                success: false,
                message: 'Subscription is not valid'
            });
        }

        

    }catch{

    }
}


export const checkYouTubeSubscription = async (req, res) => {
    try {
        
        const token = req.headers.authorization?.split(' ')[1];

        const response = await axios.get('https://www.googleapis.com/youtube/v3/subscriptions', {
            params: {
                part: 'snippet',
                mine: true,
                key: process.env.YOUTUBE_API_KEY,
                forChannelId : 'UCgIzTPYitha6idOdrr7M8sQ'
                

            },
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        
        const isSubscribed = response.data.items.length > 0;
        
        if(isSubscribed){
            return res.status(200).json({
                success: true,
                message: 'User is subscribed',
                data : response.data

            });
        }else{
            return res.status(401).json({
                success: false,
                message: 'User is not subscribed',
                data : response.data
            });
        }

    } catch (error) {
        console.error('Error fetching YouTube subscriptions:', error.response ? error.response.data : error.message);
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch YouTube subscriptions',
            error: error.response ? error.response.data : error.message
        });
    }
};
export const logout = async (req, res) => {
    try {
        const accessToken = req.headers.authorization?.split(' ')[1];

        if (!accessToken) {
            return res.status(401).json({
                success: false,
                message: 'Access token is missing'
            });
        }


        req.logout(() => {
            req.session.destroy((err) => {
                
                res.clearCookie('connect.sid');
                res.status(200).json({
                    success: true,
                    message: 'Logged out successfully'
                });
            });
        });
        
    } catch (error) {
        console.error('Error during logout:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred during logout'
        });
    }
};