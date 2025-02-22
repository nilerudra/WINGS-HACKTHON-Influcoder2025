import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import "./Explore.css";
import { domain } from "../../utils/domain";

const Explore = () => {
  const [openPopup, setOpenPopup] = useState(false);
  const [selectedPod, setSelectedPod] = useState(null);
  const [requestMessage, setRequestMessage] = useState("");
  const [pods, setPods] = useState([]);

  useEffect(() => {
    const fetchPods = async () => {
      try {
        const response = await axios.get(
          `${domain}/create/get-pods?is_public=true`
        );
        setPods(response.data);
      } catch (error) {
        console.error("Error fetching pods:", error);
      }
    };

    fetchPods();
  }, []);

  const handleOpenPopup = (pod) => {
    setSelectedPod(pod);
    setOpenPopup(true);
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
    setSelectedPod(null);
    setRequestMessage("");
  };

  const handleSendRequest = async () => {
    if (!selectedPod) return;

    console.log(selectedPod);

    console.log(
      "userId:",
      localStorage.getItem("user_id"),
      "podId:",
      selectedPod._id,
      "podAdminId:",
      selectedPod.created_by,
      "message:",
      requestMessage
    );

    try {
      const response = await axios.post(`${domain}/notification/create`, {
        userId: localStorage.getItem("user_id"),
        podId: selectedPod._id,
        podAdminId: selectedPod.created_by,
        message: requestMessage,
      });

      alert(
        `Request sent to join "${selectedPod.pod_name}" pod with message: "${requestMessage}"`
      );

      handleClosePopup();
    } catch (error) {
      console.error(
        "Error sending request:",
        error.response?.data || error.message
      );

      // console.error("Error sending request:", error);
      alert("Failed to send request. Please try again.");
    }
  };

  return (
    <div className="explore-container">
      <h2>Explore Pods</h2>
      <div className="pods-grid">
        {pods.map((pod) => (
          <div className="pod-card" key={pod.id}>
            <h3>{pod.pod_name}</h3>
            <p className="description">{pod.pod_description}</p>
            <button onClick={() => handleOpenPopup(pod)}>Join Pod</button>
          </div>
        ))}
      </div>

      {/* Modal for joining request */}
      <Dialog
        open={openPopup}
        onClose={handleClosePopup}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Join {selectedPod?.name}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Message"
            type="text"
            fullWidth
            variant="outlined"
            value={requestMessage}
            onChange={(e) => setRequestMessage(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePopup} color="black">
            Cancel
          </Button>
          <Button onClick={handleSendRequest} color="black">
            Request
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Explore;
