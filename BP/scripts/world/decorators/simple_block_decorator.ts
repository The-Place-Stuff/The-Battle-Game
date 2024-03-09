import { Dimension, Vector3, BlockPermutation } from '@minecraft/server'
import Tile from '../tile'
import Decorator from './decorator'
import Random from '../../utils/random_utils'

export default class SimpleBlockDecorator extends Decorator {
    private name: string
    private states: Record<string, string | number | boolean>

    public constructor(name: string, states: Record<string, string | number | boolean>) {
        super()
        this.name = name
        this.states = states
    }

    public place(tile: Tile, dimension: Dimension, random: Random, origin: Vector3): void {
        const permutation = BlockPermutation.resolve(this.name, this.states)
        const block = dimension.getBlock(origin)
        
        block.trySetPermutation(permutation)
    }
}