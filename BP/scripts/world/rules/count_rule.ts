import { Dimension, Vector3 } from '@minecraft/server';
import Random from '../../utils/random_utils';
import PlacementRule from './placement_rule'
import Tile from '../tile'

export default class CountRule extends PlacementRule {
    private readonly count: number

    public constructor(count: number) {
        super()
        this.count = count
    }

    public getPositions(tile: Tile, dimension: Dimension, random: Random, origin: Vector3): Vector3[] {
        const positions = []
        for (let i = 0; i < this.count; i++) {
            positions.push(origin)
        }
        return positions
    }
}