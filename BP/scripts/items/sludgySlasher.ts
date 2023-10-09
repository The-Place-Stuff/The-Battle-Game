import { world, Dimension, Player, MolangVariableMap, Vector3, EntityInventoryComponent } from '@minecraft/server'

world.afterEvents.entityHitEntity.subscribe(event => {
    if (event.damagingEntity.typeId != "minecraft:player") return
    if (event.hitEntity == null) return

    const player = event.damagingEntity as Player
    const dimension = player.dimension
    const target = event.hitEntity

    const inventoryComponent = player.getComponent("minecraft:inventory") as EntityInventoryComponent

    const sludgySlasher = inventoryComponent.container.getItem(player.selectedSlot)
    if (sludgySlasher == undefined) return
    
    if (horizontalLength(player.getVelocity()) >= 0.15) return
    if (player.getItemCooldown("sludgy_slasher") > 0) return
    if (sludgySlasher.typeId != 'rpg:sludgy_slasher') return

    player.startItemCooldown("sludgy_slasher", 20)
    world.playSound("random.sweep", player.location, {
        pitch: 1.0,
        volume: 1.0
    })
    player.runCommandAsync("particle rpg:sweep ^ ^1.5 ^1")
    
    for (let entity of findNearbyMonsters(target.location, dimension)) {
        entity.addEffect('slowness', 20, {
            amplifier: 5,
            showParticles: false
        })
        dimension.spawnParticle("rpg:sludged", entity.location, new MolangVariableMap())
    }
})

function findNearbyMonsters(searchLocation: Vector3, dimension: Dimension) {
    return dimension.getEntities({
        location: searchLocation,
        families: [ 'monster' ],
        maxDistance: 2
    })
}

function horizontalLength(vector: Vector3) {
    return Math.sqrt(vector.x * vector.x + vector.z * vector.z)
}