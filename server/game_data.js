module.exports = {
    "creatures" : {
        "bobby": {
            "name": "bobby",
            "moves": ["rock_slide", "water_splash"],
            "attack": 10,
            "defense": 5,
            "hp": 100,
            "speed": 12
        },
        "erik":{
            "name": "erik",
            "moves": ["rock_slide", "water_splash", "buff"],
            "attack": 5,
            "defense": 10,
            "hp": 100,
            "speed": 10
        },
        "lisa":{
            "name": "lisa",
            "moves": ["rock_slide", "water_splash", "buff"],
            "attack": 5,
            "defense": 10,
            "hp": 100,
            "speed": 10
        },
        "greg":{
            "name": "greg",
            "moves": ["rock_slide", "water_splash", "buff"],
            "attack": 5,
            "defense": 10,
            "hp": 100,
            "speed": 10
        },
        "sally":{
            "name": "sally",
            "moves": ["rock_slide", "water_splash", "buff"],
            "attack": 5,
            "defense": 10,
            "hp": 100,
            "speed": 10
        },
        "mayo":{
            "name": "mayo",
            "moves": ["rock_slide", "water_splash", "buff"],
            "attack": 5,
            "defense": 10,
            "hp": 100,
            "speed": 10
        },
        "crabs":{
            "name": "crabs",
            "moves": ["rock_slide", "water_splash", "buff"],
            "attack": 5,
            "defense": 10,
            "hp": 100,
            "speed": 10
        },
        "jr":{
            "name": "jr",
            "moves": ["rock_slide", "water_splash", "buff"],
            "attack": 5,
            "defense": 10,
            "hp": 100,
            "speed": 10
        },
        "raspy":{
            "name": "raspy",
            "moves": ["rock_slide", "water_splash", "buff"],
            "attack": 5,
            "defense": 10,
            "hp": 100,
            "speed": 10
        },
        "domino":{
            "name": "domino",
            "moves": ["rock_slide", "water_splash", "buff"],
            "attack": 5,
            "defense": 10,
            "hp": 100,
            "speed": 10
        }
    },
    "moves": {
        "rock_slide" : {
            "display_name": "rock slide",
            "turn": 3,
            "effect": {"hp": -10, "targetEnemy": true}
        },
        "water_splash" : {
            "display_name": "water splash",
            "turn": 10,
            "effect": {"hp": -10, "targetEnemy": true}
        },
        "buff" : {
            "display_name": "buff",
            "turn": 10,
            "effect": {"attack": 10, "targetEnemy": false}
        },
        "gaurd" : {
            "display_name": "gaurd",
            "turn": 10,
            "effect": {"defense": 10, "targetEnemy": false}
        }
    }
}