import React from "react";
import { PipeProps } from "../../types";

const Pipe: React.FC<PipeProps> = ({ position, gapHeight }) => {
  const pipeWidth = 60;
  const pipeHeight = 600;

  return (
    <>
      <div
        style={{
          position: "absolute",
          top: position.y - pipeHeight,
          left: position.x,
          width: `${pipeWidth}px`,
          height: `${pipeHeight}px`,
          backgroundColor: "green",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: position.y + gapHeight,
          left: position.x,
          width: `${pipeWidth}px`,
          height: `${pipeHeight}px`,
          backgroundColor: "green",
        }}
      />
    </>
  );
};

export default Pipe;
