import React, { useEffect, useRef, useState } from "react";
import {
  FaPencilAlt,
  FaEraser,
  FaUndo,
  FaRedo,
  FaTrash,
  FaSave,
} from "react-icons/fa";
import "./WhiteBoard.css";

function WhiteBoard() {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isErasing, setIsErasing] = useState(false);
  const [color, setColor] = useState("black");
  const [history, setHistory] = useState([]);
  const [currentStep, setCurrentStep] = useState(-1);
  const [image, setImage] = useState(null);
  const [imagePos, setImagePos] = useState({ x: 50, y: 50 });
  const [imageSize, setImageSize] = useState({ width: 100, height: 100 });
  const [isResizing, setIsResizing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startDragPos, setStartDragPos] = useState({ x: 0, y: 0 });
  const [draggingImagePos, setDraggingImagePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;

    context.lineCap = "round";
    context.lineWidth = 5;
    context.strokeStyle = color;
    contextRef.current = context;
  }, []);

  useEffect(() => {
    const context = contextRef.current;
    if (!isErasing) {
      context.strokeStyle = color;
    }
  }, [color, isErasing]);

  const startDrawing = ({ nativeEvent }) => {
    if (image) return;

    if (currentStep !== history.length - 1) {
      setHistory(history.slice(0, currentStep + 1));
    }
    setHistory([
      ...history,
      contextRef.current.getImageData(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      ),
    ]);
    setCurrentStep(history.length);

    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
    nativeEvent.preventDefault();
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;

    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
    nativeEvent.preventDefault();
  };

  const stopDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const selectPen = () => {
    setIsErasing(false);
    const context = contextRef.current;
    context.strokeStyle = color;
    context.lineWidth = 5;
  };

  const toggleEraser = () => {
    setIsErasing(true);
    const context = contextRef.current;
    context.strokeStyle = "white";
    context.lineWidth = 10;
  };

  const handleColorChange = (e) => {
    const newColor = e.target.value;
    setColor(newColor);
    if (!isErasing) {
      const context = contextRef.current;
      context.strokeStyle = newColor;
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    context.clearRect(0, 0, canvas.width, canvas.height);
    setHistory([]);
    setCurrentStep(-1);
  };

  const undo = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      contextRef.current.putImageData(history[currentStep - 1], 0, 0);
    }
  };

  const redo = () => {
    if (currentStep < history.length - 1) {
      setCurrentStep(currentStep + 1);
      contextRef.current.putImageData(history[currentStep + 1], 0, 0);
    }
  };

  const handleMouseDownOnImage = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    if (
      offsetX >= imagePos.x &&
      offsetX <= imagePos.x + imageSize.width &&
      offsetY >= imagePos.y &&
      offsetY <= imagePos.y + imageSize.height
    ) {
      setIsResizing(true);
      setIsDragging(true);
      setStartDragPos({ x: offsetX, y: offsetY });
      e.preventDefault();
    }
  };

  const handleMouseMove = (e) => {
    if (isResizing) {
      const { offsetX, offsetY } = e.nativeEvent;
      const newWidth = Math.min(300, Math.max(10, offsetX - imagePos.x));
      const newHeight = Math.min(300, Math.max(10, offsetY - imagePos.y));
      setImageSize({ width: newWidth, height: newHeight });
    } else if (isDragging) {
      const { offsetX, offsetY } = e.nativeEvent;
      setDraggingImagePos({
        x: draggingImagePos.x + (offsetX - startDragPos.x),
        y: draggingImagePos.y + (offsetY - startDragPos.y),
      });
      setImagePos(draggingImagePos);
      setStartDragPos({ x: offsetX, y: offsetY });
    }
  };

  const handleMouseUp = () => {
    if (isResizing || isDragging) {
      setIsResizing(false);
      setIsDragging(false);
    }
  };

  const handleSave = () => {
    const canvas = canvasRef.current;
    const confirmation = window.confirm("Are you sure you want to save this?");
    const id = localStorage.getItem("user_id");
    if (confirmation) {
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `${id}-canvas.png`;
      link.click();
    }
  };

  // const handleDrawImage = () => {
  //   if (image) {
  //     const context = contextRef.current;
  //     context.drawImage(
  //       image,
  //       imagePos.x,
  //       imagePos.y,
  //       imageSize.width,
  //       imageSize.height
  //     );
  //     setImage(null);
  //     setHistory([
  //       ...history,
  //       context.getImageData(
  //         0,
  //         0,
  //         canvasRef.current.width,
  //         canvasRef.current.height
  //       ),
  //     ]);
  //     setCurrentStep(history.length);
  //   }
  // };

  return (
    <div className="container">
      <div className="toolbar">
        <button
          className={`tool-button ${!isErasing ? "active" : ""}`}
          onClick={selectPen}
        >
          <FaPencilAlt />
        </button>
        <button
          className={`tool-button ${isErasing ? "active" : ""}`}
          onClick={toggleEraser}
        >
          <FaEraser />
        </button>
        <input
          type="color"
          className="color-picker"
          value={color}
          onChange={handleColorChange}
        />
        <button className="tool-button" onClick={undo}>
          <FaUndo />
        </button>
        <button className="tool-button" onClick={redo}>
          <FaRedo />
        </button>
        <button className="tool-button" onClick={clearCanvas}>
          <FaTrash />
        </button>
        <button className="tool-button" onClick={handleSave}>
          <FaSave />
        </button>
      </div>
      <div className="canvas-container">
        <canvas
          className={`${isErasing ? "eraser-cursor" : "pen-cursor"}`}
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
        />
        {image && (
          <div
            className="resizable-image"
            style={{
              left: `${imagePos.x}px`,
              top: `${imagePos.y}px`,
              width: `${imageSize.width}px`,
              height: `${imageSize.height}px`,
            }}
            onMouseDown={handleMouseDownOnImage}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          ></div>
        )}
      </div>
    </div>
  );
}

export default WhiteBoard;
