import logo from './logo.svg';
import game_data from "./game_data.json";
import './App.css';
import CreatureImg from './CreatureImage';

function Creature(props) {

  // console.log(props);
  // console.log(game_data);
  // console.log(game_data.creatures[props.name]);
  console.log(props.data);

  return (
    <div className="Creature">
        <CreatureImg name = {props.data.name} game_data = {props.data}/>
        <h2>
          {props.data.name}
        </h2>
        <p>
          hp: {props.data.hp}
        </p>
        <p>
          defense: {props.data.defense}
        </p>
        <p>
          attack: {props.data.attack}
        </p>
        <p>
          speed: {props.data.speed}
        </p> 
        {props.data.moves.map((move,i) => {
          return (<button key = {i} onClick = {() => {props.makeMove(move)}}>{game_data.moves[move].display_name} {game_data.moves[move].pp}</button>);
        })}   
    </div>
  );
}

export default Creature;
