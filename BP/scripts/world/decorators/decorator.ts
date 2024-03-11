import { Dimension, Vector3 } from '@minecraft/server'
import Tile from '../tile'
import Random from '../../utils/random_utils'

export default abstract class Decorator {

    public abstract place(tile: Tile, dimension: Dimension, random: Random, origin: Vector3): void
}