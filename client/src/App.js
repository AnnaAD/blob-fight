import Creature from './Creature';
import EnemyCreature from './EnemyCreature';
import './App.css';
import React, { useState } from 'react';
import game_data from "./game_data.json";
import { socket } from './socket';

function App(props) {


  const [game_data, setGameData] = useState(null);
  
  React.useEffect(() => {
    console.log('sending');
    fetch(`/game?id=${props.game}`)
      .then((res) => res.json())
      .then((game_data) => setGameData(game_data));
  }, []);

  socket.on("gameUpdate", (msg) => {
    console.log("update to game...");
    setGameData(msg);
  });

  const submitMove = (move) => {
    console.log("make move", move)
    socket.emit("makeMove", props.game, move, props.socket.id);
  };


  console.log(props.socket.id);
  if(game_data) {
    console.log(game_data.log);
    console.log(game_data.sockets);
    console.log(game_data.sockets.filter((k) => k != props.socket.id)[0]);
  }
  return (
    <>
    <h1> blob fight</h1>
    {game_data ? <>
      {game_data.log.map((l,i) => (
        <p key = {i}>{l}</p>
      ))}
    <p> Turn : {game_data.turn}</p>
    <div className="App">
      <EnemyCreature game_data = {game_data} data = {game_data.creatures[game_data.sockets.filter((k) => k != props.socket.id)[0]]}/>
      <Creature game_data = {game_data} data = {game_data.creatures[props.socket.id]} makeMove = {submitMove}/>
    </div>
    </>: "Loading..."}
   
    </>
  );
}

export default App;
