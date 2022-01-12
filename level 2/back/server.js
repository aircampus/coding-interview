const express = require("express");
const app = express();
const cors = require("cors");
require("./config/db-config");

const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

const { db } = require("./config/db-config");

app.get("/", (req, res) => {
  res.send("hello world");
});

//=== Signalement d'un vol
app.post("/report", (req, res) => {
  if (req.body == null || req.body == undefined) {
    res.status(400).send("Merci de compléter tous les champs");
  }
  const { firstname, lastname, email, adress, serialNumber } = req.body;
  db.query(
    "INSERT INTO bike_owner (firstname, lastname, email, adress) VALUES (?, ?, ?, ?)",
    [firstname, lastname, email, adress],
    (err, result) => {
      if (err) {
        res.status(500);
      } else {
        db.query(
          `SELECT id FROM bike_owner WHERE email="${email}"`,
          (err, result) => {
            const idOwner = result[0].id;
            if (err) {
              console.log(err);
            }
            db.query(
              "INSERT INTO bike (serial_number, id_owner) VALUES (?, ?)",
              [serialNumber, idOwner],
              (err, result) => {
                if (err) {
                  console.log(idOwner);
                  res.status(500).send("Erreur dans la demande de signalement");
                } else {
                  const idBike = result.insertId;
                  db.query(
                    "SELECT id FROM officer WHERE disponibility=1 LIMIT 1",
                    (err, resultat) => {
                      if (err) {
                        console.log(err);
                        res.status(500).send("Internal server error");
                      } else {
                        if (resultat.length == 0) {
                          //INSERER REPORT quand même
                          db.query(
                            `INSERT INTO report (status, id_bike) VALUES (1, ${idBike})`,
                            (err, result) => {
                              err ? console.log(err) : res.status(201);
                            }
                          );
                          res
                            .status(200)
                            .send(
                              "Votre dossier est en attente de prise en charge"
                            );
                        } else {
                          const idOfficer = resultat[0].id;
                          db.query(
                            `INSERT INTO report (status, id_officer, id_bike) VALUES (1, ${idOfficer}, ${idBike})`,
                            (err, result) => {
                              if (err) {
                                console.log(err);
                                res.status(500).send("Internal server error");
                              } else {
                                db.query(
                                  `
                                  UPDATE officer SET disponibility=0 WHERE id=${idOfficer}`,
                                  (err, result) => {
                                    if (err) {
                                      console.log(err);
                                      res
                                        .status(500)
                                        .send("Internal server error");
                                    } else {
                                      const postReportRequest = {
                                        firstname,
                                        lastname,
                                        email,
                                        adress,
                                        serialNumber,
                                      };
                                      res.status(201).send({
                                        message:
                                          "Dossier de signalement créé avec succès",
                                        postReportRequest,
                                      });
                                    }
                                  }
                                );
                              }
                            }
                          );
                        }
                      }
                    }
                  );
                }
              }
            );
          }
        );
      }
    }
  );
});

//=== Voir les enquêtes résolues
app.get("/report/resolved", (req, res) => {
  db.query(
    "SELECT B.serial_number, R.status, O.id AS officerId FROM bike B INNER JOIN report R ON B.id = R.id_bike INNER JOIN officer O ON O.id = R.id_officer WHERE R.status=0",
    (err, result) => {
      if (err) {
        res.status(500).send("Erreur dans la demande");
      } else {
        res.status(200).send(result);
      }
    }
  );
});
//=== Voir les enquêtes en cours
app.get("/report/inProgress", (req, res) => {
  db.query(
    "SELECT B.serial_number, R.status, O.id AS officerId FROM bike B INNER JOIN report R ON B.id = R.id_bike INNER JOIN officer O ON O.id = R.id_officer WHERE R.status=1",
    (err, result) => {
      if (err) {
        res.status(500).send("Erreur dans la demande");
      } else {
        res.status(200).send(result);
      }
    }
  );
});
//=== Voir les enquêtes en attente de prise en charge par un policier
app.get("/report/waiting", (req, res) => {
  db.query(
    "SELECT B.serial_number, R.status, R.id AS reportId FROM bike B INNER JOIN report R ON B.id = R.id_bike WHERE R.status=1 AND R.id_officer IS NULL",
    (err, result) => {
      if (err) {
        res.status(500).send("Erreur dans la demande");
      } else {
        res.status(200).send(result);
      }
    }
  );
});

// AJOUTER VELO associé

//=== Report : mise à jour du statut d'enquête
app.put("/report/:id", (req, res) => {
  const reportId = req.params.id;
  db.query(`UPDATE report SET status=0 WHERE id=${reportId}`, (err, result) => {
    if (err) {
      res.status(500).send("Erreur dans la mise à jour des données");
    } else {
      db.query(
        `SELECT id_officer FROM report R INNER JOIN officer O ON O.id=R.id_officer WHERE R.id=${reportId}`,
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            const officerId = result[0].id_officer;
            db.query(
              `UPDATE officer SET disponibility=1 WHERE id=${officerId}`,
              (err, result) => {
                if (err) {
                  res
                    .status(500)
                    .send(
                      "Erreur dans la mise à jour de la disponibilité du policier"
                    );
                } else {
                  db.query(
                    `UPDATE report SET id_officer=${officerId} WHERE status=1 AND id_officer IS NULL`,
                    (err, result) => {
                      if (err) {
                        res
                          .status(500)
                          .send(
                            "Erreur dans l'affectation du policier sur le dossier"
                          );
                      } else {
                        res.status(200).send(result);
                      }
                    }
                  );
                }
              }
            );
          }
        }
      );
    }
  });
});

//=== Officer

//=== Port
app.listen(port, (err) => {
  if (err) {
    console.error(`ERROR: ${err.message}`);
  } else {
    console.log(`Serveur fonctionnel sur le port ${port}`);
  }
});
