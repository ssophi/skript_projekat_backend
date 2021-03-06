import express from 'express'

//importi svih controllera
import { createUser, registerUser } from '../controllers/user_controller.js'
import { getAllUser } from '../controllers/user_controller.js'
// import { getOneUser } from '../controllers/user_controller.js'
import { updateUser } from '../controllers/user_controller.js'
import { deleteUser } from '../controllers/user_controller.js'
import { getOneUserByUsername } from '../controllers/user_controller.js'
import { loginUser } from '../controllers/user_controller.js'

import { createZaposleni } from '../controllers/zaposleni_controller.js'
import { getAllZaposleni } from '../controllers/zaposleni_controller.js'
import { getOneZaposleni } from '../controllers/zaposleni_controller.js'
import { updateZaposleni } from '../controllers/zaposleni_controller.js'
import { deleteZaposleni } from '../controllers/zaposleni_controller.js'

import { createProstorije } from '../controllers/prostorija_controller.js'
import { getAllProstorije } from '../controllers/prostorija_controller.js'
import { getOneProstorije } from '../controllers/prostorija_controller.js'
import { updateProstorije } from '../controllers/prostorija_controller.js'
import { deleteProstorije } from '../controllers/prostorija_controller.js'

import { createTrening } from '../controllers/trening_controller.js'
import { getAllTrening } from '../controllers/trening_controller.js'
import { getOneTrening } from '../controllers/trening_controller.js'
import { updateTrening } from '../controllers/trening_controller.js'
import { deleteTrening } from '../controllers/trening_controller.js'

import { createMasaza } from '../controllers/masaza_controller.js'
import { getAllMasaza } from '../controllers/masaza_controller.js'
import { getOneMasaza } from '../controllers/masaza_controller.js'
import { updateMasaza } from '../controllers/masaza_controller.js'
import { deleteMasaza } from '../controllers/masaza_controller.js'

import { createTermin, resetSlobodno } from '../controllers/termin_controller.js'
import { getAllTermini } from '../controllers/termin_controller.js'
import { getOneTermin } from '../controllers/termin_controller.js'
import { updateTermin } from '../controllers/termin_controller.js'
import { deleteTermin } from '../controllers/termin_controller.js'
import { getTerminTreningPoDanu } from '../controllers/termin_controller.js'
import { getTerminMasazaPoDanu} from '../controllers/termin_controller.js'


import jwt from 'jsonwebtoken'
import { createRezervacija } from '../controllers/rezervacija_controller.js'

const router = express.Router()

let tipUser = ""

function authToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log("ruta token je ", token)
    if (token == null) return res.status(401).json({ msg: "nisi autorizovan" });
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    
        if (err) return res.status(403).json({ msg: err });

        console.log("user", user);
        req.user = user;
        tipUser = user.tip;
        console.log("tip", tipUser);
    
        next();
    });
}

//rute za treninge
router.get('/trening', getAllTrening)


//rute za masaze
router.get('/masaza', getAllMasaza)


//rute za user-a
router.get('/user', getAllUser)

router.post('/user/login', loginUser)

router.post('/user/register', registerUser)


router.use(authToken);

//get single user by username
router.get('/user/:username', getOneUserByUsername)
//create user
router.post('/user', createUser)

// //update member
router.put('/user/:id', updateUser)

// //delete user
router.delete('/user/:id', deleteUser)

//rute za termine

router.get('/termini', getAllTermini)

//get single termin
router.get('/termin/:id', getOneTermin)

//create termin
router.post('/termin', createTermin)

// //update termin
router.put('/termin/:id', updateTermin)

// //delete user
router.delete('/termin/:id', deleteTermin)

// slobodni treninzi
router.get('/termin/st/:dan', getTerminTreningPoDanu)

//slobodne masaze
router.get('/termin/sm/:dan', getTerminMasazaPoDanu)

//reset baze za slobodna mesta
router.get('/termin/reset', resetSlobodno)

router.post('/rezervacija', createRezervacija)

export default router