
import './App.css';
import React, { useState } from 'react';
import App from './App';
import Menu from './Menu'; 
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { socket } from './socket';

function Header() {

  
  const [game, setGame] = useState(null);
  const [socketRef, setSocket] = useState(null);

  socket.on("connect", () => {
    setSocket(socket);
  });

  return (
    
  game ?
   <App game = {game} socket = {socketRef}/>
   :
   <Menu game = {game} socket = {socketRef} setGame = {setGame}/>
    
  )
 
}

export default Header;
