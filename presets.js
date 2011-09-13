var GameOfLifePresets = { };
    
GameOfLifePresets.Blinker = {
    sizeX: 5,
    sizeY: 5,
    setup: [[1, 2], [2, 2], [3, 2]]
};


GameOfLifePresets.Clock = {
    sizeX: 6,
    sizeY: 6,
    setup: [[1, 2], [2, 2], [3, 1], [2, 4], [3, 3], [4, 3]]
};


GameOfLifePresets.Glider = {
    sizeX: 30,
    sizeY: 30,
    setup: [[1, 0], [2, 1], [0, 2], [1, 2], [2, 2]]
};


GameOfLifePresets.LightWeightSpaceShip = {
    sizeX: 30,
    sizeY: 12,
    setup: [[0, 5], [0, 7], [1, 4], [2, 4], [3, 4], [4, 4], [5, 4], [6, 4],
            [6, 5], [6, 6], [5, 7], [2, 8], [3, 8]]
};
