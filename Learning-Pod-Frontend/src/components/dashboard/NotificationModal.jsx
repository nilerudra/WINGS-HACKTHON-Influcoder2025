import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  IconButton,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  Button,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

const NotificationModal = ({ open, onClose }) => {
  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;

    const fetchNotifications = async () => {
      const userId = localStorage.getItem("user_id");
      if (!userId) {
        setError("User ID is missing.");
        return;
      }

      try {
        const [adminResponse, userResponse] = await Promise.allSettled([
          axios.get(
            `https://learning-pod-backend.onrender.com/notification/admin/${userId}`
          ),
          axios.get(
            `https://learning-pod-backend.onrender.com/notification/user/${userId}`
          ),
        ]);

        let adminNotifications = [];
        let userNotifications = [];

        if (adminResponse.status === "fulfilled") {
          adminNotifications = adminResponse.value.data;
        }

        if (userResponse.status === "fulfilled") {
          userNotifications = userResponse.value.data;
        }

        const mergedNotifications = [
          ...adminNotifications,
          ...userNotifications,
        ];

        setNotifications(mergedNotifications);
        setError("");
      } catch (error) {
        setError("Error fetching notifications. Please try again.");
      }
    };

    fetchNotifications();
  }, [open]);

  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification);
    setDetailOpen(true);
  };

  const handleDetailClose = () => {
    setDetailOpen(false);
    setSelectedNotification(null);
  };

  const handleAcceptRequest = async () => {
    if (!selectedNotification) return;

    try {
      await axios.post(
        `https://learning-pod-backend.onrender.com/notification/accept-join`,
        {
          notificationId: selectedNotification._id,
        }
      );

      // Update notifications state
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification._id === selectedNotification._id
            ? { ...notification, isAccepted: true }
            : notification
        )
      );

      handleDetailClose(); // Auto-close detail modal after acceptance
    } catch (err) {
      setError("Error accepting the request. Please try again.");
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogContent style={{ position: "relative", paddingTop: "6px" }}>
          <div
            style={{
              position: "sticky",
              top: 0,
              backgroundColor: "white",
              zIndex: 1,
            }}
          >
            <IconButton
              edge="end"
              color="inherit"
              onClick={onClose}
              aria-label="close"
              style={{ position: "absolute", right: 8, top: 8 }}
            >
              <CloseIcon />
            </IconButton>
            <Typography
              variant="h6"
              style={{
                marginLeft: "6px",
                marginBottom: "6px",
                padding: "16px",
              }}
            >
              Notifications
            </Typography>
            <Divider />
          </div>

          {/* Display error if any */}
          {error && <Alert severity="error">{error}</Alert>}

          <div
            style={{ maxHeight: "400px", overflowY: "auto", padding: "0 6px" }}
          >
            <List>
              {notifications.length > 0 ? (
                notifications.map((notification, index) => (
                  <ListItem
                    button
                    key={index}
                    onClick={() => handleNotificationClick(notification)}
                    style={{ cursor: "pointer" }}
                  >
                    <ListItemText
                      primary={notification.message}
                      secondary={new Date(
                        notification.created_at
                      ).toLocaleString()}
                    />
                  </ListItem>
                ))
              ) : (
                <Typography style={{ padding: "16px", textAlign: "center" }}>
                  No notifications found.
                </Typography>
              )}
            </List>
          </div>
        </DialogContent>
      </Dialog>

      {/* Detail Modal */}
      {selectedNotification && (
        <Dialog
          open={detailOpen}
          onClose={handleDetailClose}
          maxWidth="sm"
          fullWidth
        >
          <DialogContent style={{ padding: "16px" }}>
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleDetailClose}
              aria-label="close"
              style={{ position: "absolute", right: 8, top: 8 }}
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" gutterBottom>
              Notification Details
            </Typography>
            <Typography variant="body1">
              <strong>Message:</strong> {selectedNotification.message}
            </Typography>
            <Typography variant="body2" gutterBottom>
              <strong>Pod ID:</strong> {selectedNotification.podId}
            </Typography>
            <Typography variant="body2" gutterBottom>
              <strong>Status:</strong>{" "}
              {selectedNotification.isAccepted ? "Accepted" : "Pending"}
            </Typography>
            <Typography variant="body2" gutterBottom>
              <strong>Created At:</strong>{" "}
              {new Date(selectedNotification.created_at).toLocaleString()}
            </Typography>

            {!selectedNotification.isAccepted && (
              <Button
                variant="contained"
                color="primary"
                onClick={handleAcceptRequest}
                style={{ marginTop: "16px" }}
              >
                Accept Request
              </Button>
            )}

            <Button
              variant="contained"
              color="secondary"
              onClick={handleDetailClose}
              style={{ marginTop: "16px", marginLeft: "8px" }}
            >
              Close
            </Button>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default NotificationModal;
