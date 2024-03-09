import { Dimension, Vector3 } from '@minecraft/server';
import Random from '../../utils/random_utils';
import PlacementRule from './placement_rule'
import Tile from '../tile'

export default abstract class ConditionalRule extends PlacementRule {

    public constructor() {
        super()
    }

    public getPositions(tile: Tile, dimension: Dimension, random: Random, origin: Vector3): Vector3[] {
        return this.shouldPlace(dimension, random, origin) ? [origin] : []
    }

    public abstract shouldPlace(dimension: Dimension, random: Random, origin: Vector3): boolean
}