export default class Tuple {
    x: number;
    y: number;
    z: number;
    w: number;

    constructor(x: number, y: number, z: number, w: number) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }

    equals(tuple: Tuple) {
        return this.x === tuple.x &&
            this.y === tuple.y &&
            this.z === tuple.z &&
            this.w === tuple.w
    }

    subtract(tuple: Tuple): Tuple {
        const {x, y, z, w} = tuple;
        const w_ = this.w - w;

        if (w_ < 0) {
            throw new Error('Cannot subtract a point from a vector');
        } else if (w_ === 1) {
            return new Point(this.x - x, this.y -  y, this.z - z);
        } else {
            return new Vector(this.x - x, this.y - y, this.z - z);
        }
    }
}