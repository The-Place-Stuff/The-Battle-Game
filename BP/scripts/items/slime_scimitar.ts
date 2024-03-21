import { world, Dimension, Player, Entity, Vector3, EquipmentSlot } from '@minecraft/server'

world.afterEvents.entityHurt.subscribe(event => {
    const attacker = event.damageSource.damagingEntity
    const victim = event.hurtEntity

    if (!attacker || attacker.typeId != 'minecraft:player') return
    handleAttack(attacker as Player, victim)
})

function handleAttack(attacker: Player, victim: Entity) {
    const dimension = attacker.dimension
    const equippableComp = attacker.getComponent('minecraft:equippable')
    const mainhandStack = equippableComp.getEquipment(EquipmentSlot.Mainhand)
    
    if (!mainhandStack || mainhandStack.typeId != 'battle:slime_scimitar') return
    if (attacker.isFalling) return

    world.playSound('random.sweep', attacker.location, { pitch: 1.0, volume: 1.0 })
    dimension.spawnParticle('battle:sweep', {
        x: (attacker.location.x + victim.location.x) / 2,
        y: (victim.getHeadLocation().y + victim.location.y) / 2,
        z: (attacker.location.z + victim.location.z) / 2
    })
    for (const monster of findNearbyMonsters(victim.location, dimension)) {
        monster.addEffect('slowness', 40, { amplifier: 1, showParticles: false })
        dimension.spawnParticle('battle:slime_bubble', monster.location)
    }
}

function findNearbyMonsters(searchLocation: Vector3, dimension: Dimension) {
    return dimension.getEntities({
        location: searchLocation,
        families: [ 'monster' ],
        maxDistance: 3
    })
}