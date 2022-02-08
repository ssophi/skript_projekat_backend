import {v4 as uuidv4} from 'uuid'
//import users from '../models/User.js'
import mysql from 'mysql'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import 'dotenv/config'
// import { getOneTreningLocal } from '../controllers/trening_controller.js'
import { getOneProstorijaLocal } from '../controllers/prostorija_controller.js'
import { isReferencedIdentifier } from '@vue/compiler-core';

//konekcija sa bazom
const pool = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: 'root54',
    database: 'skript_projekat'
})

//create termin
export const createTermin = (req, res) => {
    console.log(req.body)
    let query = "insert into termin (dan, sati_od, sati_do, treningId, masazaId, slobodno) values (?, ?, ?, ?, ?)";
    let formated = mysql.format(query, [req.body.dan, req.body.sati_od, req.body.sati_do, req.body.treningId, req.body.masazaId, req.body.slobodno]);

    pool.query(formated, (err, response) => {
        if (err)
            res.status(500).send(err.sqlMessage);
        else {
            // Ako nema greske dohvatimo kreirani objekat iz baze i posaljemo ga korisniku
            query = 'select * from termin where id=?';
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

//Get all termini
export const getAllTermini = (req, res) => {
    pool.query('select * from termin', (err, rows) => {
        if (err)
            res.status(500).send(err.sqlMessage);  // Greska servera
        else
            res.send(rows);
    })
}


//Get one termin
export const getOneTermin = (req, res) => {
    let query = 'select * from termin where id=?';
    let formated = mysql.format(query, [req.params.id]);
    
    pool.query(formated, (err, rows) => {
        if (err)
            res.status(500).send(err.sqlMessage);
        else{
            console.log("Vraca",rows)
            res.send(rows[0]);}
    });
}

//Get one termin
// export const getOneTerminLocal = (id) => {
//     let query = 'select * from termin where id=?';
//     let formated = mysql.format(query, [id]);
    
//     pool.query(formated, (err, rows) => {
//         if (err)
//             //res.status(500).send(err.sqlMessage);
//             console.log("error", err)
//         else{
//             rows[0];}
//     });
// }

//Update termin
export const updateTermin = (req, res) => {
    let query = "update termin set dan=?, sati_od=?, sati_do=?, trenigId=?, masazaId=?, slobodno=? where id=?";
    let formated = mysql.format(query, [req.body.dan, req.body.sati_od, req.body.sati_do, req.body.treningId, req.body.masazaId, req.body.slobodno]);

    pool.query(formated, (err, response) => {
        if (err)
            res.status(500).send(err.sqlMessage);
        else {
            query = 'select * from termin where id=?';
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

//Delete termin
export const deleteTermin = (req, res) => {
    let query = 'select * from termin where id=?';
    let formated = mysql.format(query, [req.params.id]);

    pool.query(formated, (err, rows) => {
        if (err)
            res.status(500).send(err.sqlMessage);
        else {
            let poruka = rows[0];

            let query = 'delete from termin where id=?';
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

//Get Termin po danu
export const getTerminPoDanu = (req, res) => {
    let query = 'select * from termin where dan=?';
    let formated = mysql.format(query, [req.params.dan]);
    
    pool.query(formated, (err, rows) => {
        if (err)
            res.status(500).send(err.sqlMessage);
        else{
            console.log("Vraca",rows)
            res.send(rows);}
    });
}

//Get Termin treninga po danu
export const getTerminTreningPoDanu = (req, res) => {
    let query = 'select * from termin inner join trening on termin.treningId = trening.id where termin.dan=? and termin.treningId and termin.slobodna>0';
    let formated = mysql.format(query, [req.params.dan]);
    
    pool.query(formated, (err, rows) => {
        if (err)
            res.status(500).send(err.sqlMessage);
        else{
            console.log("Vraca",rows)
            res.send(rows);}
    });
}

//Get Termin masaza po danu
export const getTerminMasazaPoDanu = (req, res) => {
    let query = 'select * from termin inner join masaza on termin.masazaId=masaza.id where termin.dan=? and termin.masazaId and termin.slobodna>0';
    let formated = mysql.format(query, [req.params.dan]);
    
    pool.query(formated, (err, rows) => {
        if (err)
            res.status(500).send(err.sqlMessage);
        else{
            console.log("Vraca",rows)
            res.send(rows);}
    });
}

//dekrement slobodno termin
export const decrementTerminSlobodno = (id) => {
    let termin;
    let query = 'select * from termin where id=?';
    let formated = mysql.format(query, [req.params.id]);
    
    pool.query(formated, (err, rows) => {
        if (err)
            console.log(err.sqlMessage);
        else{
            console.log("Vraca",rows)
            termin=rows[0];}
    });
    
    termin.slobodno--;
    
    query = "update termin set dan=?, sati_od=?, sati_do=?, trenigId=?, masazaId=?, slobodno=? where id=?";
    formated = mysql.format(query, [termin.dan, termin.sati_od, termin.sati_do, termin.treningId, termin.masazaId, termin.slobodno]);

    pool.query(formated, (err, response) => {
        if (err)
            res.status(500).send(err.sqlMessage);
        else {
            query = 'select * from termin where id=?';
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

//inkrement slobodno termin
export const incrementTerminSlobodno = (id) => {
    let termin;
    let query = 'select * from termin where id=?';
    let formated = mysql.format(query, [req.params.id]);
    
    pool.query(formated, (err, rows) => {
        if (err)
            console.log(err.sqlMessage);
        else{
            console.log("Vraca",rows)
            termin=rows[0];}
    });
    
    termin.slobodno++;
    
    query = "update termin set dan=?, sati_od=?, sati_do=?, trenigId=?, masazaId=?, slobodno=? where id=?";
    formated = mysql.format(query, [termin.dan, termin.sati_od, termin.sati_do, termin.treningId, termin.masazaId, termin.slobodno]);

    pool.query(formated, (err, response) => {
        if (err)
            res.status(500).send(err.sqlMessage);
        else {
            query = 'select * from termin where id=?';
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

//Get one user
export var getOneTreningLocal = (id) => {
    let query = 'select * from trening where id=?';
    let formated = mysql.format(query, [id]);
    let trening={}

    pool.query(formated, (err, rows) => {
        if (err)
            //res.status(500).send(err.sqlMessage);
            console.log("Error", err)
        else
            trening = rows[0];
            console.log(trening);
            return trening;
    });
}

//Resetuj slobodno
export const resetSlobodno = () => {

    // let query='select kapacitet from prostorija where id=(select prostorijaId from trening) where id=(select treningId from termin))'
    // let formated=mysql.format(query)

    // pool.query(formated, (err, rows) => {
    //     if (err)
    //         console.log(err)
    //     else {
    //         console.log(rows)
    //     }

    // });
    let termini = []
    let query = 'select * from termin where treningId';
    let formated = mysql.format(query);
    
    let slobodno=0;

    pool.query(formated, (err, rows) => {
        if (err)
            console.log(err.sqlMessage);
        else{
           
            termini = rows}
        
        termini.forEach(termin => {
            console.log(termin)
            
            query= 'select kapacitet from prostorija where id=(select prostorijaId from trening where id=?)';
            formated=mysql.format(query,[termin.treningId])

            pool.query(formated,(err,rows) => {
                if (err)
                    console.log(err)
                else{

                    // console.log(rows[0])
                    slobodno=rows[0].kapacitet;
      
                    console.log(slobodno)

                    query = "update termin set dan=?, sati_od=?, sati_do=?, treningId=?, masazaId=?, slobodna=? where id=?";
                    formated=mysql.format(query, [termin.dan, termin.sati_od, termin.sati_do, termin.treningId, termin.masazaId, slobodno, termin.id]);

                    console.log(formated)
                    pool.query(formated, (err, res) => {
                        if (err)
                            console.log(err)
                        else
                            console.log("zavrsio reset")

                    })
                }
            })
        });
    });

    query = 'select * from termin where masazaId';
            formated = mysql.format(query);
        
            pool.query(formated, (err, rows) => {
                if (err)
                    console.log(err.sqlMessage);
                else{
                   
                    termini = rows}
                
                termini.forEach(termin => {
                    console.log(termin)
                    
                    query= 'select kapacitet from prostorija where id=(select prostorijaId from masaza where id=?)';
                    formated=mysql.format(query,[termin.masazaId])
        
                    pool.query(formated,(err,rows) => {
                        if (err)
                            console.log(err)
                        else{
        
                            // console.log(rows[0])
                            slobodno=rows[0].kapacitet;
              
                            console.log(slobodno)
        
                            query = "update termin set dan=?, sati_od=?, sati_do=?, treningId=?, masazaId=?, slobodna=? where id=?";
                            formated=mysql.format(query, [termin.dan, termin.sati_od, termin.sati_do, termin.treningId, termin.masazaId, slobodno, termin.id]);
        
                            console.log(formated)
                            pool.query(formated, (err, res) => {
                                if (err)
                                    console.log(err)
                                else
                                    console.log("zavrsio reset")
        
                            })
        
        
        
        
        
                        }
                    })
                })
            })

}