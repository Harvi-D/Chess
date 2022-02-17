import { useRef, useState } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";

function UserVsCom({ boardWidth }) {
  const [game, setGame] = useState(new Chess());
  const [comTimeout, setComTimeout] = useState(undefined);
  const [orientation, setOrientation] = useState("white");
  const chessRef = useRef();

  //update the current state of the pieces on the chessboard;
  function handleBoardUpdate(modifyBoard) {
    setGame((current) => {
      const update = { ...current };
      modifyBoard(update);
      return update;
    });
  }

  //randomize non-user movements
  function handleComMove() {
    const potentialComMove = game.moves();

    //check if the game is over ? continue : return;
    if (game.game_over || game.in_draw || potentialComMove.length === 0) {
      return;
    }

    const determineMove = Math.floor(Math.random() * potentialComMove.length);

    handleBoardUpdate((game) => {
      game.move(potentialComMove[determineMove]);
    });
  }

  //update the position of pieces of the board
  function handleNewPosition(initialSpace, newSpace) {
    const currentPlacement = { ...game };
    const newMove = currentPlacement.move({
      from: initialSpace,
      to: newSpace,
      promotion: "q",
    });

    setGame(currentPlacement);

    //verify that new move is legal
    if (newMove === null) {
      return false;
    }

    //store computer-move timeout to allow users to use 'game.undo'
    const timeout = setTimeout(handleComMove, 300);
    setComTimeout(timeout);
    return true;
  }

  return (
    <div>
      <Chessboard
      id='UserVsCom'
        animationDuration={300}
        position={game.fen()}
        boardOrientation={orientation}
        onPieceDrop={handleNewPosition}
        boardWidth={boardWidth}
        ref={chessRef}
      />
      <button
        className="btn btn-warning"
        onClick={() => {
          handleBoardUpdate((game) => {
            game.reset();
          });
          clearTimeout(comTimeout);
        }}
      >
        Restart Game <span class="oi oi-reload"></span>
      </button>
      <button
        className="btn btn-secondary"
        onClick={() => {
          setOrientation((current) =>
            current === "white" ? "black" : "white"
          );
        }}
      >
        Flip <span class="oi oi-loop-square"></span>
      </button>
      <button
        className="btn btn-secondary"
        onClick={() => {
          handleBoardUpdate((game) => {
            game.undo();
          });
          clearTimeout(comTimeout);
        }}
      >
        Undo Last Move <span class="oi oi-action-undo"></span>
      </button>
    </div>
  );
}

export default UserVsCom;
