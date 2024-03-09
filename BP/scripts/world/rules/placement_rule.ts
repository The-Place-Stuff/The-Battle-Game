import { Dimension, Vector3 } from '@minecraft/server'
import Random from '../../utils/random_utils'
import Tile from '../tile'

export default abstract class PlacementRule {
    
    public constructor() {
        
    }

    public abstract getPositions(tile: Tile, dimension: Dimension, random: Random, origin: Vector3): Vector3[]
}