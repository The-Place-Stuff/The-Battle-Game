import { Dimension, Vector3 } from '@minecraft/server';
import { Vector3d, VectorUtils } from '../../utils/vector_utils'
import Random from '../../utils/random_utils';
import PlacementRule from './placement_rule'
import Tile from '../tile'

export default class SpreadRule extends PlacementRule {
    private readonly xz: number

    public constructor(xz: number) {
        super()
        this.xz = xz
    }

    public getPositions(tile: Tile, dimension: Dimension, random: Random, origin: Vector3): Vector3[] {
        const xOffset = random.nextInt(this.xz)
        const zOffset = random.nextInt(this.xz)
        const offsetPos = VectorUtils.add(origin, new Vector3d(xOffset, 0, zOffset))
        
        return [offsetPos]
    }
}