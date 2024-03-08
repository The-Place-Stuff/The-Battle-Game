import { Dimension, Vector3, BlockPermutation } from '@minecraft/server'
import { PlacementOptions } from '../../types';
import { VectorUtils } from '../../utils/vector_utils'
import Random from '../../utils/random_utils'

export default abstract class Decorator {
    public readonly options: PlacementOptions

    public constructor(options: PlacementOptions) {
        this.options = options
    }

    public abstract place(dimension: Dimension, random: Random, origin: Vector3): void

    public canPlace(dimension: Dimension, random: Random, origin: Vector3): boolean {
        const chance = this.options.chance
        const blockFilters = this.options.blockFilters
        
        if (chance && random.nextInt(chance) == 0) {
            return false
        }
        if (blockFilters) {
            let successes = 0
            for (const blockFilter of blockFilters) {
                const permutation = BlockPermutation.resolve(blockFilter.name, blockFilter.states)
                const searchPos = VectorUtils.add(origin, blockFilter.offset)
                
                if (dimension.getBlock(searchPos).permutation == permutation) {
                    successes++
                }
            }
            return successes == blockFilters.length
        }
        return true
    }
}