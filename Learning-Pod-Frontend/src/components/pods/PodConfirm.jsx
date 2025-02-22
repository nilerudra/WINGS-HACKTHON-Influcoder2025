import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { networkRequest } from "../../utils/network_request";
import { apiGeneral } from "../../utils/urls";
import axios from "axios";

// Custom styles for the dialog
const DialogWrapper = styled(Dialog)({
  "& .MuiPaper-root": {
    borderRadius: 8,
    padding: "24px",
    maxWidth: "500px",
  },
});

const Title = styled(DialogTitle)({
  fontWeight: "bold",
  fontSize: "1.5rem",
});

const Content = styled(DialogContent)({
  paddingTop: "16px",
  paddingBottom: "16px",
  textAlign: "center",
});

const Actions = styled(DialogActions)({
  justifyContent: "center",
  paddingTop: "16px",
});

const OptionButton = styled(Button)({
  margin: "8px",
  width: "200px",
  backgroundColor: "#2d3e54",
  color: "white",
});

const Separator = styled("div")({
  margin: "16px 0",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "&::before": {
    content: '""',
    flex: "1",
    borderBottom: "1px solid #ddd",
  },
  "&::after": {
    margin: "0 8px",
    color: "#888",
    fontWeight: "bold",
  },
});

function PodConfirm({ open, onClose, onJoin, onCreate }) {
  const [uniqueCode, setUniqueCode] = useState("");
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserId = localStorage.getItem("user_id");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const handleJoin = async () => {
    console.log("Attempting to join pod...");
    setLoading(true);
    try {
      console.log("Sending request...");
      const response = await axios.post(apiGeneral.joinPod, {
        unique_code: uniqueCode,
        user_id: userId,
      });
      console.log("Response received:", response.data);
      onClose();
    } catch (error) {
      console.error("Error joining pod:", error);
    } finally {
      console.log("Request completed.");
      setLoading(false);
    }
  };

  return (
    <DialogWrapper
      open={open}
      onClose={onClose}
      aria-labelledby="confirmation-dialog-title"
      aria-describedby="confirmation-dialog-description"
    >
      <Title id="confirmation-dialog-title">Choose an Action</Title>
      <Divider />
      <Content>
        <Typography id="confirmation-dialog-description">
          Do you want to join an existing pod or create a new one?
        </Typography>
        <Box mt={2}>
          <TextField
            label="Enter Pod Code"
            variant="outlined"
            fullWidth
            value={uniqueCode}
            onChange={(e) => setUniqueCode(e.target.value)}
            margin="normal"
          />
          <Box mt={2}>
            <OptionButton
              onClick={handleJoin}
              color="primary"
              variant="contained"
              disabled={loading}
            >
              {loading ? "Joining..." : "Join Pod"}
            </OptionButton>
            <Separator />
            <OptionButton
              onClick={() => {
                navigate("/create-pod");
                onClose();
              }}
              color="secondary"
              variant="outlined"
            >
              Create Pod
            </OptionButton>
          </Box>
        </Box>
      </Content>
      <Actions>
        <Button onClick={onClose} color="default">
          Cancel
        </Button>
      </Actions>
    </DialogWrapper>
  );
}

export default PodConfirm;
