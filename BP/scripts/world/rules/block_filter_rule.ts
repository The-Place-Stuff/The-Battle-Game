import { Dimension, Vector3, BlockPermutation } from '@minecraft/server'
import { BlockFilter } from '../../types'
import Random from '../..//utils/random_utils'
import ConditionalRule from './conditional_rule'

export default class BlockFilterRule extends ConditionalRule {
    private readonly blockFilters: BlockFilter[]

    public constructor(blockFilters: BlockFilter[]) {
        super()
        this.blockFilters = blockFilters
    }

    public shouldPlace(dimension: Dimension, random: Random, origin: Vector3): boolean {
        const block = dimension.getBlock(origin)
        let successes = 0
        
        for (const blockFilter of this.blockFilters) {
            const offsetBlock = block.offset(blockFilter.offset)
            const filterPermutation = BlockPermutation.resolve(blockFilter.name, blockFilter.states)

            if (offsetBlock.permutation == filterPermutation) {
                successes++
            }
        }
        return successes == this.blockFilters.length
    }
}