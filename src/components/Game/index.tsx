import React, { useState, useEffect } from "react";
import Bird from "../Bird";
import Pipe from "../Pipe";
import Ground from "../Ground";
import Menu from "../Menu";
import { Position, PipeProps } from "../../types";
import { checkCollision, generatePipes } from "./utlis";

const Game: React.FC = () => {
  const [gameState, setGameState] = useState<"start" | "playing" | "gameOver">(
    "start"
  );
  const [birdPosition, setBirdPosition] = useState<Position>({ x: 50, y: 250 });
  const [pipes, setPipes] = useState<PipeProps[]>([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(
    Number(localStorage.getItem("bestScore")) ?? 0
  );

  const handleStart = () => {
    setGameState("playing");
  };

  useEffect(() => {
    if (gameState !== "playing") return;

    const interval = setInterval(() => {
      // Убедитесь, что массив труб не является пустым или undefined
      if (pipes && pipes.length > 0) {
        setPipes((pipes) =>
          pipes.map((pipe) => ({
            ...pipe,
            position: { ...pipe.position, x: pipe.position.x - 5 },
          }))
        );

        if (checkCollision(birdPosition, pipes)) {
          setGameState("gameOver");
          setPipes([]);
          setBirdPosition({ x: 50, y: 250 });

          const prevBestScore = localStorage.getItem("bestScore");

          if (prevBestScore && score > Number(prevBestScore)) {
            setBestScore(score);
            localStorage.setItem("bestScore", score.toString());
          } else {
            setBestScore(score);
            localStorage.setItem("bestScore", score.toString());
          }
        } else {
          // Создание новых труб
          if (pipes[pipes.length - 1].position.x <= 1000) {
            setPipes((pipes) => {
              const firstPipe = generatePipes(
                pipes[pipes.length - 1].position.x
              );
              const secondPipe = generatePipes(firstPipe.position.x);
              const thirdPipe = generatePipes(secondPipe.position.x);

              return [...pipes, firstPipe, secondPipe, thirdPipe];
            });
          }

          // Удаление старых труб
          if (pipes[0].position.x + 60 <= 0) {
            setPipes((pipes) => pipes.slice(1));
            setScore((score) => score + 1);
          }
        }
      } else {
        // Инициализация массива труб, если он еще не был инициализирован

        const firstPipe = generatePipes();
        const secondPipe = generatePipes(firstPipe.position.x);
        const thirdPipe = generatePipes(secondPipe.position.x);

        setPipes([firstPipe, secondPipe, thirdPipe]);
      }
    }, 10);

    return () => clearInterval(interval);
  }, [gameState, birdPosition, pipes, score]);

  return (
    <div
      className="game-container"
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {gameState === "playing" && (
        <>
          <Bird
            position={birdPosition}
            gravity={0.5}
            jumpPower={8}
            onJump={() => {}}
          />
          {pipes.map((pipe, index) => (
            <Pipe
              key={index}
              position={pipe.position}
              gapHeight={pipe.gapHeight}
            />
          ))}
          <Ground />
        </>
      )}
      {(gameState === "start" || gameState === "gameOver") && (
        <Menu onStart={handleStart} score={score} bestScore={bestScore} />
      )}
    </div>
  );
};

export default Game;
