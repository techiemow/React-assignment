import React, { useState, useEffect } from 'react';

const Game = () => {
  const [grid, setGrid] = useState(Array(9).fill(null)); // 3x3 grid
  const [activeIndex, setActiveIndex] = useState(null); // Track the active box index
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60); // Game duration of 1 minute
  const [gameActive, setGameActive] = useState(false); // Game starts as inactive
  const [isPaused, setIsPaused] = useState(false); // Track paused state

  // Function to start the game
  const startGame = () => {
    setScore(0);
    setTimeLeft(60);
    setGameActive(true);
    setIsPaused(false);
    setActiveIndex(null);
  };

  // Function to pause/resume the game
  const togglePause = () => {
    setIsPaused((prev) => !prev);
  };

  // Function to stop the game
  const stopGame = () => {
    setGameActive(false);
    setIsPaused(false);
    setActiveIndex(null);
  };

  // Randomly activate a box for 1 second
  useEffect(() => {
    if (!gameActive || isPaused) return;

    const timer = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * 9);
      setActiveIndex(randomIndex);

      setTimeout(() => {
        setActiveIndex(null);
      }, 1000); // Clear active box after 1 second
    }, 1500); // Display a new keyword every 1.5 seconds

    return () => clearInterval(timer);
  }, [gameActive, isPaused]);

  // Countdown timer
  useEffect(() => {
    if (!gameActive || isPaused) return;

    const countdown = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(countdown);
          setGameActive(false);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [gameActive, isPaused]);

  // Handle box clicks
  const handleBoxClick = (index) => {
    if (!gameActive || isPaused) return;

    if (index === activeIndex) {
      setScore((prevScore) => prevScore + 5); // Award points for correct click
    } else {
      setScore((prevScore) => prevScore - 2.5); // Deduct points for incorrect click
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>Hit the Right Box Game</h2>
      <p>Time Left: {timeLeft}s</p>
      <p>Score: {score}</p>
      
      {/* Start, Pause/Resume, and Stop buttons */}
      {!gameActive && timeLeft === 60 && (
        <button onClick={startGame} style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer', marginBottom: '10px' }}>
          Start Game
        </button>
      )}
      {gameActive && (
        <>
          <button onClick={togglePause} style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer', marginRight: '10px' }}>
            {isPaused ? 'Resume' : 'Pause'}
          </button>
          <button onClick={stopGame} style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
            Stop
          </button>
        </>
      )}
      {!gameActive && timeLeft < 60 && (
        <button onClick={startGame} style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer', marginTop: '20px' }}>
          Restart Game
        </button>
      )}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 100px)',
          gridTemplateRows: 'repeat(3, 100px)',
          gap: '10px',
          justifyContent: 'center',
          marginTop: '20px'
        }}
      >
        {grid.map((_, index) => (
          <div
            key={index}
            onClick={() => handleBoxClick(index)}
            style={{
              width: '100px',
              height: '100px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: index === activeIndex ? 'lightgreen' : '#ccc',
              fontSize: '1.5rem',
              cursor: 'pointer',
              border: '1px solid #333',
            }}
          >
            {index === activeIndex ? 'Hit!' : ''}
          </div>
        ))}
      </div>
      
      {!gameActive && timeLeft < 60 && (
        <div style={{ marginTop: '20px' }}>
          <h3>Game Over</h3>
          <p>Final Score: {score}</p>
        </div>
      )}
    </div>
  );
};

export default Game;
