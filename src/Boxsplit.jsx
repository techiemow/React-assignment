import React, { useState } from 'react';

const Square = ({ size, onReset }) => {
  const [isSplit, setIsSplit] = useState(false); // Track whether the square is split

  // Toggle split on click
  const handleClick = () => {
    setIsSplit(true);
  };

  // Handle restart by resetting the split state
  const handleRestart = () => {
    setIsSplit(false);
    if (onReset) onReset(); // Notify parent if needed
  };

  return (
    <div
      style={{
        width: size,
        height: size,
        display: 'flex',
        flexWrap: 'wrap',
        position: 'relative',
      }}
      onClick={handleClick}
    >
      {isSplit ? (
        // Render four smaller squares when split
        <>
          <Square size={size / 2} onReset={handleRestart} />
          <Square size={size / 2} onReset={handleRestart} />
          <Square size={size / 2} onReset={handleRestart} />
          <Square size={size / 2} onReset={handleRestart} />
        </>
      ) : (
        // Render the initial square (unsplit)
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'lightblue',
            border: '1px solid #000',
          }}
        ></div>
      )}
    </div>
  );
};

const BoxSplit = () => {
  const initialSize = 400; // Initial size of the largest square
  const [resetKey, setResetKey] = useState(0); // Key to force reset

  // Function to reset the BoxSplit
  const handleRestart = () => {
    setResetKey(prevKey => prevKey + 1); // Change key to re-render from the start
  };

  return (
    <div
      style={{
        width: initialSize,
        height: initialSize,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '50px auto',
        border: '1px solid #000',
      }}
    >
      {/* Use key to force re-mount the Square component */}
      <Square key={resetKey} size={initialSize} />




      <button
        onClick={handleRestart}
        style={{
          position: 'absolute',
          bottom: '20px',
          backgroundColor: 'lightgreen',
          padding: '10px',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Restart
      </button>
    
    </div>
  );
};

export default BoxSplit;
