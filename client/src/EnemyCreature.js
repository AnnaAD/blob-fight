import logo from './logo.svg';
import game_data from "./game_data.json";
import './App.css';
import CreatureImg from './CreatureImage';

function EnemyCreature(props) {



  return (
    <div className="Creature">
        <CreatureImg name = {props.data.name} right = {true} game_data = {props.data}/>
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
    </div>
  );
}

export default EnemyCreature;
