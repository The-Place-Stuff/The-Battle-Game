
// REQUIRES TYPESCRIPT PORT, MOST LIKELY REQUIRES COMPLETE REVAMP

import { world, Location } from '@minecraft/server'
import * as ExtraMath from '../utility/math.js'
import { createUUID } from '../utility/uuid.js'

let tickCount = 0
const dimension = world.getDimension("overworld")

world.events.tick.subscribe(event => {
    tickCount = event.currentTick
    for (let entity of dimension.getEntities({type : "rpg:mob_spawner"})) {
        addNightMobSpawn("minecraft:zombie", 200, entity)
        addMobSpawn("rpg:meadow_slime", 200, entity)
    }
})

// Spawns in a mob, no conditions.
function addMobSpawn(identifier = "", frequency = 0, entity = dimension.spawnEntity("", new Location())) {
    const mobId = entity.nameTag
    if (identifier != mobId) return

    if (tickCount % frequency == 0 && entity.getDynamicProperty("MobSpawnerCapacity") > 0) {
        entity.setDynamicProperty("MobSpawnerCapacity", entity.getDynamicProperty("MobSpawnerCapacity") - 1)

        const location = new Location(entity.location.x, entity.location.y + 3, entity.location.z)
        dimension.spawnEntity(mobId, location).addTag(entity.getTags()[0])
    }
}

// Spawns in a mob that only spawns at night.
function addNightMobSpawn(mobId = "", frequency = 0, entity = dimension.spawnEntity("", new Location()))  {
    if (world.getTime() >= 13000 && world.getTime() <= 23000) {
        addMobSpawn(mobId, frequency, entity)
    } 
}

// Gives the spawner entity 
world.events.dataDrivenEntityTriggerEvent.subscribe(event => {
    const entity = event.entity
    if (entity.typeId == "rpg:mob_spawner" && event.id == "minecraft:entity_spawned") {
        entity.addTag(createUUID())
        console.warn("Triggered")
        entity.setDynamicProperty("MobSpawnerCapacity", 5)
    }
})

// Increments the mob spawner capacity when a mob from a spawner dies.
world.events.entityHurt.subscribe(event => {
    const entity = event.hurtEntity
    const healthComponent = entity.getComponent("minecraft:health")

    if (healthComponent.current <= 0) {
        const entityQueryOptions = {
            location : entity.location,
            type : "rpg:mob_spawner"
        }

        for (let owner of dimension.getEntities(entityQueryOptions)) {
            if (entity.getTags()[0] == owner.getTags()[0]) {
                owner.setDynamicProperty("MobSpawnerCapacity", ExtraMath.clamp(owner.getDynamicProperty("MobSpawnerCapacity") + 1, 0, 5))
            }
        }
    }
})
