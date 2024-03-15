import { world, Dimension, Vector3, BlockPermutation } from '@minecraft/server'
import Tile from '../tile'
import Decorator from './decorator'
import { VectorUtils, Vector3d } from '../../utils/vector_utils'
import Random from '../../utils/random_utils'

const structureManager = world.structureManager

export default class StructureDecorator extends Decorator {
    private readonly location: string
    private readonly offset: Vector3
    private readonly cache: Map<Vector3, BlockPermutation>

    public constructor(location: string, offset: Vector3) {
        super()
        this.location = location
        this.offset = offset
        this.cache = this.cacheStructure()
    }

    public place(tile: Tile, dimension: Dimension, random: Random, origin: Vector3): void {
        origin = VectorUtils.add(origin, this.offset)

        for (const [pos, permutation] of this.cache) {
            const placePos = VectorUtils.add(origin, pos)
            try {
                dimension.getBlock(placePos).setPermutation(permutation)
            }
            catch {

            }
        }
    }

    /*
    public place(tile: Tile, dimension: Dimension, random: Random, origin: Vector3): void {
        const pos = VectorUtils.add(origin, this.offset)
        const structure = structureManager.get(this.location)
        
        if (!structure || !structure.isValid()) {
            return
        }
        dimension.runCommand(`structure load "${structure.id}" ${pos.x} ${pos.y} ${pos.z}`)
    }
    */

    private cacheStructure(): Map<Vector3, BlockPermutation> {
        const structure = structureManager.get(this.location)
        const size = structure.size
        const blocks = new Map()
        for (let x = 0; x < size.x; x++) {
            for (let y = 0; y < size.y; y++) {
                for (let z = 0; z < size.z; z++) {
                    const pos = new Vector3d(x, y, z)
                    const permutation = structure.getBlockPermutation(pos)
                    blocks.set(pos, permutation)
                }
            }
        }
        return blocks
    }
}