import React, { useState } from 'react';
import { Button } from '@mui/material';
import QRCode from 'qrcode.react';
import { v4 as uuidv4 } from 'uuid';
import './Popup.css';

function Popup({ pageCount, onSubmit, onClose }) {
  const [uuid, setUuid] = useState(null);

  const handleGenerateUUID = () => {
    const newUuid = uuidv4();
    setUuid(newUuid);
  };

  return (
    <div className="popup">
      <p>Number of Pages: {pageCount}</p>
      <p>Pay: {pageCount * 1.75}</p>

      {!uuid ? (
        <Button
          variant="contained"
          color="primary"
          onClick={handleGenerateUUID}
        >
          Pay
        </Button>
      ) : (
        <div>
          <QRCode value={uuid} />
          <p>UUID: {uuid}</p>
          <Button
            variant="contained"
            color="secondary"
            onClick={onClose}
          >
            Close
          </Button>
        </div>
      )}
    </div>
  );
}

export default Popup;
