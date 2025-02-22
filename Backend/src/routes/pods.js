const express = require("express");
const router = express.Router();
const Pod = require("../models/pods");
const mongoose = require("mongoose");
const User = require("../models/users");

router.post("/", async (req, res) => {
  try {
    const {
      pod_name,
      pod_description,
      is_public,
      created_by,
      members,
      resources,
    } = req.body;

    if (!mongoose.Types.ObjectId.isValid(created_by)) {
      return res
        .status(400)
        .json({ message: "Invalid user ID format for creator" });
    }

    for (const member of members) {
      if (!mongoose.Types.ObjectId.isValid(member.user_id)) {
        return res
          .status(400)
          .json({ message: "Invalid user ID format in members" });
      }
    }

    const pod = new Pod({
      pod_name,
      pod_description,
      is_public,
      created_by,
      unique_code: Math.random().toString(36).substr(2, 8),
      members,
      resources,
    });

    const savedPod = await pod.save();
    res.status(201).json(savedPod);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating pod", error: error.message });
  }
});

router.get("/get-pods", async (req, res) => {
  try {
    const isPublic = req.query.is_public === "true";
    const pods = await Pod.find(isPublic ? { is_public: true } : {});
    res.status(200).json(pods);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching pods", error: error.message });
  }
});

router.get("/get-resource/:id", async (req, res) => {
  try {
    const podId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(podId)) {
      return res.status(400).json({ message: "Invalid pod ID format" });
    }

    const pod = await Pod.findById(podId);

    if (!pod) {
      return res.status(404).json({ message: "Pod not found" });
    }

    res.status(200).json(pod);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching pod", error: error.message });
  }
});

router.get("/userPods/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    const pods = await Pod.find({
      "members.user_id": new mongoose.Types.ObjectId(userId),
    });

    if (pods.length > 0) {
      return res.status(200).json(pods);
    } else {
      return res.status(404).json({ message: "No pods found for this user." });
    }
  } catch (error) {
    console.error("Error fetching pods:", error);
    return res.status(500).json({ message: "Server error. Please try again." });
  }
});

router.get("/user-role/:id", async (req, res) => {
  console.log("working");
  try {
    const userId = req.params.id;
    console.log(userId);

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    const user = await User.findById(userId).select("role");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ role: user.role });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user role", error: error.message });
  }
});

module.exports = router;
