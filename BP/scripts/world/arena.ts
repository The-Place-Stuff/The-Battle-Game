import { world, system, StructureRotation, Vector3 } from '@minecraft/server'
import { Vector3d } from '../utils/vector_utils'
import Tile from './tile'
import { TALL_GRASS_PATCH, DANDELION_PATCH, TREE } from '../constants'

const overworld = world.getDimension('overworld')

export default class Arena {
    private readonly id: string
    private readonly size: number
    
    public constructor(id: string, size: number) {
        this.id = id
        this.size = size
    }

    public async build(origin: Vector3) {
        const promises: Promise<void>[] = []
        const tileStart = new Vector3d(Math.floor(origin.x / 16), 0, Math.floor(origin.z / 16))
        let delay = 0

        for (let tileX = -this.size; tileX <= this.size; tileX++) {
            for (let tileZ = -this.size; tileZ <= this.size; tileZ++) {
                const tile = this.getTileAt(tileX, tileZ)
                promises.push(this.placeTile(tile, tileStart.x + tileX, tileStart.z + tileZ, delay))
                delay++
            }
        }
        return Promise.all(promises)
    }

    private async placeTile(tile: Tile, tileX: number, tileZ: number, delay: number): Promise<void> {
        return new Promise<void>(async resolve => system.runTimeout(async () => {
            await tile.place(overworld, tileX, tileZ)
            resolve()
        }, delay * 2))
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
        return new Tile(`battle:${this.id}/tile`, StructureRotation.None, [TALL_GRASS_PATCH, TREE])
    }

    private getSideTile(rotation: StructureRotation): Tile {
        return new Tile(`battle:${this.id}/tile_side`, rotation, [TALL_GRASS_PATCH, DANDELION_PATCH, TREE])
    }

    private getCornerTile(rotation: StructureRotation): Tile {
        return new Tile(`battle:${this.id}/tile_corner`, rotation, [TALL_GRASS_PATCH, DANDELION_PATCH, TREE])
    }
}