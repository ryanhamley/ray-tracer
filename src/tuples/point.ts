import Tuple from './tuple';
import Vector from './vector';

export default class Point extends Tuple {
    constructor(x: number, y: number, z: number, w: number = 1.0) {
        super(x, y, z, w);
    }

    add(tuple: Tuple): Tuple {
        const {x, y, z, w} = tuple;

        if (w === 1) {
            throw new Error('Cannot add points');
        } else {
            return new Point(this.x + x, this.y + y, this.z + z);
        }
    }

    subtract(tuple: Tuple): Tuple {
        const {x, y, z, w} = tuple;

        if (w === 1) {
            return new Vector(this.x - x, this.y - y, this.z - z);
        } else {
            return new Point(this.x - x, this.y -  y, this.z - z);
        }
    }
}