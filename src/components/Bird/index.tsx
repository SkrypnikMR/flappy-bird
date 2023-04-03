import { useState, useEffect } from "react";
import { Position } from "../../types";

import flapyBirdIcon from "../../assets/flappy-bird.png";

interface BirdProps {
  position: Position;
  gravity: number;
  jumpPower: number;
  onJump: () => void;
}

const Bird: React.FC<BirdProps> = ({
  position,
  gravity,
  jumpPower,
  onJump,
}) => {
  const [velocity, setVelocity] = useState(0);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === " ") {
        e.preventDefault();
        onJump();
        setVelocity(-jumpPower);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [jumpPower, onJump]);

  useEffect(() => {
    const interval = setInterval(() => {
      setVelocity((v) => v + gravity);
      position.y += velocity;
    }, 20);

    return () => clearInterval(interval);
  }, [gravity, position, velocity]);

  return (
    <img
      src={flapyBirdIcon}
      alt="flappy-bird"
      style={{
        position: "absolute",
        top: position.y,
        left: position.x,
        width: "30px",
        height: "30px",
      }}
    />
  );
};

export default Bird;
