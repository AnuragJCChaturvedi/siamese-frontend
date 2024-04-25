import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const loader = () => {
  return (
    <div className="loader-bg">
      <div className="loader-track">
        <div className="loader-fill">
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
            }}
          >
            <CircularProgress color="secondary" />
          </Box>
        </div>
      </div>
    </div>
  );
};

export default loader;
