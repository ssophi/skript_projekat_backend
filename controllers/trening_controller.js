import {v4 as uuidv4} from 'uuid'
//import users from '../models/Users.js'
import mysql from 'mysql'

//konekcija sa bazom
const pool = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: 'root54',
    database: 'skript_projekat'
})

//create user
export const createTrening = (req, res) => {
    let query = "insert into trening (tip, termini, trenerId, prostorijaId) values (?, ?, ?, ?)";
    let formated = mysql.format(query, [req.body.tip, req.body.termini, req.body.trenerId, req.body.prostorijaId]);

    pool.query(formated, (err, response) => {
        if (err)
            res.status(500).send(err.sqlMessage);
        else {
            // Ako nema greske dohvatimo kreirani objekat iz baze i posaljemo ga korisniku
            query = 'select * from trening where id=?';
            formated = mysql.format(query, [response.id]);

            pool.query(formated, (err, rows) => {
                if (err)
                    res.status(500).send(err.sqlMessage);
                else
                    res.send(rows[0]);
            });
        }
    });
}

//Get all users
export const getAllTrening = (req, res) => {
    pool.query('select * from trening', (err, rows) => {
        if (err)
            res.status(500).send(err.sqlMessage);  // Greska servera
        else
            res.send(rows);
    })
}

//Get one user
export const getOneTrening = (req, res) => {
    let query = 'select * from trening where id=?';
    let formated = mysql.format(query, [req.params.id]);

    pool.query(formated, (err, rows) => {
        if (err)
            res.status(500).send(err.sqlMessage);
        else
            res.send(rows[0]);
    });
}

// //Get one user
// export const getOneTreningLocal = (id) => {
//     let query = 'select * from trening where id=?';
//     let formated = mysql.format(query, [id]);

//     pool.query(formated, (err, rows) => {
//         if (err)
//             //res.status(500).send(err.sqlMessage);
//             console.log("Error", err)
//         else
//             console.log(rows[0]);
//             rows[0];
//     });
// }

//Update user
export const updateTrening = (req, res) => {
    let query = "update trening set tip=?, termini=?, trenerId=?, prostorijaId=? where id=?";
    let formated = mysql.format(query, [req.body.tip, req.body.termini, req.body.trenerId, req.body.prostorijaId, req.params.id]);

    pool.query(formated, (err, response) => {
        if (err)
            res.status(500).send(err.sqlMessage);
        else {
            query = 'select * from trening where id=?';
            formated = mysql.format(query, [req.params.id]);

            pool.query(formated, (err, rows) => {
                if (err)
                    res.status(500).send(err.sqlMessage);
                else
                    res.send(rows[0]);
            });
        }
    });
}

//Delete user
export const deleteTrening = (req, res) => {
    let query = 'select * from trening where id=?';
    let formated = mysql.format(query, [req.params.id]);

    pool.query(formated, (err, rows) => {
        if (err)
            res.status(500).send(err.sqlMessage);
        else {
            let poruka = rows[0];

            let query = 'delete from trening where id=?';
            let formated = mysql.format(query, [req.params.id]);

            pool.query(formated, (err, rows) => {
                if (err)
                    res.status(500).send(err.sqlMessage);
                else
                    res.send(poruka);
            });
        }
    });
}