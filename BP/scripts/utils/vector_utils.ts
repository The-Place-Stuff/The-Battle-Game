import { Vector3, Vector2 } from '@minecraft/server'

export class Vector3d implements Vector3 {
    public x: number
    public y: number
    public z: number

    public constructor(x: number, y: number, z: number) {
        this.x = x
        this.y = y
        this.z = z
    }

    public length(): number {
        return Math.sqrt((this.x ** 2) + (this.y ** 2) + (this.z ** 2))
    }

    public normalized(): Vector3 {
        return {
            x: this.x / this.length(),
            y: this.y / this.length(),
            z: this.z / this.length()
        }
    }
}

export class Vector2d implements Vector2 {
    public x: number
    public y: number

    public constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }

    public length() {
        return Math.sqrt((this.x ** 2) + (this.y ** 2))
    }

    public normalized(): Vector2 {
        return {
            x: this.x / this.length(),
            y: this.y / this.length()
        }
    }
}

export class VectorUtils {

    public static zero: Vector3 = new Vector3d(0, 0, 0)

    public static add(first: Vector3, second: Vector3) {
        return {
            x: first.x + second.x,
            y: first.y + second.y,
            z: first.z + second.z
        }
    }

    public static subtract(first: Vector3, second: Vector3) {
        return {
            x: first.x - second.x,
            y: first.y - second.y,
            z: first.z - second.z
        }
    }
    
    public static multiply(first: Vector3, second: Vector3 | number) {
        if (typeof second == 'number') {
            return {
                x: first.x * second,
                y: first.y * second,
                z: first.z * second
            }
        }
        return {
            x: first.x * second.x,
            y: first.y * second.y,
            z: first.z * second.z
        }
    }

    public static divide(first: Vector3, second: Vector3 | number) {
        if (typeof second == 'number') {
            return {
                x: first.x / second,
                y: first.y / second,
                z: first.z / second
            }
        }
        return {
            x: first.x / second.x,
            y: first.y / second.y,
            z: first.z / second.z
        }
    }

    public static distance(first: Vector3, second: Vector3) {
        return Math.hypot(first.x - second.x, first.y - second.y, first.z - second.z)
    }
}