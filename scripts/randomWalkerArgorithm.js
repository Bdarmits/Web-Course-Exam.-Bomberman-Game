function generateMap(configOverride) {
    const config = {
        numberOfPaths: configOverride.numberOfPaths ,
        minPathLength: configOverride.minPathLength ,
        maxPathLength: configOverride.maxPathLength ,
        maxWidth: configOverride.maxWidth ,
        maxHeight: configOverride.maxHeight ,
        startPosition: configOverride.startPosition
    };

    if (config.startPosition.x < 0 || config.startPosition.x >= config.maxWidth) {config.startPosition.x =
        Math.floor(Math.random() * (config.maxWidth));}
    if (config.startPosition.y < 0 || config.startPosition.y >= config.maxHeight) {config.startPosition.y =
        Math.floor(Math.random() * (config.maxHeight ));}

    let map = [];
    for (let y = 0; y < config.maxHeight; y++) {
        map.push([]);
        for (let x = 0; x < config.maxWidth; x++) {map[y].push(2);}
    }

    const directions = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1]
    ];
    map[config.startPosition.y][config.startPosition.x] = 1;
    let direction;
    let lastDirection;
    let pathLength;
    for (let i = 0; i < config.numberOfPaths; i++) {
        pathLength = Math.floor(Math.random()* (config.maxPathLength + 1 -  config.minPathLength)) + config.minPathLength;
        do {
            direction = directions[Math.floor(Math.random() * (directions.length )) ];
        } while (!validatePosition(map.length, map[0], ...step(config.startPosition.x, config.startPosition.y, direction[0], direction[1])) || (lastDirection && direction === lastDirection));

        for (let j = 0; j < pathLength; j++) {
            if (!validatePosition(map.length, map[0], ...step(config.startPosition.x, config.startPosition.y, direction[0], direction[1]))) {
                break;}
            [config.startPosition.x, config.startPosition.y] = step(config.startPosition.x, config.startPosition.y, direction[0], direction[1]);
            let numToPlace = Math.floor(Math.random() * 3);
            if (numToPlace === 1 || numToPlace ===2){map[config.startPosition.y][config.startPosition.x] = 0;}
            else (map[config.startPosition.y][config.startPosition.x] = 1)

        }
        lastDirection = direction;
    }
    let itemsAdder = 0;
    while(itemsAdder < 2){
        let randomY = Math.floor(Math.random() * (12 - 1)) + 1;
        let randomX = Math.floor(Math.random() * (24 - 1)) + 1;
        if (map[randomY][randomX] === 0 && itemsAdder === 0){
            map[randomY][randomX] = 3;
            itemsAdder++;
        } else if(map[randomY][randomX] === 0 && itemsAdder === 1){
            map[randomY][randomX] = 4;
            itemsAdder++;
        }
    }
    return map;
}

function step(x, y, d0, d1) {return [x + d0, y + d1];}

function validatePosition(len, m0, x, y) {return x >= 0 && x < m0.length && y >= 0 && y < len;}
