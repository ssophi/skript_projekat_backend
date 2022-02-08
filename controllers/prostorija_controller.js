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
export const createProstorije = (req, res) => {
    let query = "insert into prostorija (tip, broj_sale, povrsina, kapacitet) values (?, ?, ?, ?)";
    let formated = mysql.format(query, [req.body.tip, req.body.broj_sale, req.body.povrsina, req.body.kapacitet]);

    pool.query(formated, (err, response) => {
        if (err)
            res.status(500).send(err.sqlMessage);
        else {
            // Ako nema greske dohvatimo kreirani objekat iz baze i posaljemo ga korisniku
            query = 'select * from prostorija where id=?';
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
export const getAllProstorije = (req, res) => {
    pool.query('select * from prostorija', (err, rows) => {
        if (err)
            res.status(500).send(err.sqlMessage);  // Greska servera
        else
            res.send(rows);
    })
}

//Get one user
export const getOneProstorije = (req, res) => {
    let query = 'select * from prostorija where id=?';
    let formated = mysql.format(query, [req.params.id]);

    pool.query(formated, (err, rows) => {
        if (err)
            res.status(500).send(err.sqlMessage);
        else
            res.send(rows[0]);
    });
}

//Get one user
export const getOneProstorijaLocal = (id) => {
    let query = 'select * from prostorija where id=?';
    let formated = mysql.format(query, [id]);

    pool.query(formated, (err, rows) => {
        if (err)
            console.log("Error", err)
        else
           rows[0];
    });
}

//Update user
export const updateProstorije = (req, res) => {
    let query = "update prostorija set tip=?, broj_sale=?, povrsina=?, kapacitet=? where id=?";
    let formated = mysql.format(query, [req.body.tip, req.body.broj_sale, req.body.povrsina, req.body.kapacitet, req.params.id]);

    pool.query(formated, (err, response) => {
        if (err)
            res.status(500).send(err.sqlMessage);
        else {
            query = 'select * from prostorija where id=?';
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
export const deleteProstorije = (req, res) => {
    let query = 'select * from prostorija where id=?';
    let formated = mysql.format(query, [req.params.id]);

    pool.query(formated, (err, rows) => {
        if (err)
            res.status(500).send(err.sqlMessage);
        else {
            let poruka = rows[0];

            let query = 'delete from prostorija where id=?';
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