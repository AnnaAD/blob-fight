
import './App.css';
import React, { useState, useEffect } from 'react';
import CreatureImg from './CreatureImage';


import { socket } from './socket';

function Menu(props) {

  const [game_data, setData] = React.useState(null);
  const [waiting, setWaiting] = React.useState(false);

  
  function reqGame(name) {
    let msg = {
      "name": name,
      "socket": props.socket.id
     };
    fetch('/join_game', {
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(msg)
     }).then((res) => {
      setWaiting(res);
     })
  }

  socket.on("startGame", (msg) => {
    props.setGame(msg);
  });

  React.useEffect(() => {
    fetch("/blobs")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);


  return (
    <>
    <h1> blob fight</h1>
    <p> choose your blob</p>
    <div className="App">
      {waiting ? "Waiting for partner...." :
      <>
       {game_data ? Object.keys(game_data.creatures).map((creature) => {
          return (<button onClick = {() => {reqGame(creature)}}class = "icon">
            <CreatureImg  name = {creature} game_data = {game_data.creatures[creature]}/> <p>{creature}</p></button>);
        }) : "Loading..."}
      </>
        
      }
      
    </div>
    </>
  );
}

export default Menu;
