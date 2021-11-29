class Enemy extends Ship {
    constructor(divName, assetDesc, player, sequence) {
        super(divName, new Point(0,0), assetDesc.fileName, new Size(assetDesc.width, assetDesc.height));
        this.state = GameSettings.enemyState.ready;
        this.movementList = [];
        this.targetMovementNumber = 0;
        this.targetMovement = new enemyMovement(0,0,0,0);
        this.lastMovementIndex = 0;
        this.player = player;
        this.score = sequence.score;
        this.lives = sequence.lives;
        this.speed = sequence.speed;
        this.readInAttackPatterns(sequence.AttackPatterns);
    }

    readInAttackPatterns(AP) {
        this.movementList = [];
        for (let i = 0; i < AP.length; ++i) {
            let t_AP = AP[i];
            let n_AP = new enemyMovement(
                t_AP.x + this.anchorShift.x , 
                t_AP.y + this.anchorShift.y, 
                t_AP.dir_x, 
                t_AP.dir_y
                );
            this.movementList.push(n_AP);
        }
    }

    updateEnemy(dt) {
        switch(this.state) {
            case GameSettings.enemyState.moving:
                this.moveTowardPoint(dt);
                this.checkplayerCollision();
            break;
        }
    }

    checkplayerCollision() {
        if(this.containingBox.IntersectedBy(this.player.containingBox) == true) {
            if (this.player.hit == false) {
                this.player.hit = true;
            }
        }
    }

    moveTowardPoint(dt) {
        let inc = dt * this.speed;
        this.incrementPosition(inc * this.targetMovement.dir_x, inc * this.targetMovement.dir_y);

        if(Math.abs(this.position.x - this.targetMovement.point.x) < Math.abs(inc) &&
        Math.abs(this.position.y - this.targetMovement.point.y) < Math.abs(inc)) {
            this.updatePosition( this.targetMovement.point.x,  this.targetMovement.point.y);
        }

        if(this.position.equalToPoint(this.targetMovement.point.x, this.targetMovement.point.y) == true) {
            if (this.targetMovementNumber == this.lastMovementIndex) {
                this.killMe();
            } else {
                this.setMovement();
            }
        }
    }

    setMovement() {
        this.targetMovementNumber++;
        this.targetMovement = this.movementList[this.targetMovementNumber];
    }

    killMe() {
        this.state = GameSettings.enemyState.dead;
        this.removeFromBoard();
    }

    setMoving() {
        this.targetMovementNumber = 0;
        this.targetMovement = this.movementList[this.targetMovementNumber];
        this.lastMovementIndex = this.movementList.length - 1;
        this.setPosition(this.targetMovement.point.x, this.targetMovement.point.y, false);
        this.addToBoard(false);
        this.targetMovementNumber = 1;
        this.targetMovement = this.movementList[this.targetMovementNumber];
        this.state = GameSettings.enemyState.moving;
    }
}

class EnemyGroup {
	constructor(player, lasershots, explosion) {
		this.listEnemies = [];
		this.lastAdded = 0;
		this.gameOver = false;
		this.sequenceIndex = 0;
		this.sequencesDone = false;
		this.count = 0;
		this.player = player;
        this.lasershots = lasershots;
        this.explosions = explosion;
        console.log("Explosion Enemy", explosion);
    }

    reset() {
        this.killAll();
		this.listEnemies = [];
		this.lastAdded = 0;
		this.gameOver = false;
		this.sequenceIndex = 0;
		this.sequencesDone = false;
		this.count = 0;
    }

    killAll() {
        for (let i = 0; i < this.listEnemies.length; ++i) {
            this.listEnemies[i].killMe();
        }
    }
    
    updateEnemies(dt) {
		this.lastAdded += dt;
		if (this.sequencesDone == false && 
            EnemySequences[this.sequenceIndex].spawnDelay < this.lastAdded) {
			this.addEnemy();
		}

        for (let i = this.listEnemies.length - 1; i >= 0; --i) {
            if (this.listEnemies[i].state == GameSettings.enemyState.dead) {
            	this.listEnemies.splice(i, 1);
            } else if (this.listEnemies[i].state == GameSettings.enemyState.moving){
                let en = this.listEnemies[i];

                for (let b = 0; b < this.lasershots.listlasers.length; ++b) {
                    let bu = this.lasershots.listlasers[b];
                    if (bu.dead == false &&
                        bu.position.y > GameSettings.laserTop &&
                        en.containingBox.IntersectedBy(bu.containingBox) == true) {
                            bu.killMe();
                            en.lives--;
                            if (en.lives <= 0) {
                                playSound('Explosion');
                                this.player.incrementScore(en.score);
                                en.killMe();
                                let cp = en.getCenter();
                                this.explosions.createExplosion(new Point (cp.x,cp.y));
                            }       
                    }
                }

                en.updateEnemy(dt);
            }
        }

		this.checkGameOver();
    }


    //Here is the Problem
    checkGameOver() {
		if (
            this.sequencesDone == true) {
                setTimeout(() => {
                    this.gameOver = true;   
                }, 18000);     
		}
    }
    
    addEnemy() {
		// add a new enemy withe the sequence data
		let seq = EnemySequences[this.sequenceIndex];
		let en_new = new Enemy('en_' + this.count, GameManager.assets[seq.image],
		this.player, seq );
		this.listEnemies.push(en_new);
		en_new.setMoving();
		this.count++;
		this.sequenceIndex++;
        this.lastAdded = 0;
        if (this.sequenceIndex == EnemySequences.length) {
            this.sequencesDone = true;
        }
	}
}


function addEnemySequence(spawnDelay, spawnRate, image, score, 
    lives, speed, number, AttackPatterns) {
    for (let i = 0; i < number; ++i) {
        let delay = spawnRate;
        if(i == 0) {
            delay = spawnDelay;
        }
        EnemySequences.push(
            {
            spawnDelay: delay,
            image: image,
            AttackPatterns: AttackPatterns,
            score: score,
            lives: lives,
            speed: speed
            }
        )
    }
}

//Funktion um die Attacksequenz zu initialisieren
function createAttackSequence(spawnRate, image, number, assaultBlock, score, lives, speed, spawnDelay) {

    for (let i = 0; i < assaultBlock.length; ++i) {
        let delay = spawnRate;
        if (i == 0) {
            delay = spawnDelay
        }
        addEnemySequence(delay, spawnRate, image, score, lives, speed, number, assaultBlock[i]);
    }
}

//In GameSettings.js genau definierte Angriffswellen sind auszuwählen.
//Wähle: spawnRate , image, number, assaultBlock, scoreValue, lives, speed, spawnDelay
function setUpSequences() {
    createAttackSequence(500,'EnemyShip1', 1,  AssaultBlocks.ATTACKDOWN, 100, 1, enemySpeed.normal, 1000);
    createAttackSequence(500,'EnemyShip2', 4,  AssaultBlocks.ATTACKSIDE1, 100, 1, enemySpeed.normal, 1000);
    createAttackSequence(500,'EnemyShip3', 1,  AssaultBlocks.ATTACKMIXED2, 100, 1, enemySpeed.fast, 2000);
    createAttackSequence(500,'EnemyShip2', 2,  AssaultBlocks.ATTACKMIXED3, 100, 1, enemySpeed.normal, 1000);
    createAttackSequence(500,'EnemyShip3', 2,  AssaultBlocks.ATTACKDOWN, 100, 1, enemySpeed.fast, 2000);
    createAttackSequence(300,'Meteor1', 1,  AssaultBlocks.METEORBARRAGE1, 100, 1, enemySpeed.fastest, 1000);
    createAttackSequence(500,'EnemyShip2', 4,  AssaultBlocks.ATTACKSIDE2, 100, 1, enemySpeed.fast, 2000);
    createAttackSequence(500,'miniBoss', 1,  AssaultBlocks.BOSS, 500, 15, enemySpeed.slow, 2000); 
    createAttackSequence(500,'EnemyShip1', 2,  AssaultBlocks.ATTACKSIDE1, 100, 1, enemySpeed.normal, 2000);
    createAttackSequence(500,'EnemyShip3', 4,  AssaultBlocks.ATTACKSIDE2, 100, 1, enemySpeed.fast, 2000);
    createAttackSequence(500,'EnemyShip3', 2,  AssaultBlocks.ATTACKMIXED1, 100, 1, enemySpeed.fast, 2000);
    createAttackSequence(300,'Meteor2', 1,  AssaultBlocks.METEORBARRAGE2, 100, 2, enemySpeed.fastest, 2000);
    createAttackSequence(500,'EnemyShip2', 2,  AssaultBlocks.ATTACKDOWN, 100, 1, enemySpeed.fast, 2000);
    createAttackSequence(500,'Boss', 1,  AssaultBlocks.BOSS, 2000, 25, enemySpeed.normal, 3000);
}
