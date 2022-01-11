const express = require('express');
const app = express();
const port = process.env.PORT || 3005;
const db = require('./config/db_config');
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.get('/', (req,res) => {
    res.status(200).send("Hello");
})

/*
Requete pour crée un dossier de signalement d'un vol de vélo et qui attribut un dossier à un policier si celui-ci n'a pas de dossier
en cours.
*/
app.post('/report', (req, res) => {
    if(req.body === null || req.body === undefined)
        res.status(400).send("Veuillez saisir la totalité des champs.")
    const { firstname, lastname, adress, email, serialNumber } = req.body;
    db.query(
        `INSERT INTO bike_owner (firstname, lastname, adress, email) VALUES (?, ?, ?, ?)`,
        [firstname, lastname, adress, email],
        (error, result) => {
            if(error){
                console.log(error)
                res.status(500).send("Erreur lors de l'enregistrement des informations dans la BDD")
            }
            else {
                db.query(
                    `SELECT id FROM bike_owner WHERE email="${email}"`, (err, result) => {
                        if(err)
                            console.log("ligne 81" + err);
                        const ownerId = result[0].id;
                        db.query(
                            `INSERT INTO bike (serial_number, id_owner) VALUES (?, ?)`, [serialNumber, ownerId],
                            (err, result) => {
                                if(err) {
                                    console.log("ligne 87" + err)
                                    res.status(500).send("Erreur lors de l'enregistrement des informations dans la BDD")
                                }
                                else {
                                    db.query(
                                        `SELECT id FROM officer WHERE disponibility = 1 LIMIT 1`, (err, result) => {
                                            if(err) {
                                                console.log("Error of first select : " + err)
                                                res.status(500).send("Error internal server")
                                            }
                                            else {
                                                if(result.length === 0) {
                                                    // inserer report pour crée un signalement meme si aucun policier est dispo
                                                    res.status(200).send("Votre dossier a été enregistré. Votre dossier est en attente de prise en charge");
                                                }
                                                else {
                                                    const idOfficer = result[0].id
                                                    db.query(
                                                        `INSERT INTO report (status, id_officer) VALUES (1, ${idOfficer})`,
                                                        (err, result) => {
                                                            if(err)
                                                                console.log(err)
                                                            else {
                                                                db.query(
                                                                    `UPDATE officer SET disponibility = 0 WHERE id = ${idOfficer}`,
                                                                    (err, result) => {
                                                                        if(err) {
                                                                            console.log("Error ligne 59" + err)
                                                                            res.status(500).send("Error internal server")  
                                                                        }
                                                                        else {
                                                                            const retourPostRequest = {...req.body};
                                                                            res.status(201).send({message : "Votre report a été crée avec succes", retourPostRequest})
                                                                        }
                                                                    }
                                                                )
                                                            }
                                                        }
                                                    )
                                                }
                                            }
                                        }
                                    )
                                }
                            }
                        )
                    }
                )
            }
        }
    )
});

// Voir le statut d'une enquête
app.get('/report', (req, res) => {
    db.query(
        `SELECT * FROM report`, (err, result) => {
            if(err)
                console.log(err)
            else
                res.status(200).send(result);
        }
    );
});

// Requete qui va update le statut de l'enquete puis mettre le statut du policier en charge de l'enquete à 1 (disponible)
app.put('/report/:id', (req, res) => {
    const idReport = req.params.id;
    db.query(
        `UPDATE report SET status = 0 WHERE id = ${idReport}`, (err, result) => {
            if(err)
                console.log(err);
            else
            // On recupere l'id de l'officier dont on doit changer le statut
                db.query(
                    `SELECT id_officer FROM report INNER JOIN officer ON officer.id = report.id_officer WHERE report.id = ${idReport}`,
                    (err, result) => {
                        if(err)
                            console.log(err)
                        else {
                            const idOfficer = result[0].id_officer;
                            db.query(
                                `UPDATE officer SET disponibility = 1 WHERE id = ?`, [idOfficer],
                                (err, result) => {
                                    if(err)
                                        console.log(err)
                                    else
                                        res.status(200).send(result)
                                }
                            )
                        }
                    }
                );
        }
    );
});

app.listen(port, (err) => err ? console.error(`ERROR : ${err.message}`) : console.log(`Server is listening on port ${port}`));