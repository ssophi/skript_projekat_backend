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
export const createMasaza = (req, res) => {
    let query = "insert into masaza (tip, termini, masazerId, prostorijaId) values (?, ?, ?, ?)";
    let formated = mysql.format(query, [req.body.tip, req.body.termini, req.body.masazerId, req.body.prostorijaId]);

    pool.query(formated, (err, response) => {
        if (err)
            res.status(500).send(err.sqlMessage);
        else {
            // Ako nema greske dohvatimo kreirani objekat iz baze i posaljemo ga korisniku
            query = 'select * from user where id=?';
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

//Get all masaza
export const getAllMasaza = (req, res) => {
    //res.send("<h1>Get All Masaza</h1>")
    pool.query('select * from masaza', (err, rows) => {
        if (err)
            res.status(500).send(err.sqlMessage);  // Greska servera
        else
            res.send(rows);
    })
}

//Get one user
export const getOneMasaza = (req, res) => {
    let query = 'select * from masaza where id=?';
    let formated = mysql.format(query, [req.params.id]);

    pool.query(formated, (err, rows) => {
        if (err)
            res.status(500).send(err.sqlMessage);
        else
            res.send(rows[0]);
    });
}

//Update user
export const updateMasaza = (req, res) => {
    let query = "update masaza set tip=?, termini=?, masazerId=?, prostorijaId=? where id=?";
    let formated = mysql.format(query, [req.body.tip, req.body.termini, req.body.masazerId, req.body.prostorijaId, req.params.id]);

    pool.query(formated, (err, response) => {
        if (err)
            res.status(500).send(err.sqlMessage);
        else {
            query = 'select * from masaza where id=?';
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
export const deleteMasaza = (req, res) => {
    let query = 'select * from masaza where id=?';
    let formated = mysql.format(query, [req.params.id]);

    pool.query(formated, (err, rows) => {
        if (err)
            res.status(500).send(err.sqlMessage);
        else {
            let poruka = rows[0];

            let query = 'delete from masaza where id=?';
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