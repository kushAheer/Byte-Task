import passport, { Passport } from "passport";
import GitHubStrategy from "passport-github2";
import GoogleStrategy from "passport-google-oauth20";
import User from "./Model/user.model.js";

passport.use(new GitHubStrategy({

    clientID: process.env.GITHUB_CLIENT_ID,

    clientSecret: process.env.GITHUB_CLIENT_SECRET,

    callbackURL: `${process.env.PRODUCTION_URL}/auth/github/callback`,

}, async function (accessToken, refreshToken, profile, cb) {
    // console.log('profile', profile);
    // console.log('accessToken', accessToken);
    // try {
    //     let user = await User.findOne({ email: profile.emails[0].value });

    //     if (user) {
    //         let id = user['_id'];
    //         user = await User.findByIdAndUpdate(id, {
    //             accessToken: accessToken
    //         });
    //         return done(null, user);
    //     }

    //     user = new User({
    //         username: profile.username,
    //         email: profile.emails[0].value,
    //         avatar: profile.photos[0].value,
    //         provider: profile.provider,
    //         accessToken: accessToken
    //     });
    //     await user.save();
    //     return cb(null, user);



    // } catch (error) {

    // }
    profile.accessToken = accessToken;
    cb(null, profile);

}));

passport.use(new GoogleStrategy({

    clientID: process.env.GOOGLE_CLIENT_ID,

    clientSecret: process.env.GOOGLE_CLIENT_SECRET,

    callbackURL: `${process.env.PRODUCTION_URL}/auth/google/callback`,

    scope: ['email', 'profile', 'https://www.googleapis.com/auth/youtube.readonly'],

    prompt: 'consent',




}, function (accessToken, refreshToken, profile, cb) {


    profile.accessToken = accessToken;
    cb(null, profile);

}));



passport.serializeUser((user, done) => {

    // console.log('serializeUser', user);
    done(null, user);
});

passport.deserializeUser(async (id, done) => {
    // console.log('deserializeUser', obj);
    // try {
    //     const user = await User.findById(id);
    //     done(null, user);
        
    // } catch (error) {
        
    //     done(null, obj);
    // }
    done(null, id);
});