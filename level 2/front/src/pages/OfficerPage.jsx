import React, { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";
import "./officer-page.css";
import Checkbox from "@mui/material/Checkbox";
import ArchiveIcon from "@mui/icons-material/Archive";

export default function OfficerPage() {
  const [waiting, setWaiting] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [resolved, setResolved] = useState([]);
  const [current, setCurrent] = useState(false);
  const [proceeding, setProceeding] = useState(false);
  const [archive, setArchive] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3001/report/waiting")
      .then((reponse) => reponse.json())
      .then((result) => {
        setWaiting(result);
      });
    fetch("http://localhost:3001/report/inProgress")
      .then((reponse) => reponse.json())
      .then((result) => {
        setInProgress(result);
      });
    fetch("http://localhost:3001/report/resolved")
      .then((reponse) => reponse.json())
      .then((result) => {
        setResolved(result);
      });
  }, []);

  console.log(waiting, inProgress, resolved);

  function handleArchive(id) {
    const putMethod = {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
    };
    fetch(`http://localhost:3001/report/${id}`, putMethod)
      .then((response) => response.json())
      .then(() =>
        fetch("http://localhost:3001/report/inProgress")
          .then((reponse) => reponse.json())
          .then((result) => {
            setInProgress(result);
          })
      )
      .catch((err) => console.log(err));
  }

  return (
    <div className="page">
      <h1 className="title">Strasbourg Police Bike Dept.</h1>
      <div className="container">
        <div className="sub-container">
          <h2 className="subtitle">Menu</h2>
          <p>Sélectionner une option</p>
          <ul>
            <li>Vélos volés</li>
            <li>
              Affaires en attente{" "}
              <Checkbox
                onChange={(e) => setCurrent(!current)}
                inputProps={{ "aria-label": "controlled" }}
              />
            </li>
            <li>
              Affaires en cours{" "}
              <Checkbox
                onChange={(e) => setProceeding(!proceeding)}
                inputProps={{ "aria-label": "controlled" }}
              />
            </li>
            <li>
              Affaires terminées{" "}
              <Checkbox
                onChange={(e) => setArchive(!archive)}
                inputProps={{ "aria-label": "controlled" }}
              />
            </li>
          </ul>
        </div>

        <div className="sub-container">
          {current ? (
            <List>
              {waiting.map((report) => (
                <ListItem
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete"></IconButton>
                  }
                >
                  <ListItemAvatar>
                    <Avatar>
                      <FolderIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={report.serial_number}
                    secondary="en attente"
                  />
                </ListItem>
              ))}
            </List>
          ) : null}
          {proceeding ? (
            <List>
              {inProgress.map((report) => (
                <ListItem
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="archive"
                      onClick={() => handleArchive(report.reportId)}
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
                    primary={report.serial_number}
                    secondary={`en cours par l'officier matricule n°${report.officerId}`}
                  />
                </ListItem>
              ))}
            </List>
          ) : null}
          {archive ? (
            <List>
              {resolved.map((report) => (
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
                    primary={report.serial_number}
                    secondary="archivée"
                  />
                </ListItem>
              ))}
            </List>
          ) : null}
        </div>
      </div>
    </div>
  );
}
