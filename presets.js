var GameOfLifePresets = { };
    
GameOfLifePresets.blinker = {
    sizeX: 5,
    sizeY: 5,
    setup: [[1, 2], [2, 2], [3, 2]]
};


GameOfLifePresets.clock = {
    sizeX: 6,
    sizeY: 6,
    setup: [[1, 2], [2, 2], [3, 1], [2, 4], [3, 3], [4, 3]]
};


GameOfLifePresets.glider = {
    sizeX: 30,
    sizeY: 30,
    setup: [[1, 0], [2, 1], [0, 2], [1, 2], [2, 2]]
};
