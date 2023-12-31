// UploadForm.js
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import Popup from './Popup';
import './UploadForm.css';

function UploadForm() {
  const [file, setFile] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    // Assuming you want to handle only the first dropped file
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }

    if (rejectedFiles.length > 0) {
      setOpenSnackbar(true);
    }
  }, []);

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    onDropRejected: () => setOpenSnackbar(true),
    accept: ['.pdf', '.docx', '.txt'],
  });

  const handleUpload = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setFile(null);
  };

  return (
    <div>
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        <span role="img" aria-label="document">
          📄
        </span>
        {file && <p>Selected document: {file.name}</p>}
        {!file && <p>Drag and drop a document here or click to select files</p>}
      </div>
      <Button
        variant="contained"
        color="primary"
        sx={{ marginTop: '10px', background: '#3498db', '&:hover': { background: '#2980b9' } }}
        onClick={handleUpload}
        disabled={!file}
      >
        Upload
      </Button>

      {showPopup && (
        <Popup
          pageCount={file ? calculatePageCount(file) : 0}
          onSubmit={handleClosePopup}
          onClose={handleClosePopup}
        />
      )}

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <MuiAlert onClose={handleSnackbarClose} severity="warning" sx={{ width: '100%' }}>
          Only PDF, DOCX, and TXT files are accepted.
        </MuiAlert>
      </Snackbar>
    </div>
  );
}

function calculatePageCount(file) {
  // Implement logic to calculate page count based on file type
  // For simplicity, let's assume 10 pages for demonstration purposes
  return 10;
}

export default UploadForm;
