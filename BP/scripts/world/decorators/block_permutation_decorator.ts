import { Dimension, Vector3, BlockPermutation } from '@minecraft/server'
import Decorator from './decorator'
import { PlacementOptions } from '../../types'
import Random from '../../utils/random_utils'

export default class BlockPermutationDecorator extends Decorator {
    private name: string
    private states: Record<string, string | number | boolean>

    public constructor(name: string, states: Record<string, string | number | boolean>, options: PlacementOptions) {
        super(options)
        this.name = name
        this.states = states
    }

    public place(dimension: Dimension, random: Random, origin: Vector3): void {
        const permutation = BlockPermutation.resolve(this.name, this.states)
        const block = dimension.getBlock(origin)
        
        block.trySetPermutation(permutation)
    }
}