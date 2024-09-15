import express from 'express';
import dotenv from 'dotenv';
import passport from 'passport';
import session, { MemoryStore } from 'express-session';
import MongoStore from 'connect-mongo';
import cors from 'cors';
import authRouter from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';
import AppDbContext from './Db/appDbConnect.js';
import appDbContext from './Db/appDbConnect.js';





const passportSetup = import('./passport.js');



dotenv.config();


const app = express();


app.use(session({
    secret : 'secret',
    resave : false,
    saveUninitialized : true, 
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());



app.use(cors(
    {
        origin: `http://localhost:3000`,
        methods: ['GET','POST','PUT','DELETE'],
        credentials: true
    }
));



app.get('/', (req, res) => {
    res.send('Server is ready');
});

app.use('/auth', authRouter );

const PORT = process.env.PORT || 5000;
const productionURL = process.env.PRODUCTION_URL ;

app.listen(5000, () => {
    appDbContext();
    console.log(`Server is running on ${productionURL}`);
});