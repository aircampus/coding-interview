import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import FolderIcon from "@mui/icons-material/Folder";
import ArchiveIcon from "@mui/icons-material/Archive";
import { Typography, Checkbox } from "@mui/material";
import Divider from "@mui/material/Divider";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

export default function Officer() {
  const [dense, setDense] = useState(false);
  const [secondary, setSecondary] = useState(false);

  const [onWaiting, setOnWaiting] = useState(false);
  const [onProgress, setOnProgress] = useState(false);
  const [onResolve, setOnResolve] = useState(false);

  const [waiting, setWaiting] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [resolved, setResolved] = useState([]);

  console.log(inProgress);

  function displayOnWaiting() {
    setOnWaiting(!onWaiting);
  }

  function displayOnProgress() {
    setOnProgress(!onProgress);
  }

  function displayOnResolved() {
    setOnResolve(!onResolve);
  }

  useEffect(() => {
    fetch("http://localhost:3005/report/waiting")
      .then((reponse) => reponse.json())
      .then((result) => {
        setWaiting(result);
      });

    fetch("http://localhost:3005/report/inProgress")
      .then((reponse) => reponse.json())
      .then((result) => {
        setInProgress(result);
      });

    fetch("http://localhost:3005/report/resolved")
      .then((reponse) => reponse.json())
      .then((result) => {
        setResolved(result);
      });
  }, []);

  function handleArchive(id) {
    const putMethod = {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
    };
    fetch(`http://localhost:3005/report/${id}`, putMethod)
      .then((response) => response.json())
      .then(() =>
        fetch("http://localhost:3005/report/inProgress")
          .then((reponse) => reponse.json())
          .then((result) => {
            setInProgress(result);
          })
      )
      .catch((err) => console.log(err));
  }
  return (
    <>
      <Navbar />
      <div
        className="page"
        style={{
          width: "70%",
          margin: "0 auto",
          boxShadow: "rgb(38, 57, 77) 0px 20px 30px -10px",
          padding: "20px",
          position: "relative",
          left: "8%",
        }}
      >
        <h1 className="title">
          Service municipale des vélos volés de la ville de Strasbourg.
        </h1>
        <div className="container" style={{ padding: "5%" }}>
          <ul style={{ listStyle: "none" }}>
            <li>
              <Checkbox
                {...label}
                color="default"
                onChange={displayOnWaiting}
              />
              Dossiers en attente de traitement
            </li>
            <li>
              <Checkbox {...label} onChange={displayOnProgress} />
              Dossiers en cours de traitement
            </li>
            <li>
              <Checkbox
                {...label}
                color="success"
                onChange={displayOnResolved}
              />
              Dossiers résolues
            </li>
          </ul>
          {onWaiting ? (
            <List dense={dense} sx={{ margin: "0 auto", textAlign: "center" }}>
              <Typography variant="h5">Dossier en attente</Typography>
              {waiting.map((numDossier) => (
                <ListItem
                  secondaryAction={
                    <IconButton edge="edit" aria-label="modifier">
                      <ArchiveIcon />
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <Avatar>
                      <FolderIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={numDossier.serial_number}
                    secondary="Dossier en attente de traitement"
                  />
                </ListItem>
              ))}
            </List>
          ) : null}
          {onProgress ? (
            <List dense={dense} sx={{ margin: "0 auto", textAlign: "center" }}>
              <Typography variant="h5">Dossier en cours</Typography>
              {inProgress.map((numDossier) => (
                <ListItem
                  secondaryAction={
                    <IconButton
                      edge="edit"
                      aria-label="modifier"
                      onClick={() => handleArchive(numDossier.reportId)}
                    >
                      <ArchiveIcon />
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <Avatar>
                      <FolderIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={numDossier.serial_number}
                    secondary={`Dossier en cours de traitement par l'officier ayant le matricule ${numDossier.officer_id}`}
                  />
                </ListItem>
              ))}
            </List>
          ) : null}
          {onResolve ? (
            <List dense={dense} sx={{ margin: "0 auto", textAlign: "center" }}>
              <Typography variant="h5">Dossier résolues</Typography>
              {resolved.map((numDossier) => (
                <ListItem
                  secondaryAction={
                    <IconButton edge="archive" aria-label="modifier">
                      <ArchiveIcon />
                    </IconButton>
                  }
                  >
                  <ListItemAvatar>
                    <Avatar>
                      <FolderIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={numDossier.serial_number}
                    secondary="Dossier résolues"
                  />
                </ListItem>
              ))}
            </List>
          ) : null}
        </div>
      </div>
    </>
  );
}
