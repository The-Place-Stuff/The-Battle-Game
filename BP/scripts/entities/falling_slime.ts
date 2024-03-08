import { world, Dimension, Entity, Vector3 } from '@minecraft/server'

world.afterEvents.projectileHitBlock.subscribe(event => {
    if (event.projectile.typeId != 'battle:falling_slime') return
    if (event.projectile.lifetimeState) {
        onSlimeLand(event.projectile, event.location)
    }
})

world.afterEvents.projectileHitEntity.subscribe(event => {
    if (event.projectile.typeId != 'battle:falling_slime') return
    if (event.projectile.lifetimeState) {
        onSlimeLand(event.projectile, event.location)
    }
})

function onSlimeLand(projectile: Entity, location: Vector3) {
    const component = projectile.getComponent('minecraft:projectile')
    const owner = component.owner
    const dimension = projectile.dimension
    const effectLocation = {
        x: location.x,
        y: location.y + 0.5,
        z: location.z
    }
    if (owner && owner.getProperty('battle:second_phase') as boolean) {
        const targets = getSludgeTargets(effectLocation, dimension)

        for (const target of targets) {
            target.addEffect('slowness', 100)
        }
        dimension.spawnParticle('battle:sludge_wave', {
            x: location.x,
            y: location.y + 0.5,
            z: location.z
        })
    }
    const slime = dimension.spawnEntity('battle:slime', location)
    slime.triggerEvent('battle:from_king_jello')
    dimension.spawnParticle('battle:small_stomp_emitter', effectLocation)
    world.playSound('mob.falling_slime.land', location)
    projectile.remove()
}

function getSludgeTargets(location: Vector3, dimension: Dimension) {
    return dimension.getEntities({
        location,
        type: 'minecraft:player',
        maxDistance: 6
    })
}