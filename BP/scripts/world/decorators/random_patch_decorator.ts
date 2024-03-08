import { Dimension, Vector3 } from '@minecraft/server'
import Decorator from './decorator'
import { Vector3d } from '../../utils/vector_utils'
import { PlacementOptions } from '../../types'
import Random from '../../utils/random_utils'

export default class RandomPatchDecorator extends Decorator {
    private decorator: Decorator
    private tries: number
    private xzSpread: number
    private ySpread: number

    public constructor(decorator: Decorator, tries: number, xzSpread: number, ySpread: number, options: PlacementOptions) {
        super(options)
        this.decorator = decorator
        this.tries = tries
        this.xzSpread = xzSpread
        this.ySpread = ySpread
    }

    public place(dimension: Dimension, random: Random, origin: Vector3): void {
        const xz = this.xzSpread + 1
        const y = this.ySpread + 1
        const block = dimension.getBlock(origin)

        for (let i = 0; i < this.tries; i++) {
            const shiftedBlock = block.offset(new Vector3d(random.nextInt(xz) - random.nextInt(xz), random.nextInt(y) - random.nextInt(y), random.nextInt(xz) - random.nextInt(xz)))

            if (this.decorator.canPlace(dimension, random, shiftedBlock.location)) {
                this.decorator.place(dimension, random, shiftedBlock.location)
            }
        }
    }
}