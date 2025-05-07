// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App

// App.jsx - Main application component
import React, { useEffect, useState, useRef } from "react";
import grapesjs from "grapesjs";
import gjsPresetWebpage from "grapesjs-preset-webpage";
import "./App.css";
import Header from "./Header";
import ExportModal from "./ExportModal";

function App() {
  const editorRef = useRef(null);
  const [editor, setEditor] = useState(null);
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportCode, setExportCode] = useState("");

  // Initialize GrapeJS
  useEffect(() => {
    if (!editor && editorRef.current) {
      const e = grapesjs.init({
        container: editorRef.current,
        plugins: [gjsPresetWebpage],
        pluginsOpts: {
          gjsPresetWebpage: {},
        },
        storageManager: {
          id: "gjs-",
          type: "local",
          autosave: true,
          autoload: true,
          stepsBeforeSave: 1,
        },
        deviceManager: {
          devices: [
            {
              name: "Desktop",
              width: "",
            },
            {
              name: "Tablet",
              width: "768px",
              widthMedia: "992px",
            },
            {
              name: "Mobile",
              width: "320px",
              widthMedia: "480px",
            },
          ],
        },
      });

      // Add default content if canvas is empty
      if (e.getComponents().length === 0) {
        e.addComponents(`
          <header style="background-color: #f8f9fa; padding: 20px; text-align: center;">
            <h1>Welcome to My Website</h1>
            <p>A beautiful site built with GrapeJS Website Builder in React</p>
          </header>
          <section style="padding: 50px 20px; text-align: center;">
            <h2>About Us</h2>
            <p>This is a sample section. Edit or replace this with your content.</p>
            <div style="display: flex; justify-content: center; gap: 20px; margin-top: 30px; flex-wrap: wrap;">
              <div style="background-color: #f1f1f1; padding: 20px; border-radius: 5px; flex: 1; min-width: 250px;">
                <h3>Feature 1</h3>
                <p>Description of feature 1</p>
              </div>
              <div style="background-color: #f1f1f1; padding: 20px; border-radius: 5px; flex: 1; min-width: 250px;">
                <h3>Feature 2</h3>
                <p>Description of feature 2</p>
              </div>
              <div style="background-color: #f1f1f1; padding: 20px; border-radius: 5px; flex: 1; min-width: 250px;">
                <h3>Feature 3</h3>
                <p>Description of feature 3</p>
              </div>
            </div>
          </section>
          <footer style="background-color: #333; color: white; padding: 20px; text-align: center;">
            <p>© 2025 My Website. All rights reserved.</p>
          </footer>
        `);
      }

      setEditor(e);
    }
  }, [editor]);

  // Handle button actions
  const handleSave = () => {
    editor.store();
    alert("Project saved successfully!");
  };

  const handleExport = () => {
    const html = editor.getHtml();
    const css = editor.getCss();

    const exportHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Website</title>
    <style>
${css}
    </style>
</head>
<body>
${html}
</body>
</html>`;

    setExportCode(exportHtml);
    setShowExportModal(true);
  };

  const handleClear = () => {
    if (
      window.confirm(
        "Are you sure you want to clear the editor? All changes will be lost."
      )
    ) {
      editor.runCommand("core:canvas-clear");
      localStorage.removeItem("gjs-components");
      localStorage.removeItem("gjs-styles");
    }
  };

  return (
    <div className="app-container">
      <Header
        onSave={handleSave}
        onExport={handleExport}
        onClear={handleClear}
      />
      <div id="gjs" ref={editorRef} className="editor-container"></div>
      {showExportModal && (
        <ExportModal
          exportCode={exportCode}
          onClose={() => setShowExportModal(false)}
        />
      )}
    </div>
  );
}

export default App;
