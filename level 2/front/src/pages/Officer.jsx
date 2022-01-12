import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Officer() {
  const [dense, setDense] = useState(false);
  const [secondary, setSecondary] = useState(false);

  const [onWaiting, setOnWaiting] = useState(false);
  const [onProgress, setOnProgress] = useState(false);
  const [onResolve, setOnResolve] = useState(false);

  const [waiting, setWaiting] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [resolved, setResolved] = useState([]);

  console.log(waiting);
  console.log(inProgress);
  console.log(resolved);

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
  return (
    <div className="page">
      <h1 className="title">Strasbourg Police Bike Dept.</h1>
      <div className="container">
        <div className="sub-container"></div>
        <button onClick={displayOnProgress}>
          Dossiers en cours de traitement
        </button>
        <button onClick={displayOnWaiting}>
          Dossiers en attente de traitement
        </button>
        <button onClick={displayOnResolved}>Dossiers résolues</button>
        {onWaiting ? (
          <List dense={dense}>
            {waiting.map((numDossier) => (
              <ListItem
                secondaryAction={
                  <IconButton edge="end" aria-label="delete">
                    <DeleteIcon />
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
          <List dense={dense}>
            {inProgress.map((numDossier) => (
              <ListItem
                secondaryAction={
                  <IconButton edge="end" aria-label="delete">
                    <DeleteIcon />
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
          <List dense={dense}>
            {resolved.map((numDossier) => (
              <ListItem
                secondaryAction={
                  <IconButton edge="end" aria-label="delete">
                    <DeleteIcon />
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
  );
}
