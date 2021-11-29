class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    //Ändere Position vom Objekt
    update(x, y) {
        this.x = x;
        this.y = y;
    }

    //Wichtig für Movement
    increment(ix, iy) {
        this.x += ix;
        this.y += iy;
    }

    //Wichtig für die Hitdetection
    equalToPoint(x, y) {
        if (this.x == x && this.y == y) {
            return true;
        }
        return false;
    }

}