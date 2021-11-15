define([""],function () {
    var images = {};
    var sources, src;

    sources = {

    //Background
    background0: "images/Background/stars.png",
    background1: "images/Background/Background.png",
    background2: "images/Background/Background2.png",
    background3: "images/Background/Background3.png",
    background4: "images/Background/Background4.png",
    background5: "images/Background/Background5.png",

    //Ships
    playership: "images/Characters/Spaceship.png",
    enemyship1: "images/Characters/EnemyShip.png",
    enemyship2: "images/Characters/EnemyShip2.png",
    enemyship3: "images/Characters/EnemyShip3.png",

    thrusters: "images/Characters/Thrusters.png",

    //Weapon
    weapon1: "images/Characters/gun1.png",
    weapon2: "images/Characters/gun2.png",

    //Laser
    laserb1: "images/Effects/Laser/LaserBlue01.png",
    laserb2: "images/Effects/Laser/LaserBlue02.png",
    laserr1: "images/Effects/Laser/LaserRed01.png",
    laserr2: "images/Effects/Laser/LaserRed02.png",

    //Explosion
    Explosion1: "images/Effects/Explosion/Explosion1.png",
    Explosion2: "images/Effects/Explosion/Explosion2.png",

    //Meteor
    largeMeteorBrown1: "images/Effects/Meteor/meteorBrown_large1.png",
    largeMeteorBrown2: "images/Effects/Meteor/meteorBrown_large2.png",
    mediumMeteorBrown: "images/Effects/Meteor/meteorBrown_medium.png",
    smallMeteorBrown: "images/Effects/Meteor/meteorBrown_small.png",
    tinyMeteorBrown: "images/Effects/Meteor/meteorBrown_verysmall.png",
    largeMeteorGrey: "images/Effects/Meteor/meteorGrey_large.png",
    mediumMeteorGrey: "images/Effects/Meteor/meteorGrey_medium.png",
    smallMeteorGrey: "images/Effects/Meteor/meteorGrey_small.png",
    tinyMeteorGrey: "images/Effects/Meteor/meteorGrey_verysmall.png",

    };
    for(src in sources)
    {
    images[src] = new Image();
    Image[src].src = sources[src];
    }
    return images;
});
