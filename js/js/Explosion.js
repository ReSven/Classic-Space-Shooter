//Für einen Explosion effekt.
class Explosions {
    constructor(assetName) {
        this.count = 0;
        this.offset = undefined;
        this.setOffSet(assetName);
    }

    setOffSet(assetName) {
        let asset = GameManager.assets[assetName];
        this.offSet = new Point((asset.width/2)*-1, (asset.height/2)*-1); 
    }

    //Erzeugt Explosion effekt in updateEnemies()
    createExplosion(position) {
        let div = document.createElement("div");
        div.classList.add("explosion");
        let divId = 'explosion_' + this.count;
        div.id = divId;
        div.style.left = (position.x + this.offSet.x) + 'px';
        div.style.top = (position.y + this.offSet.y) + 'px';
        document.querySelector(GameSettings.gameAreaDiv).appendChild(div);
        setTimeout(function() {
            let removeDiv = document.getElementById(divId);
            removeDiv.remove();
        }, GameSettings.explosionTimeout);

        this.count++;
    }
}