import { world, MinecraftEffectTypes, MolangVariableMap, Location } from '@minecraft/server'

world.events.entityHit.subscribe(event => {
    const target = event.hitEntity
    const player = event.entity
    
    if (player.typeId != "minecraft:player") return
    if (event.hitEntity == null) return

    const inventoryComponent = player.getComponent("minecraft:inventory")
    const sludgySlasher = inventoryComponent.container.getItem(player.selectedSlot)
    if (sludgySlasher == undefined) return
    const dimension = player.dimension
    
    const soundOptions = {
        location : player.location,
        pitch : 1.0,
        volume : 1.0
    }
    const entityQueryOptions = {
        location : target.location,
        families : [ "monster" ],
        maxDistance : 2
    }

    if (player.velocity.length() >= 0.15) return
    if (player.getItemCooldown("sludgy_slasher") > 0) return
    if (sludgySlasher.typeId != 'rpg:sludgy_slasher') return

    player.startItemCooldown("sludgy_slasher", 20)
    world.playSound("random.sweep", soundOptions)
    player.runCommandAsync("particle rpg:sweep ^ ^1.5 ^1")
    
    for (let entity of dimension.getEntities(entityQueryOptions)) {
        entity.addEffect(MinecraftEffectTypes.slowness, 20, 5, false)
        dimension.spawnParticle("rpg:sludged", entity.location, new MolangVariableMap())
    }
})