// ExportModal.jsx - Modal for exporting HTML code
import React, { useRef } from "react";

function ExportModal({ exportCode, onClose }) {
  const textareaRef = useRef(null);

  const handleTextareaClick = () => {
    textareaRef.current.select();
  };

  const handleClickOutside = (e) => {
    if (e.target.className === "modal") {
      onClose();
    }
  };

  return (
    <div className="modal" onClick={handleClickOutside}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>HTML Export</h2>
        <p>Copy the code below to use your website:</p>
        <textarea
          className="code-export"
          ref={textareaRef}
          value={exportCode}
          onClick={handleTextareaClick}
          readOnly
        />
      </div>
    </div>
  );
}

export default ExportModal;
