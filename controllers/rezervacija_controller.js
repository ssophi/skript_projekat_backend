import {v4 as uuidv4} from 'uuid'
//import users from '../models/User.js'
import mysql from 'mysql'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import 'dotenv/config'

//konekcija sa bazom
const pool = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: 'root54',
    database: 'skript_projekat'
})

//create rezervacija
export const createRezervacija = (req, res) => {
    console.log(req.body)
    let query = "insert into rezervacija (korisnikId, terminId) values (?, ?)";
    let formated = mysql.format(query, [req.body.korisnikId, req.body.terminId]);

    pool.query(formated, (err, response) => {
        if (err)
            res.status(500).send(err.sqlMessage);
        else {
            // Ako nema greske dohvatimo kreirani objekat iz baze i posaljemo ga korisniku
            query = 'select * from rezervacija where id=?';
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

//Get all rezervacije
export const getAllRezervacije = (req, res) => {
    pool.query('select * from rezervacija', (err, rows) => {
        if (err)
            res.status(500).send(err.sqlMessage);  // Greska servera
        else
            res.send(rows);
    })
}


//Get one rezervacija
export const getOneRezervacija = (req, res) => {
    let query = 'select * from rezervacija where id=?';
    let formated = mysql.format(query, [req.params.id]);
    
    pool.query(formated, (err, rows) => {
        if (err)
            res.status(500).send(err.sqlMessage);
        else{
            console.log("Vraca",rows)
            res.send(rows[0]);}
    });
}

//Update rezervacija
export const updateRezervacija = (req, res) => {
    let query = "update rezervacija set korisnikId=?, terminId=? where id=?";
    let formated = mysql.format(query, [req.body.korisnikId, req.body.terminId]);

    pool.query(formated, (err, response) => {
        if (err)
            res.status(500).send(err.sqlMessage);
        else {
            query = 'select * from rezervacija where id=?';
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

//Delete rezervacija
export const deleteRezervacija = (req, res) => {
    let query = 'select * from rezervacija where id=?';
    let formated = mysql.format(query, [req.params.id]);

    pool.query(formated, (err, rows) => {
        if (err)
            res.status(500).send(err.sqlMessage);
        else {
            let poruka = rows[0];

            let query = 'delete from rezervacija where id=?';
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

//Get rezervacija po danu
export const getRezervacijaPoTerminu = (req, res) => {
    let query = 'select * from rezervacija where terminId=?';
    let formated = mysql.format(query, [req.params.terminId]);
    
    pool.query(formated, (err, rows) => {
        if (err)
            res.status(500).send(err.sqlMessage);
        else{
            console.log("Vraca",rows)
            res.send(rows);}
    });
}

