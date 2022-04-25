import Tuple from './tuple';
import Point from './point';

export default class Vector extends Tuple {
    constructor(x: number, y: number, z: number, w: number = 0.0) {
        super(x, y, z, w);
    }

    add(tuple: Tuple): Tuple {
        const {x, y, z, w} = tuple;

        if (w === 1) {
            return new Point(this.x + x, this.y + y, this.z + z);
        } else {
            return new Vector(this.x + x, this.y + y, this.z + z);
        }
    }

    subtract(tuple: Tuple): Tuple {
        const {x, y, z, w} = tuple;

        if (w === 1) {
            throw new Error('Cannot subtract a point from a vector');
        } else {
            return new Vector(this.x - x, this.y - y, this.z - z);
        }
    }

    negate(): Vector {
        return new Vector(this.x * -1, this.y * -1, this.z * -1, this.w * -1);
    }

    multiply(scalar: number): Vector {
        return new Vector(this.x * scalar, this.y * scalar, this.z * scalar, this.w * scalar);
    }

    divide(scalar: number): Vector {
        return new Vector(this.x / scalar, this.y / scalar, this.z / scalar, this.w / scalar);
    }

    get magnitude(): number {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2) + Math.pow(this.w, 2));
    }

    normalize(): Vector {
        const m = this.magnitude;
        return new Vector(this.x / m, this.y / m, this.z / m, this.w / m);
    }

    dot(vector: Vector): number {
        const {x, y, z, w} = vector;
        return this.x * x +
            this.y * y +
            this.z * z +
            this.w * w;
    }

    cross(vector: Vector): Vector {
        const {x, y, z, w} = vector;
        return new Vector(
            this.y * z - this.z * y,
            this.z * x - this.x * z,
            this.x * y - this.y * x)
    }
}