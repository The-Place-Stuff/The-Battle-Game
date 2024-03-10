import { Dimension, Vector3 } from '@minecraft/server'
import { DecoratorChoice } from '../../types'
import Tile from '../tile'
import Decorator from './decorator'
import Random from '../../utils/random_utils'

export default class WeightedRandomDecorator extends Decorator {
    private readonly choices: DecoratorChoice[]

    public constructor(choices: DecoratorChoice[]) {
        super()
        this.choices = choices
    }

    public place(tile: Tile, dimension: Dimension, random: Random, origin: Vector3): void {
        const raffle: Decorator[] = []
        for (const choice of this.choices) {
            for (let i = 0; i < choice.weight; i++) {
                raffle.push(choice.decorator)
            }
        }
        const selection = raffle[random.nextInt(raffle.length)]
        if (selection) {
            selection.place(tile, dimension, random, origin)
        }
    }
}