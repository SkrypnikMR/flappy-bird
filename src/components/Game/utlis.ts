import { Position, PipeProps } from "../../types";


export const generatePipes = (x?: number) => {
    const pipeGapHeight = 150;
    const pipePositionX = x? 600 + x : 600;
    const pipePositionY = Math.floor(Math.random() * (250 - 50 + 1)) + 50;
    return { position: { x: pipePositionX, y: pipePositionY }, gapHeight: pipeGapHeight };
  };

export const checkCollision = (birdPosition: Position, pipes: PipeProps[]): boolean => {
    const birdWidth = 30;
    const birdHeight = 30;
    const pipeWidth = 60;

    for (const pipe of pipes) {
      const { position, gapHeight } = pipe;

  
      if (
        (birdPosition.x + birdWidth > position.x && birdPosition.x < position.x + pipeWidth) &&
        (birdPosition.y <= position.y || birdPosition.y + birdHeight >= position.y + gapHeight)
      ) {
        return true;
      }
    }
  
    // Проверка столкновения с землей
    if (birdPosition.y + birdHeight >= 800) {
      return true;
    }
  
    return false;
  };

