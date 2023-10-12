import { Vector3, Vector, Direction } from '@minecraft/server'

export class Vector3d implements Vector3 {
    public x: number
    public y: number
    public z: number

    public constructor(x: number, y: number, z: number) {
        this.x = x
        this.y = y
        this.z = z
    }
}

export class BlockPos extends Vector3d {

    public offset(direction: Direction, offsetAmount: number): BlockPos {
        let offsetPos: Vector3 = Vector.zero
        switch (direction) {
            case Direction.up: offsetPos = Vector.add(this, Vector.multiply(Vector.up, offsetAmount))
            case Direction.down: offsetPos = Vector.add(this, Vector.multiply(Vector.down, offsetAmount))
            case Direction.north: offsetPos = Vector.add(this, Vector.multiply(Vector.forward, offsetAmount))
            case Direction.south: offsetPos = Vector.add(this, Vector.multiply(Vector.back, offsetAmount))
            case Direction.east: offsetPos = Vector.add(this, Vector.multiply(Vector.right, offsetAmount))
            case Direction.west: offsetPos = Vector.add(this, Vector.multiply(Vector.left, offsetAmount))
        }
        return new BlockPos(offsetPos.x, offsetPos.y, offsetPos.z)
    }

    public up(offset: number = 1): BlockPos {
        return this.offset(Direction.up, offset)
    }

    public down(offset: number = 1): BlockPos {
        return this.offset(Direction.down, offset)
    }

    public north(offset: number = 1): BlockPos {
        return this.offset(Direction.north, offset)
    }

    public south(offset: number = 1): BlockPos {
        return this.offset(Direction.south, offset)
    }

    public east(offset: number = 1): BlockPos {
        return this.offset(Direction.east, offset)
    }

    public west(offset: number = 1): BlockPos {
        return this.offset(Direction.west, offset)
    }
}