import { Dimension, Vector3 } from '@minecraft/server'
import Decorator from './decorator'
import Tile from '../tile'
import Random from '../../utils/random_utils'
import PlacementRule from '../rules/placement_rule'


export default class PlacedDecorator {
    private readonly decorator: Decorator
    private readonly rules: PlacementRule[]

    public constructor(decorator: Decorator, rules: PlacementRule[]) {
        this.decorator = decorator
        this.rules = rules
    }
    
    public place(tile: Tile, dimension: Dimension, random: Random, origin: Vector3): void {
        let positions = [origin]
        
        for (const rule of this.rules) {
            positions = positions.flatMap(pos => rule.getPositions(tile, dimension, random, pos))
        }
        const decorator = this.decorator
        for (const position of positions) {
            decorator.place(tile, dimension, random, position)
        }
    }
}