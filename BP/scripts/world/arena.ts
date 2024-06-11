import { world, system, StructureRotation, Vector3 } from '@minecraft/server'
import { Vector3d } from '../utils/vector_utils'
import Tile from './tile'
import * as Decorators from './decorators'

const overworld = world.getDimension('overworld')

export default class Arena {
    private readonly id: string
    private readonly size: number
    
    public constructor(id: string, size: number) {
        this.id = id
        this.size = size
    }

    public async build(origin: Vector3) {
        const tileStart = new Vector3d(Math.floor(origin.x / 16), 0, Math.floor(origin.z / 16))

        for (let tileX = -this.size; tileX <= this.size; tileX++) {
            for (let tileZ = -this.size; tileZ <= this.size; tileZ++) {
                const tile = this.getTileAt(tileX, tileZ)
                this.placeTile(tile, tileStart.x + tileX, tileStart.z + tileZ)
            }
        }
    }

    private async placeTile(tile: Tile, tileX: number, tileZ: number) {
        tile.place(overworld, tileX, tileZ)
    }

    private getTileAt(tileX: number, tileZ: number): Tile {
        if (tileX == this.size && tileZ == this.size) {
            return this.getCornerTile(StructureRotation.Rotate180)
        }
        if (tileX == -this.size && tileZ == this.size) {
            return this.getCornerTile(StructureRotation.Rotate270)
        }
        if (tileX == this.size && tileZ == -this.size) {
            return this.getCornerTile(StructureRotation.Rotate90)
        }
        if (tileX == -this.size && tileZ == -this.size) {
            return this.getCornerTile(StructureRotation.None)
        }
        if (tileX == this.size) {
            return this.getSideTile(StructureRotation.Rotate90)
        }
        if (tileX == -this.size) {
            return this.getSideTile(StructureRotation.Rotate270)
        }
        if (tileZ == this.size) {
            return this.getSideTile(StructureRotation.Rotate180)
        }
        if (tileZ == -this.size) {
            return this.getSideTile(StructureRotation.None)
        }
        return this.getFloorTile()
    }

    private getFloorTile(): Tile {
        return new Tile(`battle:${this.id}/tile`, StructureRotation.None, [Decorators.BOULDER_FEATURE, Decorators.TALL_GRASS_PATCH_FEATURE, Decorators.DANDELION_PATCH_FEATURE])
    }

    private getSideTile(rotation: StructureRotation): Tile {
        return new Tile(`battle:${this.id}/tile_side`, rotation, [Decorators.TREE_FEATURE, Decorators.DOUBLE_TALL_GRASS_PATCH_FEATURE, Decorators.TALL_GRASS_PATCH_FEATURE])
    }

    private getCornerTile(rotation: StructureRotation): Tile {
        return new Tile(`battle:${this.id}/tile_corner`, rotation, [Decorators.TREE_FEATURE, Decorators.DOUBLE_TALL_GRASS_PATCH_FEATURE, Decorators.TALL_GRASS_PATCH_FEATURE])
    }
}