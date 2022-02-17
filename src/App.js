import React, { useEffect, useState } from "react";
import UserVsCom from "./game-type/UserVsCom";

function App() {
  //this will be used to switch between game types; currently non-functional
  //const [gameType, setGameType] = useState('UserVsCom');
  const [boardSize, setBoardSize] = useState(undefined);

  useEffect(() => {
    const handleNewSize = () => {
      const display = document.getElementsByClassName('container')[0];
      setBoardSize(display.offsetWidth - 20)
    }
    window.addEventListener('resize', handleNewSize);
    handleNewSize();
    return () => {
      window.removeEventListener('resize', handleNewSize);
    }
  }, []);

  return (
    <div className="container">
      <UserVsCom boardWidth={boardSize}/>
    </div>
  );
}

export default App;
