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
import { grey, blueGrey } from "@mui/material/colors";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";

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
            <li>
              <Checkbox
                onChange={(e) => setCurrent(!current)}
                inputProps={{ "aria-label": "controlled" }}
                sx={{
                  color: grey[100],
                  "&.Mui-checked": {
                    color: grey[100],
                  },
                }}
              />
              Affaires en attente
            </li>
            <li>
              <Checkbox
                onChange={(e) => setProceeding(!proceeding)}
                inputProps={{ "aria-label": "controlled" }}
                sx={{
                  color: grey[100],
                  "&.Mui-checked": {
                    color: grey[100],
                  },
                }}
              />
              Affaires en cours
            </li>
            <li>
              <Checkbox
                onChange={(e) => setArchive(!archive)}
                inputProps={{ "aria-label": "controlled" }}
                sx={{
                  color: grey[100],
                  "&.Mui-checked": {
                    color: grey[100],
                  },
                }}
              />
              Affaires terminées
            </li>
          </ul>
        </div>

        <div className="sub-container">
          {current ? (
            <>
              <Typography
                sx={{
                  textDecoration: "underline",
                  fontFamily: "Courier New",
                  fontSize: 16,
                }}
              >
                Liste des dossiers en attente
              </Typography>
              <List>
                {waiting.map((report) => (
                  <ListItem
                    secondaryAction={
                      <IconButton edge="end" aria-label="delete"></IconButton>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: blueGrey[300] }}>
                        <FolderIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <ListItemText>
                        <Typography sx={{ fontFamily: "Courier New", fontWeight: 'bold' }}>
                          {report.serial_number}
                        </Typography>
                      </ListItemText>
                      <ListItemText>
                        <Typography
                          sx={{ fontSize: 10, fontFamily: "Courier New" }}
                        >
                          en attente
                        </Typography>
                      </ListItemText>
                    </Box>
                  </ListItem>
                ))}
              </List>
            </>
          ) : null}
          {proceeding ? (
            <>
              <Typography
                sx={{
                  textDecoration: "underline",
                  fontFamily: "Courier New",
                  fontSize: 16,
                }}
              >
                Liste des dossiers en cours de traitement
              </Typography>
              <List>
                {inProgress.map((report) => (
                  <ListItem
                    secondaryAction={
                      <IconButton
                        edge="end"
                        aria-label="archive"
                        onClick={() => handleArchive(report.reportId)}
                      >
                        <ArchiveIcon sx={{ color: grey[100] }}/>
                      </IconButton>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: blueGrey[500] }}>
                        <FolderIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <ListItemText>
                        <Typography sx={{ fontFamily: "Courier New", fontWeight: 'bold' }}>
                          {report.serial_number}
                        </Typography>
                      </ListItemText>
                      <ListItemText>
                        <Typography
                          sx={{ fontSize: 10, fontFamily: "Courier New" }}
                        >{`en cours : par l'officier matricule n°${report.officerId}`}</Typography>
                      </ListItemText>
                    </Box>
                  </ListItem>
                ))}
              </List>
            </>
          ) : null}
          {archive ? (
            <>
              <Typography
                sx={{
                  textDecoration: "underline",
                  fontFamily: "Courier New",
                  fontSize: 16,
                }}
              >
                Liste des dossiers archivés
              </Typography>
              <List>
                {resolved.map((report) => (
                  <ListItem
                    secondaryAction={
                      <IconButton edge="end" aria-label="delete">
                        <DeleteIcon sx={{ color: grey[100] }}/>
                      </IconButton>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: blueGrey[700] }}>
                        <FolderIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <ListItemText>
                        <Typography sx={{ fontFamily: "Courier New", fontWeight: 'bold' }}>
                          {report.serial_number}
                        </Typography>
                      </ListItemText>
                      <ListItemText>
                        <Typography
                          sx={{ fontSize: 10, fontFamily: "Courier New" }}
                        >
                          archivée
                        </Typography>
                      </ListItemText>
                    </Box>
                  </ListItem>
                ))}
              </List>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
