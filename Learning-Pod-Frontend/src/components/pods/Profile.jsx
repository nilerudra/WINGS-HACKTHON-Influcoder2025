import React from "react";
import { Avatar } from "@mui/material";

export default function Profile({
  isOpen,
  onClose,
  photo,
  name,
  description,
  files,
  links,
}) {
  if (!isOpen) return null;

  const styles = {
    overlay: {
      position: "fixed",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: 1000,
    },
    popup: {
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#35404d",
      padding: "20px",
      borderRadius: "8px",
      zIndex: 1001,
      width: "90%",
      maxWidth: "400px",
      color: "#fff",
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    closeButton: {
      position: "absolute",
      top: "0px",
      right: "0px",
      background: "none",
      border: "none",
      color: "#fff",
      fontSize: "1.5rem",
      cursor: "pointer",
    },
    profileSectionImage: {
      width: "100px",
      height: "100px",
      marginBottom: "15px",
      justifyContent: "center",
    },
    profileName: {
      fontSize: "1.5rem",
      fontWeight: "bold",
      marginBottom: "10px",
    },
    profileDescription: {
      fontSize: "1rem",
      marginBottom: "15px",
    },
    fileLinkStyle: {
      display: "flex",
      flexDirection: "row",
      gap: "30px",
    },
    filesSection: {
      width: "100%",
      display: "flex",
      padding: "10px",
      fontSize: "1rem",
      margin: "0 auto",
      maxWidth: "100px",
      marginTop: "15px",
      cursor: "pointer",
      borderRadius: "8px",
      alignItems: "center",
      flexDirection: "column",
      justifyContent: "center",
      border: "2px solid #fff",
      boxSizing: "border-box",
    },
    filesIcon: {
      fontSize: "1.5rem",
      marginBottom: "5px",
      color: "#93b1a6",
    },

    linksSection: {
      width: "100%",
      display: "flex",
      padding: "10px",
      fontSize: "1rem",
      margin: "0 auto",
      maxWidth: "100px",
      marginTop: "15px",
      cursor: "pointer",
      borderRadius: "8px",
      alignItems: "center",
      flexDirection: "column",
      justifyContent: "center",
      border: "2px solid #fff",
      boxSizing: "border-box",
    },
    linksIcon: {
      color: "#93b1a6",
      fontSize: "1.5rem",
      marginBottom: "5px",
    },
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.popup}>
        <button onClick={onClose} style={styles.closeButton}>
          x
        </button>
        <Avatar
          src={photo}
          alt="Pod Profile"
          style={styles.profileSectionImage}
        />
        <h4 style={styles.profileName}>{name}</h4>
        <br />
        <p style={styles.profileDescription}>{description}</p>
        <div className="files-links" style={styles.fileLinkStyle}>
          <div style={styles.filesSection}>
            <i className="fa fa-folder" style={styles.filesIcon}></i>
            <span>{files} files</span>
          </div>
          <div style={styles.linksSection}>
            <i className="fa fa-link" style={styles.linksIcon}></i>
            <span>{links} links</span>
          </div>
        </div>
      </div>
    </div>
  );
}
