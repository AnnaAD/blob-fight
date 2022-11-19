import './App.css';
import React, { useState } from 'react';



function CreatureImg(props) {

  let game_data = props.game_data;
  if(! game_data) return (<>Loading...</>);

  console.log(game_data);
 
  return (
    <svg transform = {props.right ? "scale(-1,1)" : "scale(1,1)"} width = "200px" height = "200px" id="sw-js-blob-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" version="1.1">
      <defs>                         
        <linearGradient id={"sw-gradient"+props.name} x1="0" x2="1" y1="1" y2="0"> 
        <stop id="stop1" stopColor={game_data.color1} offset="0%"></stop>  
        <stop id="stop2" stopColor={game_data.color2} offset="100%"></stop>
        </linearGradient>
      </defs>                
      <path fill={"url(#sw-gradient"+props.name+")"} d={game_data.path.path} transform="translate(50 50)" strokeWidth="1" stroke="black"></path>
      <circle cx="30" cy="40" r="5" stroke="black" stroke-width="1" fill="white" />
      <circle cx="50" cy="40" r="5" stroke="black" stroke-width="1" fill="white" />
      <circle cx="28" cy="40" r="2" stroke="black" stroke-width="1" fill="black" />
      <circle cx="48" cy="40" r="2" stroke="black" stroke-width="1" fill="black" />

  </svg>
  );
}

export default CreatureImg;
