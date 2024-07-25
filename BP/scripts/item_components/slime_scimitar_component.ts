import { ItemCustomComponent, ItemComponentHitEntityEvent, Entity, Dimension } from '@minecraft/server'
import { VectorUtils } from '../utils/vector_utils'


export default class SlimeScimitarComponent implements ItemCustomComponent {

    public constructor() {
        this.onHitEntity = this.onHitEntity.bind(this)
    }

    public onHitEntity(event: ItemComponentHitEntityEvent): void {
        const attacker = event.attackingEntity
        if (!this.canSweep(attacker) || !event.hadEffect) {
            return
        }
        this.performSweep(attacker, event.hitEntity, attacker.dimension)
    }

    private performSweep(attacker: Entity, victim: Entity, dimension: Dimension): void {
        const particleLocation = VectorUtils.divide(VectorUtils.add(attacker.location, victim.location), 2)
        const targets = dimension.getEntities({
            location: attacker.location,
            families: ['monster'],
            maxDistance: 3
        })
        targets.forEach(target => {
            target.addEffect('slowness', 40, { amplifier: 1, showParticles: false })
            dimension.spawnParticle('battle:slime_bubble', target.location)
        })
        dimension.playSound('random.sweep', attacker.location)
        dimension.spawnParticle('battle:sweep', particleLocation)
    }

    private canSweep(attacker: Entity): boolean {
        return attacker.typeId == 'minecraft:player' && !attacker.isFalling && !attacker.isSprinting
    }
}