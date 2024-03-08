import { world, Dimension, Vector3, BlockPermutation } from '@minecraft/server'
import Decorator from './decorator'
import { VectorUtils } from '../../utils/vector_utils'
import { PlacementOptions } from '../../types'
import Random from '../../utils/random_utils'

const structureManager = world.structureManager

export default class StructureDecorator extends Decorator {
    private readonly location: string
    private readonly offset: Vector3

    public constructor(location: string, offset: Vector3, options: PlacementOptions) {
        super(options)
        this.location = location
        this.offset = offset
    }

    public place(dimension: Dimension, random: Random, origin: Vector3): void {
        const pos = VectorUtils.add(origin, this.offset)
        const structure = structureManager.get(this.location)
        
        if (!structure || !structure.isValid()) {
            return
        }
        structureManager.place(structure, dimension, pos)
    }
}