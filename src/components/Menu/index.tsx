import React from "react";

interface MenuProps {
  onStart: () => void;
  score: number;
  bestScore: number;
}

const Menu: React.FC<MenuProps> = ({
  onStart,
  score,
  bestScore,
}) => {
  return (
    <div
      style={{
        position: 'absolute',
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: '100vw',
        height: "100%",
      }}
    >
      <h1>Flappy Bird</h1>
      <button onClick={onStart}>Start</button>
      <p>Score: {score}</p>
      <p>Best Score: {bestScore}</p>
    </div>
  );
};

export default Menu;
