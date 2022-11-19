
const game_data = require("./game_data.js");
const {random_rgba, generator} = require("./render.js");

const PORT = process.env.PORT || 3001;


const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const { creatures } = require("./game_data.js");
const { NONAME } = require("dns");
const io = new Server(server);

const waiting_games = [];
const games = {};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

Object.keys(game_data.creatures).forEach(k => {
    game_data.creatures[k].color1 = random_rgba();
    game_data.creatures[k].color2 = random_rgba();
    game_data.creatures[k].path = generator();
});

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
  });

app.get("/blobs", (req, res) => {
    res.json(game_data);
});

app.get("/game", (req, res) => {
    console.log("REQ game");
    console.log(req.query.id);
    console.log("sent ", games[req.query.id]);
    res.json(games[req.query.id]);
});

app.post("/join_game", (req, res) => {
    console.log(req.body);
    game = waiting_games.pop();
    if(game) {
        var crypto = require("crypto");
        var id = crypto.randomBytes(20).toString('hex');
        console.log("found game ", game);
        games[id] = make_game(game.name, game.socket, req.body.name, req.body.socket);
        console.log("made game ", id, games[id]);
        games[id].sockets.forEach(socket => {
            io.to(socket).emit("startGame",id);
        });
        res.send(true);
    } else {
        waiting_games.push({name: req.body.name, socket: req.body.socket});
        console.log("client in lobby: ", req.body.name, req.body.socket);
        res.send(false)
    }
});

function make_game(creature1, socket1, creature2, socket2) {
    let c = {};
    console.log("making game with ", creature1, creature2);
    c[socket1] = {...game_data.creatures[creature1]};
    c[socket2] = {...game_data.creatures[creature2]};

    let move = {};
    move[socket1] = null;
    move[socket2] = null;
    return {
        turn: 0,
        log: [],
        moves: move,
        sockets: [socket1,socket2],
        creatures: {...c}
    }
}


io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
    socket.on("makeMove", (gameId, move, socketId) => {
        console.log("player made move", gameId, move, socketId);
        games[gameId].moves[socketId] = move;

        let inputtedMoves = 0;
        games[gameId].sockets.forEach((s) => {
            if(games[gameId].moves[s] != null) {
                inputtedMoves += 1;
            }
        });


        console.log(games[gameId].moves);
        console.log(inputtedMoves);
        if(inputtedMoves == games[gameId].sockets.length) {
            finishTurn(gameId);
        }
    });
});



  function finishTurn(gameId) {
    console.log("running turn...");
    let game = games[gameId];
    game.turn += 1;

    if(game.creatures[game.sockets[0]].speed < game.creatures[game.sockets[1]].speed) {
        doMove(gameId, game.sockets[0], game.sockets[1]);
        doMove(gameId, game.sockets[1], game.sockets[0]);
    } else {
        doMove(gameId, game.sockets[0], game.sockets[1]);
        doMove(gameId, game.sockets[1], game.sockets[0]);
    }

    console.log(game);
    game.sockets.forEach((s) => {
        io.to(s).emit("gameUpdate", game);
    })

  }

  function doMove(gameId, mySocketId, enemySocketId) {
    let game = games[gameId];

    let myCreature = game.creatures[mySocketId];
    let enemyCreature = game.creatures[enemySocketId];

    let move = game_data.moves[games[gameId].moves[mySocketId]];

    let target = move.effect.targetEnemy ? enemyCreature : myCreature;
    let targetSocket = move.effect.targetEnemy ? enemySocketId : mySocketId;


    Object.keys(move.effect).forEach((key) => {
        if(key != "targetEnemy") {
            game.creatures[targetSocket] = {...target, [key] : target[key] + move.effect[key]}
        }
    });

    games[gameId].log.push(myCreature.name + " performed " + move.display_name);
    
    games[gameId].moves[mySocketId] = null;
  }

 
app.get("*", (req, res) => {
res.sendFile(
    path.join(__dirname, "../client/build/index.html")
);
});

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});


