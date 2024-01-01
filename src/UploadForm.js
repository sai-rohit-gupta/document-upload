// UploadForm.js
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import Popup from './Popup';
import { getDocument } from 'pdfjs-dist/build/pdf';  // PDF library
// import mammoth from 'mammoth'; // DOCX library
import './UploadForm.css';
import { GlobalWorkerOptions } from 'pdfjs-dist/build/pdf';


GlobalWorkerOptions.workerSrc = '/path/to/';


function UploadForm() {
  const [file, setFile] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [pageCount, setPageCount] = useState(null);

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
      countPages(acceptedFiles[0]);
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
    setPageCount(null);
  };

  const countPages = async (uploadedFile) => {
    if (uploadedFile.type === 'application/pdf') {
      const arrayBuffer = await uploadedFile.arrayBuffer();
      const pdfDocument = await getDocument(new Uint8Array(arrayBuffer)).promise;
      setPageCount(pdfDocument.numPages);
    } else if (uploadedFile.type === 'text/plain') {
      const text = await uploadedFile.text();
      const lineBreaks = text.split('\n').filter((line) => line.trim() !== '');
      setPageCount(lineBreaks.length);
    }//  else if (uploadedFile.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    //   const arrayBuffer = await uploadedFile.arrayBuffer();
    //   const text = await mammoth.extractRawText({ arrayBuffer });
    //   const paragraphs = text.split('\n').filter((line) => line.trim() !== '');
    //   setPageCount(paragraphs.length);
    // }
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
          pageCount={pageCount !== null ? pageCount : 0}
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

export default UploadForm;
