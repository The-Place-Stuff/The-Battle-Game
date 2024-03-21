import { world, EntityDamageCause, Player, Entity } from '@minecraft/server'
import { VectorUtils } from '../utils/vector_utils'
import { NON_LIVING_ENTITIES } from '../constants'

world.afterEvents.itemReleaseUse.subscribe(event => {
    if (event.itemStack.typeId != 'battle:spear') return

    const user = event.source
    const dimension = user.dimension
    const useDuration = 3600 - event.useDuration
    const damage = Math.min(6, Math.floor((useDuration / 5) + 3))

    const jabTargets = user.getEntitiesFromViewDirection({
        maxDistance: 4
    })
    for (const target of jabTargets) {
        const entity = target.entity
        if (!entity.matches({excludeTypes: NON_LIVING_ENTITIES})) continue

        const finalDamage = calculateFinalDamage(damage, target.distance)
        if (damage >= 6) {
            knockback(user, entity)
        }
        entity.applyDamage(finalDamage, {
            cause: EntityDamageCause.entityAttack,
            damagingEntity: user
        })
        dimension.playSound('item.spear.land_hit', entity.location, {volume: 0.5})
    }
    dimension.playSound('item.spear.jab', user.location)
})

function knockback(user: Player, target: Entity) {
    const direction = VectorUtils.subtract(target.location, user.location)
    try {
        target.applyKnockback(direction.x, direction.z, 1, 0.2)
    }
    catch {}
}

function calculateFinalDamage(originalDamage: number, distance: number) {
    const drop = Math.ceil(distance / 2)
    return Math.max(originalDamage - drop, 2)
}