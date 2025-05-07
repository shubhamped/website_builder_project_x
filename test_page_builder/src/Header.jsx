// Header.jsx - Header component with action buttons
import React from "react";

function Header({ onSave, onExport, onClear }) {
  return (
    <div className="header">
      <h1>GrapeJS React Website Builder</h1>
      <div className="header-actions">
        <button onClick={onSave}>Save</button>
        <button onClick={onExport}>Export HTML</button>
        <button onClick={onClear}>Clear</button>
      </div>
    </div>
  );
}

export default Header;
