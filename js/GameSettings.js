//Filename Settings 
//Dient als Index zum finden aller "assets"
const ImageFiles = [
    'EnemyShip1',
    'EnemyShip2',
    'EnemyShip3',
    'miniBoss',
    'Boss',
    'Meteor1',
    'Meteor2',
    'playerShip',
    'laserRed',
    'explosion00_s',
    'explosion01_s',
    'explosion02_s',
    'explosion03_s',
    'explosion04_s',
    'explosion05_s',
    'explosion06_s',
    'explosion07_s',
    'explosion08_s'
];

const soundFiles = [
    'countdown',
    'Explosion',
    'Hit',
    'Game Over',
    'Victory',
    'Black Vortex'
];
const soundPath = '../Sounds/';

//Game Settings
//Hier sind alle festen Angaben zu machen
const GameSettings = {
//Angaben zur Steuerung, Hierfür nutze ich WASD was die gängiste Gaming Tastenbelegung darstellt
    keyPress: {
        left: 65,
        right: 68,
        up: 87,
        down: 83,
        space: 32
    },
//Gamecountdown länge
    gameStartDelay: 4000,
// Einstellung Gamespeed 60 FPS
    gameSpeed: 1000 / 60,

//Angaben zur gameArea
    gameAreaWidth: 720,
    gameAreaHeight: 576,
    gameAreaDiv: '#gameArea',
    

//Angaben was passiert wenn man getroffen wird
    playerTransparency: '0.5',
    playerFlashes: 8,
    playerInvincibilityFrames: 300,

//Player Angaben
    playerDivName: 'playerShip',
    playerStartingPosition: {
        x: 400,
        y: 400
    },
    playerStartingLives: 5,
    playerState: {
        ok: 0,
        dead: 1,
        invincible: 2
    },
    playerMoveStep: 10,

//Laser Angaben
    laserRange: 4000,
    laserFireRate: 200,
    laserTop: 10,
    laserSpeed: 700 / 1000,

//Enemy Angaben
    enemyState: {
        ready: 1,
        dead: 0,
        moving: 2
    },

    gamePhase: {
        readyToplay: 1,
        countdownToStart: 2,
        playing: 3,
        gameOver: 4
    },
    countdownGap: 700,
    countDownValues: ['2', '1', 'GO!'],
    explosionTimeout: 1000

};

//Angaben für die Unterschiedliche Ship Geschwindigkeiten
const enemySpeed = {
    slow: 125 / 1000,
    normal: 175 / 1000,
    fast: 275 / 1000,
    fastest: 450 / 1000
};

// Angaben, von wo kommt der Enemy und wohin fliegt er
const AttackPatterns = {

    //Angriffe von Oben
    ATTACKL1: [{
        rotation: 0,
        x: 60,
        y: -90,
        dir_x: 0,
        dir_y: 0
    },
    {
        rotation: 0,
        x: 60,
        y: 620,
        dir_x: 0,
        dir_y: 1
    }
    ],
    ATTACKL2: [{
        rotation: 0,
        x: 180,
        y: -90,
        dir_x: 0,
        dir_y: 0
    },
    {
        rotation: 0,
        x: 180,
        y: 620,
        dir_x: 0,
        dir_y: 1
    }
    ],
    ATTACKMIDL: [{
        rotation: 0,
        x: 300,
        y: -90,
        dir_x: 0,
        dir_y: 0
    },
    {
        rotation: 0,
        x: 300,
        y: 620,
        dir_x: 0,
        dir_y: 1
    }
    ],
    ATTACKMIDR: [{
        rotation: 0,
        x: 420,
        y: -90,
        dir_x: 0,
        dir_y: 0
    },
    {
        rotation: 0,
        x: 420,
        y: 620,
        dir_x: 0,
        dir_y: 1
    }
    ],
    ATTACKR2: [{
        rotation: 0,
        x: 540,
        y: -90,
        dir_x: 0,
        dir_y: 0
    },
    {
        rotation: 0,
        x: 540,
        y: 620,
        dir_x: 0,
        dir_y: 1
    }
    ],
    ATTACKR1: [{
        rotation: 0,
        x: 660,
        y: -90,
        dir_x: 0,
        dir_y: 0
    },
    {
        rotation: 0,
        x: 660,
        y: 620,
        dir_x: 0,
        dir_y: 1
    }
    ],
    ATTACKL1RETURN: [{
        rotation: 0,
        x: 60,
        y: -90,
        dir_x: 0,
        dir_y: 0
    },
    {
        rotation: 0,
        x: 60,
        y: 512,
        dir_x: 0,
        dir_y: 1
    }, {
        rotation: 0,
        x: 60,
        y: -90,
        dir_x: 0,
        dir_y: -1
    }
    ],
    ATTACKL2RETURN: [{
        rotation: 0,
        x: 180,
        y: -90,
        dir_x: 0,
        dir_y: 0
    },
    {
        rotation: 0,
        x: 180,
        y: 512,
        dir_x: 0,
        dir_y: 1
    }, {
        rotation: 0,
        x: 180,
        y: -90,
        dir_x: 0,
        dir_y: -1
    }
    ],

    //Angriffe von Unten

    ATTACKLBOT1: [{
        rotation: 0,
        x: 60,
        y: 620,
        dir_x: 0,
        dir_y: 0
    },
    {
        rotation: 0,
        x: 60,
        y: -90,
        dir_x: 0,
        dir_y: -1
    }
    ],
    ATTACKLBOT2: [{
        rotation: 0,
        x: 180,
        y: 620,
        dir_x: 0,
        dir_y: 0
    },
    {
        rotation: 0,
        x: 180,
        y: -90,
        dir_x: 0,
        dir_y: -1
    }
    ],
    ATTACKMIDLBOT: [{
        rotation: 0,
        x: 300,
        y: 620,
        dir_x: 0,
        dir_y: 0
    },
    {
        rotation: 0,
        x: 300,
        y: -90,
        dir_x: 0,
        dir_y: -1
    }
    ],
    ATTACKMIDRBOT: [{
        rotation: 0,
        x: 420,
        y: 620,
        dir_x: 0,
        dir_y: 0
    },
    {
        rotation: 0,
        x: 420,
        y: -90,
        dir_x: 0,
        dir_y: -1
    }
    ],
    ATTACKRBOT2: [{
        rotation: 0,
        x: 540,
        y: 620,
        dir_x: 0,
        dir_y: -1
    },
    {
        rotation: 0,
        x: 540,
        y: -90,
        dir_x: 0,
        dir_y: -1
    }
    ],
    ATTACKRBOT1: [{
        rotation: 0,
        x: 660,
        y: 620,
        dir_x: 0,
        dir_y: 0
    },
    {
        rotation: 0,
        x: 660,
        y: -90,
        dir_x: 0,
        dir_y: -1
    }
    ],

    //Angriffe von den Seiten
    LEFTRIGHTBOT: [{
        rotation: 0,
        x: 0,
        y: 420,
        dir_x: 1,
        dir_y: 0
    },
    {
        rotation: 0,
        x: 720,
        y: 420,
        dir_x: 1,
        dir_y: 0
    }
    ],
    RIGHTLEFTBOT: [{
        rotation: 0,
        x: 720,
        y: 420,
        dir_x: -1,
        dir_y: 0
    },
    {
        rotation: 0,
        x: 0,
        y: 420,
        dir_x: -1,
        dir_y: 0
    }],
    LEFTRIGHTMID: [{
        rotation: 0,
        x: 0,
        y: 300,
        dir_x: 1,
        dir_y: 0
    },
    {
        rotation: 0,
        x: 720,
        y: 300,
        dir_x: 1,
        dir_y: 0
    }
    ],
    RIGHTLEFTMID: [{
        rotation: 0,
        x: 720,
        y: 300,
        dir_x: -1,
        dir_y: 0
    },
    {
        rotation: 0,
        x: 0,
        y: 300,
        dir_x: -1,
        dir_y: 0
    }
    ],
    LEFTRIGHTTOP: [{
        rotation: 0,
        x: 0,
        y: 100,
        dir_x: 1,
        dir_y: 0
    },
    {
        rotation: 0,
        x: 720,
        y: 100,
        dir_x: 1,
        dir_y: 0
    }
    ],
    RIGHTLEFTTOP: [{
        rotation: 0,
        x: 720,
        y: 100,
        dir_x: -1,
        dir_y: 0
    },
    {
        rotation: 0,
        x: 0,
        y: 100,
        dir_x: -1,
        dir_y: 0
    }
    ],


    //Diagonal Angreifen

    LEFTRIGHTDIAGDOWN: [{
        x: 0,
        y: -90,
        dir_x: 0,
        dir_y: 1
    },
    {
        x: 720,
        y: 580,
        dir_x: 1,
        dir_y: 1
    }
    ],
    RIGHTLEFTDIAGDOWN: [{
        x: 720,
        y: -90,
        dir_x: 0,
        dir_y: 1
    },
    {
        x: 0,
        y: 580,
        dir_x: -1,
        dir_y: 1
    }
    ],
    RIGHTLEFTDIAGUP: [{
        x: 720,
        y: 580,
        dir_x: 0,
        dir_y: 0
    },
    {
        x: 0,
        y: -90,
        dir_x: -1,
        dir_y: -1
    }
    ],
    LEFTRIGHTDIAGUP: [{
        x: 0,
        y: 580,
        dir_x: 0,
        dir_y: 0
    },
    {
        x: 1280,
        y: -90,
        dir_x: 1,
        dir_y: -1
    }
    ],

    //Special Attack Patterns
    BOSSPATTERN: [{
        x: 360,
        y: 0,
        dir_x: 0,
        dir_y: 1
    },     
    {
        x: 360,
        y: 512,
        dir_x: 0,
        dir_y: 1
    },
    {
        x: 120, 
        y: 512,
        dir_x: -1,
        dir_y: 0
    },
    {
        x: 504,
        y: 512,
        dir_x: 1,
        dir_y: 0
    },
    {
        x: 120,
        y: 128,
        dir_x: -1,
        dir_y: -1
    },
    {
        x: 504,
        y: 128,
        dir_x: 1,
        dir_y: 0
    },
    {
        x: 120,
        y: 512,
        dir_x: -1,
        dir_y: 1
    },
    {
        x: 120,
        y: 360,
        dir_x: 0,
        dir_y: -1
    },
    {
        x: 360,
        y: 120,
        dir_x: 1,
        dir_y: -1
    },
    {
        x: 360,
        y: -100,
        dir_x: 0,
        dir_y: -1
    }],
};

//Hier werden die Attack Patterns in Blocks aufgeteilt, sodass ich sie einfach in enemies.js hinzufügen kann.
const AssaultBlocks = {
    ATTACKDOWN : [
        AttackPatterns['ATTACKMIDL'],
        AttackPatterns['ATTACKL1'],
        AttackPatterns['ATTACKR2'],
        AttackPatterns['ATTACKL2'],
        AttackPatterns['ATTACKMIDR'],
        AttackPatterns['ATTACKR1']
    ],
    ATTACKUP : [
        AttackPatterns['ATTACKMIDLBOT'],
        AttackPatterns['ATTACKMIDRBOT'],
        AttackPatterns['ATTACKLBOT1'],
        AttackPatterns['ATTACKRBOT2'],
        AttackPatterns['ATTACKRBOT1'],
        AttackPatterns['ATTACKLBOT2']
    ],
    ATTACKSIDE1 : [
        AttackPatterns['LEFTRIGHTBOT'],
        AttackPatterns['RIGHTLEFTMID'],
        AttackPatterns['LEFTRIGHTMID'],
        AttackPatterns['RIGHTLEFTTOP'],
    ],
    ATTACKSIDE2 : [
        AttackPatterns['LEFTRIGHTTOP'],
        AttackPatterns['RIGHTLEFTMID'],
        AttackPatterns['LEFTRIGHTBOT']
    ],
    METEORBARRAGE1 : [
        AttackPatterns['LEFTRIGHTBOT'],
        AttackPatterns['ATTACKMIDLBOT'],
        AttackPatterns['RIGHTLEFTTOP'],
        AttackPatterns['LEFTRIGHTDIAGDOWN'],
        AttackPatterns['RIGHTLEFTTOP'],
        AttackPatterns['RIGHTLEFTDIAGDOWN'],
        AttackPatterns['LEFTRIGHTDIAGUP'],
        AttackPatterns['LEFTRIGHTBOT'],
        AttackPatterns['RIGHTLEFTTOP'],
        AttackPatterns['ATTACKMIDLBOT'],
    ],
    METEORBARRAGE2 : [
        AttackPatterns['RIGHTLEFTDIAGUP'],
        AttackPatterns['ATTACKMIDRBOT'],
        AttackPatterns['RIGHTLEFTBOT'],
        AttackPatterns['LEFTRIGHTBOT'],
        AttackPatterns['RIGHTLEFTMID'],
        AttackPatterns['LEFTRIGHTBOT'],
        AttackPatterns['RIGHTLEFTTOP'],
        AttackPatterns['LEFTRIGHTDIAGDOWN'],
        AttackPatterns['RIGHTLEFTTOP'],
        AttackPatterns['ATTACKMIDLBOT']
    ],
    ATTACKMIXED1: [
        AttackPatterns['ATTACKMIDL'],
        AttackPatterns['ATTACKMIDR'],
        AttackPatterns['ATTACKR2'],
        AttackPatterns['LEFTRIGHTDIAGUP'],
        AttackPatterns['RIGHTLEFTMID'],
        AttackPatterns['ATTACKRBOT1'],
        AttackPatterns['LEFTRIGHTBOT']
    ],

    ATTACKMIXED2 : [
        AttackPatterns['RIGHTLEFTDIAGUP'],
        AttackPatterns['RIGHTLEFTBOT'],
        AttackPatterns['ATTACKMIDL'],
        AttackPatterns['ATTACKMIDR'],
        AttackPatterns['ATTACKR2'],
        AttackPatterns['LEFTRIGHTBOT'],
        AttackPatterns['ATTACKLBOT1'],
    ],

    ATTACKMIXED3 : [
        AttackPatterns['ATTACKL2'],
        AttackPatterns['RIGHTLEFTBOT'],
        AttackPatterns['ATTACKRBOT2'],
        AttackPatterns['ATTACKMIDR'],
        AttackPatterns['RIGHTLEFTDIAGDOWN'],
        AttackPatterns['LEFTRIGHTBOT'],
        AttackPatterns['ATTACKRBOT1'],
    ],
    BOSS : [
        AttackPatterns['BOSSPATTERN']
    ],
}

let EnemySequences = [];

//Game Manager
//Er läd die definierten Settings

let GameManager = {
    assets : {},
    player: undefined,
    lasershots: undefined,
    explosions: undefined,
    sounds: {},
    timeouts: [],
    phase: GameSettings.gamePhase.gameOver,
    lastUpdated: Date.now(),
    elapsedTime: 0,
    fps: 0,
    music: true,
};






































