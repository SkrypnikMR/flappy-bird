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
        left: '45%',
        top: '0',
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
      onClick={() => {
        console.log('hehe');
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
