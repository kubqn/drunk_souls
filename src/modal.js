import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import background from "./bonfire.jpg";
function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: "black",
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    backgroundImage: `url(${background})`,
    // backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    borderRadius: "15%",
  },
}));

export default function SimpleModal() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [customName, setCustomName] = useState();
  const [customFile, setCustomFile] = useState();

  var customSoundList = JSON.parse(localStorage.getItem("file")) || [];
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddButton = () => {
    var exist = 0;
    if (customName !== undefined && customFile !== undefined) {
      for (let i = 0; i < customSoundList.length; i++) {
        if (customSoundList[i].name === customName) {
          exist++;
        }
      }
      if (exist === 0) {
        let customFileCode = googleShareToMP3(customFile);
        console.log(customFileCode);
        customSoundList.push({
          name: customName,
          file: customFileCode === undefined ? customFile : customFileCode,
        });
        localStorage.setItem("file", JSON.stringify(customSoundList));
        window.location.reload(true);
      }
    }
  };

  const googleShareToMP3 = () => {
    var regexGoogleDrive = /drive.google.com/g;
    var regexGoogleDriveCode = /.*\/([^/]+)\/[^/]+/;
    if (regexGoogleDrive.exec(customFile)) {
      let code = regexGoogleDriveCode.exec(customFile);
      if (code !== null) {
        return `http://docs.google.com/uc?export=open&id=${code[1]}`;
      }
    }
  };
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Konfiguracja licznika</h2>
      <div className="modalAlarm">
        <label style={{ marginLeft: "30px" }}>Ilość czasu: </label>
        <input
          style={{ width: "100px", textAlign: "center", marginLeft: "30px" }}
          type="number"
          defaultValue={
            localStorage.getItem("timer") === null
              ? 120
              : localStorage.getItem("timer")
          }
          onChange={(e) => {
            localStorage.setItem("timer", e.target.value);
          }}
        ></input>
      </div>
      <div className="modalAlarm">
        <label style={{ marginLeft: "30px" }}>Czas alarmu: </label>
        <input
          style={{ width: "100px", textAlign: "center", marginLeft: "30px" }}
          type="number"
          max="120"
          defaultValue={
            localStorage.getItem("alarm") === null
              ? 5
              : localStorage.getItem("alarm")
          }
          onChange={(e) => {
            localStorage.setItem("alarm", e.target.value);
          }}
        ></input>
      </div>
      <div className="modalAlarm">
        <h2 id="simple-modal-title">Dodaj alarm</h2>
        <label style={{ color: "black" }}>Nazwa:</label>
        <input
          type="text"
          id="name"
          maxLength="20"
          onChange={(e) => {
            setCustomName(e.target.value);
          }}
        ></input>
        <label style={{ color: "black" }}>URL:</label>
        <input
          type="text"
          id="URL"
          onChange={(e) => {
            setCustomFile(e.target.value);
          }}
        ></input>
        <button className="modalButton" onClick={handleAddButton}>
          Dodaj
        </button>
      </div>

      <p></p>
      <button onClick={handleClose}>Zamknij</button>
    </div>
  );

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        Konfiguruj
      </button>
      <Modal
        open={open}
        // onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
