import React, { useState, useEffect } from "react";
import "./TaskSubmission.css";
import { Button, Divider, Modal, Typography } from "@mui/material";
import { apiGeneral } from "../../utils/urls";
import { bgcolor, Box } from "@mui/system";

const TaskSubmission = () => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [previousSubmissions, setPreviousSubmissions] = useState([]);
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false); // State to manage modal visibility
  const [modalMessage, setModalMessage] = useState(""); // State to manage modal message

  useEffect(() => {
    const getPreviousSubmittedFiles = async () => {
      try {
        const response = await fetch(`${apiGeneral.submissions}`);
        if (response.ok) {
          const data = await response.json();
          setPreviousSubmissions(data.data);
        } else {
          console.error(
            "Failed to fetch previous submissions:",
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error fetching previous submissions:", error);
      }
    };

    getPreviousSubmittedFiles();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("title", taskTitle);
      formData.append("description", taskDescription);
      formData.append("userId", localStorage.getItem("user_id"));

      try {
        const response = await fetch("http://localhost:8000/files/upload", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          setUrl(data.fileUrl);
          setModalMessage("File uploaded and submission saved successfully!");
          setOpen(true);
          setPreviousSubmissions((prevSubmissions) => [
            ...prevSubmissions,
            data.submission,
          ]);
        } else {
          console.error("Upload failed:", response.statusText);
          setError("Upload failed. Please try again.");
        }
      } catch (error) {
        console.error("Error uploading file:", error);
        setError("An error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handlePdfOpen = (file) => {
    window.open(file, "_blank", "noreferrer");
  };

  const handleCloseModal = () => setOpen(false);

  return (
    <div className="task-submission-container">
      <form className="task-submission-form" onSubmit={handleSubmit}>
        <h2>Submit Your Task</h2>
        <input
          type="text"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          placeholder="Task Title"
          required
        />
        <textarea
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          placeholder="Task Description"
          required
        />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Task"}
        </button>
      </form>
      <Divider />
      <div className="previous-submissions">
        <h3>Previous Submissions</h3>
        <div className="submissions-grid">
          {previousSubmissions.length === 0 ? (
            <p>No previous submissions</p>
          ) : (
            previousSubmissions.map((task) => (
              <div
                className="submission-item"
                key={task._id}
                onClick={() => handlePdfOpen(task.file)}
              >
                <div className="submission-preview">
                  {task.contentType?.includes("image") ? (
                    <img
                      src={task.file}
                      alt="Preview"
                      className="preview-image"
                    />
                  ) : (
                    <span>📄</span>
                  )}
                </div>
                <div className="submission-info">
                  <h4>{task.title}</h4>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      {/* Modal Component */}
      <Modal
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-title" variant="h6" component="h2">
            Success
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            {modalMessage}
          </Typography>
          <Button
            onClick={handleCloseModal}
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Close
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  border: "2px solid #000",
  bgcolor: "white",
  boxShadow: 24,
  p: 4,
};

export default TaskSubmission;
