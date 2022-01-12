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

export default function OfficerPage() {
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);

  const [waiting, setWaiting] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [resolved, setResolved] = useState([]);

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

  function generate(element) {
    return [0, 1, 2].map((value) =>
      React.cloneElement(element, {
        key: value,
      })
    );
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
            <li>Affaires en cours</li>
          </ul>
        </div>
        <div className="sub-container"></div>
        <List dense={dense}>
          {generate(
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
                primary="Single-line item"
                secondary={secondary ? "Secondary text" : null}
              />
            </ListItem>
          )}
        </List>
      </div>
    </div>
  );
}
