import { world, Dimension, MolangVariableMap } from '@minecraft/server'

const particleVariables = new MolangVariableMap()
particleVariables.setFloat('emitter_radius', 0.75)
particleVariables.setFloat('velocity_scalar', 2)
particleVariables.setFloat('emitter_intensity', 4)

world.afterEvents.entityDie.subscribe(event => {
    const entity = event.deadEntity
    const familyComponent = entity.getComponent('minecraft:type_family')
    if (!entity.hasComponent('minecraft:type_family')) return

    if (familyComponent.hasTypeFamily('monster')) {
        const dimension = entity.dimension
        
        for (const beacon of searchForBeacon(dimension)) {
            const health = beacon.getComponent('minecraft:health')
            health.setCurrentValue(Math.min(health.effectiveMax, health.currentValue + 5))
        }
    }
})

world.afterEvents.entitySpawn.subscribe(event => {
    const entity = event.entity
    if (entity.typeId != 'battle:beacon') return
    entity.nameTag = '100/100'
})

world.afterEvents.entityHealthChanged.subscribe(event => {
    const entity = event.entity
    if (entity.typeId != 'battle:beacon') return

    const health = entity.getComponent('minecraft:health')
    const dimension = entity.dimension
    const hurt = event.newValue < event.oldValue

    if (hurt) {
        if (getCrackedLevel(event.newValue) != getCrackedLevel(event.oldValue)) {
            dimension.playSound('mob.beacon.crack', entity.location, {
                volume: 5.0,
                pitch: getPitch(event.newValue)
            })
        }
        else {
            dimension.playSound('mob.beacon.hurt', entity.location)
        }
        dimension.spawnParticle('battle:glass_shards', entity.getHeadLocation(), particleVariables)
    }
    entity.nameTag = `${Math.floor(health.currentValue)}/100`
    entity.setProperty('battle:cracked_level', getCrackedLevel(event.newValue))
})

function getPitch(value: number): number {
    const fraction = value / 100

    if (fraction < 0.25) {
        return 0.7
    }
    if (fraction < 0.5) {
        return 0.8
    }
    if (fraction < 0.75) {
        return 0.9
    }
    return 1.0
}

function getCrackedLevel(value: number): string {
    const fraction = value / 100

    if (fraction < 0.25) {
        return 'high'
    }
    if (fraction < 0.5) {
        return 'medium'
    }
    if (fraction < 0.75) {
        return 'low'
    }
    return 'none'
}

function searchForBeacon(dimension: Dimension) {
    return dimension.getEntities({
        type: 'battle:beacon'
    })
}