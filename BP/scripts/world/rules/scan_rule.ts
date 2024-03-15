import { Dimension, Vector3 } from '@minecraft/server'
import { Vector3d, VectorUtils } from '../../utils/vector_utils'
import Random from '../../utils/random_utils'
import ConditionalRule from './conditional_rule'

export default class ScanRule extends ConditionalRule {
    private readonly size: Vector3

    public constructor(size: Vector3) {
        super()
        this.size = size
    }

    public shouldPlace(dimension: Dimension, random: Random, origin: Vector3): boolean {
        for (let x = -this.size.x; x <= this.size.x; x++) {
            for (let y = -this.size.y; y <= this.size.y; y++) {
                for (let z = -this.size.z; z <= this.size.z; z++) {
                    const block = dimension.getBlock(new Vector3d(origin.x + x, origin.y + y, origin.z + z))
                    if (!block.isAir) return false
                }
            }
        }
        return true
    }
}