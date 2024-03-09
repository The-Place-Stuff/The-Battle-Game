import { Dimension, Vector3, BlockPermutation } from '@minecraft/server'
import Random from '../..//utils/random_utils'
import ConditionalRule from './conditional_rule'

export default class RarityRule extends ConditionalRule {
    private readonly chance: number

    public constructor(chance: number) {
        super()
        this.chance = chance
    }

    public shouldPlace(dimension: Dimension, random: Random, origin: Vector3): boolean {
        return random.nextInt(this.chance) == 0
    }
}