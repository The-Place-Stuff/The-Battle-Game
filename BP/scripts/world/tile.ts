import { system, StructureRotation, Vector3, Dimension } from '@minecraft/server'
import { Vector3d, VectorUtils } from '../utils/vector_utils'
import PlacedDecorator from './decorators/placed_decorator'
import Random from '../utils/random_utils'

const rotationMap: Map<StructureRotation, string> = new Map([
    [StructureRotation.None, '0_degrees'],
    [StructureRotation.Rotate180, '180_degrees'],
    [StructureRotation.Rotate270, '270_degrees'],
    [StructureRotation.Rotate90, '90_degrees']
])
const random = new Random(100)

export default class Tile {
    private readonly location: string
    private readonly rotation: StructureRotation
    private readonly decorators: PlacedDecorator[]
    private readonly heightmap: Vector3[]
    
    public constructor(location: string, rotation: StructureRotation, decorators: PlacedDecorator[]) {
        this.location = location
        this.rotation = rotation
        this.decorators = decorators
        this.heightmap = []
    }

    public async place(dimension: Dimension, tileX: number, tileZ: number) {
        const tileStart = new Vector3d(tileX * 16, 0, tileZ * 16)
        const tileEnd = VectorUtils.add(tileStart, new Vector3d(15, 0, 15))

        dimension.runCommand(`structure load "${this.location}" ${tileStart.x} ${tileStart.y} ${tileStart.z} ${this.getRotation()}`)
        system.runTimeout(() => this.scanHeightmap(dimension, tileStart, tileEnd), 1)
        system.runTimeout(() => this.placeDecorators(dimension, random, tileStart), 2)
    }

    private scanHeightmap(dimension: Dimension, tileStart: Vector3, tileEnd: Vector3) {
        for (let x = tileStart.x; x <= tileEnd.x; x++) {
            for (let z = tileStart.z; z <= tileEnd.z; z++) {
                const scanner = dimension.getBlockFromRay(new Vector3d(x, 32, z), new Vector3d(0, -1, 0), {
                    maxDistance: 32
                })
                const floorBlock = scanner.block
                if (floorBlock) {
                    this.heightmap.push(floorBlock.location)
                }
            }
        }
    }

    public async placeDecorators(dimension: Dimension, random: Random, tileStart: Vector3) {
        for (const decorator of this.decorators) {
            try {
                decorator.place(this, dimension, random, tileStart)
            }
            catch (error) {
                console.warn(`Decorator at ${tileStart.x} ${tileStart.y} ${tileStart.z} produced this error: ${error}`)
            }
        }
    }
    
    public getSurfacePos(pos: Vector3) {
        return this.heightmap.find((surfacePos) => surfacePos.x == pos.x && surfacePos.z == pos.z)
    }

    private getRotation() {
        return rotationMap.get(this.rotation)
    }
}