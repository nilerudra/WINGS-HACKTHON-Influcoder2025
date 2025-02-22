import React from "react";
import "./Slider.css";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import WorkspacesIcon from "@mui/icons-material/Workspaces";
import ExploreIcon from "@mui/icons-material/Explore";
import VideoChatIcon from "@mui/icons-material/VideoChat";
import { Tooltip } from "@mui/material";
import DrawIcon from "@mui/icons-material/Draw";
export const Slider = () => {
  return (
    <>
      <div className="slider">
        <div className="sub-slider">
          <div className="slider-item logo">
            <Link to="/dashboard">
              <img
                src="https://cdn.prod.website-files.com/634f9136f87e0b031ced1baa/63526fd4dc79f1205e5a6196_Logomark%20(1).svg"
                alt=""
              />
            </Link>
          </div>
          <Tooltip title="Home" placement="right">
            <Link to="/dashboard" className="slider-item">
              <HomeIcon />
            </Link>
          </Tooltip>
          <Tooltip title="Explore pods" placement="right">
            <Link to="/explore" className="slider-item">
              <ExploreIcon />
            </Link>
          </Tooltip>
          <Tooltip title="Pods" placement="right">
            <Link to="/pod" className="slider-item">
              <WorkspacesIcon />
            </Link>
          </Tooltip>
          <Link to="/whiteboard" className="slider-item">
            <DrawIcon />
          </Link>
        </div>
      </div>
    </>
  );
};
