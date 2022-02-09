import express from 'express'
import bodyParser from 'body-parser'

import adminRoutes from './routes/admin_routes.js'
import userAppRoutes from './routes/user_app_routes.js'
import authRoutes from './routes/auth_routes.js'

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cors from 'cors';

import { sifruj } from './controllers/user_controller.js'


//import Joi from 'joi'


import { getOneZaposleni } from './controllers/zaposleni_controller.js'
import Joi from 'joi';
import { resetSlobodno } from './controllers/termin_controller.js'

const app = express()
// const app_auth = express();
const PORT = process.env.PORT || 5000;

app.use(express.static('static'));




// var corsOptions = {
//     origin: 'http://127.0.0.1:5000',
//     optionsSuccessStatus: 200
// }
// var corsOptions_auth = {
//     origin: 'http://127.0.0.1:8080',
//     optionsSuccessStatus: 200
// }


// app_auth.use(express.json());
// app_auth.use(cors());
app.use(cors())

app.use(express.json());
// app.use(cors(corsOptions_auth));


app.use(bodyParser.json())
// app_auth.use(bodyParser.json())

app.use('/admin', adminRoutes)

app.use('/', userAppRoutes)

// app_auth.use('/', authRoutes)
/*
app.get('/', (req, res) => {
    res.send("Hello from Homepage")
})
*/

function getCookies(req) {
    if (req.headers.cookie == null) return {};

    const rawCookies = req.headers.cookie.split('; ');
    const parsedCookies = {};

    rawCookies.forEach( rawCookie => {
        const parsedCookie = rawCookie.split('=');
        parsedCookies[parsedCookie[0]] = parsedCookie[1];
    });

    return parsedCookies;
}

function authToken(req, res, next) {
    const cookies = getCookies(req);
    const token = cookies['token'];
  
    if (token == null) return res.redirect(301, '/login');
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    
        if (err) return res.redirect(301, '/login');
    
        req.user = user;
    
        next();
    });
}

// app.get('/register', (req, res) => {
//     res.sendFile('register.html', { root: './static' });
// });

// app.get('/login', (req, res) => {
//     res.sendFile('login.html', { root: './static' });
// });

// app.get('/', authToken, (req, res) => {
//     res.sendFile('index.html', { root: './static' });
// });

//resetSlobodno()


app.use(cors());
// app.use(cors());
/*
app_auth.post('/register', (req, res) => {

    const obj = {
        name: req.body.name,
        email: req.body.email,
        admin: req.body.admin,
        password: bcrypt.hashSync(req.body.password, 10)
    };

    Users.create(obj).then( rows => {
        
        const usr = {
            userId: rows.id,
            user: rows.name
        };

        const token = jwt.sign(usr, process.env.ACCESS_TOKEN_SECRET);

        console.log(token);
        
        res.json({ token: token });

    }).catch( err => res.status(500).json(err) );
});

app_auth.post('/login', (req, res) => {
    console.log("ovde sam --------------------------------------------------")
    console.log(req.body)
    getOneZaposleni(req)
        .then( usr => {
            console.log(usr)
            if (bcrypt.compareSync(req.body.password, usr.password)) {
                const obj = {
                    userId: usr.id,
                    user: usr.name
                };
        
                const token = jwt.sign(obj, process.env.ACCESS_TOKEN_SECRET);
                
                res.json({ token: token });
            } else {
                res.status(400).json({ msg: "Invalid credentials"});
            }
        })
        .catch( err => res.status(500).json(err) );
});
*/
 
// sifruj();
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))


// app_auth.listen(9000, () => console.log(`Server running on port ${9000}`))