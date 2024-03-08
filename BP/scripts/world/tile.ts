import { StructureRotation, Vector3, Dimension } from '@minecraft/server'
import { Vector3d, VectorUtils } from '../utils/vector_utils'
import Decorator from './decorators/decorator'
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
    private readonly decorators: Decorator[]
    private readonly heightmap: Vector3[]
    
    public constructor(location: string, rotation: StructureRotation, decorators: Decorator[]) {
        this.location = location
        this.rotation = rotation
        this.decorators = decorators
        this.heightmap = []
    }

    public async place(dimension: Dimension, tileX: number, tileZ: number) {
        const tileStart = new Vector3d(tileX * 16, 0, tileZ * 16)
        const tileEnd = VectorUtils.add(tileStart, new Vector3d(15, 0, 15))

        dimension.runCommand(`structure load "${this.location}" ${tileStart.x} ${tileStart.y} ${tileStart.z} ${this.getRotation()}`)
        this.scanHeightmap(dimension, tileStart, tileEnd)
        this.placeDecorators(dimension, random, tileStart)
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

    public placeDecorators(dimension: Dimension, random: Random, tileStart: Vector3) {
        for (const decorator of this.decorators) {
            const options = decorator.options
            
            for (let i = 0; i < options.count; i++) {
                const spread = new Vector3d(random.nextInt(options.spread.x), 0, random.nextInt(options.spread.z))
                let origin = VectorUtils.add(tileStart, spread)
                origin = this.getSurfacePos(origin)
                origin = VectorUtils.add(origin, new Vector3d(0, 1, 0))

                if (decorator.canPlace(dimension, random, origin)) {
                    try {
                        decorator.place(dimension, random, origin)
                    }
                    catch {}
                }
            }
        }
    }
    
    private getSurfacePos(pos: Vector3) {
        return this.heightmap.find((surfacePos) => surfacePos.x == pos.x && surfacePos.z == pos.z)
    }

    private getRotation() {
        return rotationMap.get(this.rotation)
    }
}