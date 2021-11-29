class Laser extends Ship {
    //Constructor für den einzelnen Laser
    constructor(divName, assetDesc, position) {
        super(divName, position, assetDesc.fileName, new Size(assetDesc.width, assetDesc.height));
        this.life = GameSettings.laserRange;
        this.dead = false;
        this.addToBoard(true);
    }

    updatelaser(dt) {
        let inc = dt * GameSettings.laserSpeed;
        this.incrementPosition(0, -inc);
        this.life -= dt;
        if (this.life < 0) {
            this.killMe();
        }
    }

    killMe() {
        this.dead = true;
        this.removeFromBoard();
    }
}

//Somit werden Laser in setLaser() in den Game Manager übergeben und durch den Spieler abgefeuert
class laserCollection {
    constructor(player) {
        this.listlasers = [];
        this.lastAdded = 0;
        this.player = player;
        this.total_lasers = 0;
    }

    reset() {
        for (let i = 0; i < this.listlasers.length; ++i) {
            this.listlasers[i].removeFromBoard();
        }
        this.listlasers = [];
        this.lastAdded = 0;
        this.total_lasers = 0;
    }

    //Laser abfeuern
    fireLaser(dt) {
        for (let i = this.listlasers.length - 1; i >= 0; --i) {
            if (this.listlasers[i].dead == true) {
                this.listlasers.splice(i, 1);
            } else {
                this.listlasers[i].updatelaser(dt);
            }
        }
        this.lastAdded += dt;

        if (this.lastAdded > GameSettings.laserFireRate && 
            this.player.state != GameSettings.playerState.invincible) {
                this.lastAdded = 0;
                this.listlasers.push(
                    new Laser(
                        'laser_' + this.total_lasers,
                        GameManager.assets['laserRed'],
                        new Point(this.player.position.x + (this.player.size.width / 2), 
                        this.player.position.y)
                    )
                );
                this.total_lasers++;
            }
    }
}




















































