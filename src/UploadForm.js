// UploadForm.js
import React, { useState } from 'react';
import Popup from './Popup';
import { Button } from '@mui/material';
import './UploadForm.css';

function UploadForm() {
  const [file, setFile] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setFile(null);
  };

  return (
    <div>
      <input type="file" accept=".pdf, .docx, .txt" onChange={handleFileChange} />
      <Button variant="contained" color="primary" onClick={handleUpload}>
        Upload
      </Button>

      {showPopup && (
        <Popup
          pageCount={file ? calculatePageCount(file) : 0}
          onSubmit={handleClosePopup}
          onClose={handleClosePopup}
        />
      )}
    </div>
  );
}

function calculatePageCount(file) {
  // Implement logic to calculate page count based on file type
  // For simplicity, let's assume 10 pages for demonstration purposes
  return 10;
}

export default UploadForm;
