import { world, Dimension, Player, Entity, Vector, Vector3 } from '@minecraft/server'

world.afterEvents.dataDrivenEntityTrigger.subscribe(event => {
    const entity = event.entity
    const id = event.eventId

    if (entity.typeId != 'rpg:king_jello') return
    
    if (id == 'rpg:perform_stomp_attack') {
        performStompAttack(entity)
        return
    }
    if (id == 'rpg:summon_minion') {
        summonMinion(entity)
        return
    }
    if (id == 'rpg:perform_knockback_roar') {
        performKnockbackRoar(entity)
        return
    }
})

function performStompAttack(entity: Entity) {
    const dimension = entity.dimension
    for (const target of getKnockbackTargets(entity.location, dimension)) {
        const knockbackDir = getLaunchDirection(entity, target)
        target.applyKnockback(knockbackDir.x, knockbackDir.z, 3, 0.5)
    }
    dimension.spawnParticle('rpg:stomp_emitter', { x: entity.location.x, y: entity.location.y + 0.5, z: entity.location.z})
    entity.runCommand('camerashake add @a[r=4] 0.1 0.5 rotational')
}

function summonMinion(entity: Entity) {
    const dimension = entity.dimension
    const projectile = dimension.spawnEntity('rpg:falling_slime', {
        x: entity.location.x,
        y: entity.location.y + 5,
        z: entity.location.z
    })
    const component = projectile.getComponent('minecraft:projectile')
    const target = getTarget(entity.location, dimension)
    let shootVelocity
    
    if (!target) {
        shootVelocity = new Vector(0, 4, 0)
    }
    else {
        const shootDir = getLaunchDirection(entity, target)
        const distance = Vector.distance(entity.location, target.location)
        shootVelocity = Vector.add(Vector.multiply(shootDir, { x: distance / 32, y: 0, z: distance / 32}), new Vector(0, 2, 0))
    }
    component.gravity = 0.1
    component.owner = entity
    component.shoot(shootVelocity, {
        uncertainty: 1
    })
}

function performKnockbackRoar(entity: Entity) {
    const dimension = entity.dimension
    for (const target of getKnockbackTargets(entity.location, dimension)) {
        const knockbackDir = getLaunchDirection(entity, target)
        try {
            target.applyKnockback(knockbackDir.x, knockbackDir.z, 3, 0.5)
        }
        catch {
            console.warn(target.typeId)
        }
        
    }
    dimension.spawnParticle('minecraft:knockback_roar_particle', entity.location)
}

function getTarget(location: Vector3, dimension: Dimension): Player {
    const targets = dimension.getEntities({
        location,
        type: 'minecraft:player',
        maxDistance: 100
    })
    return targets[Math.floor(Math.random() * (targets.length - 1))] as Player
}

function getLaunchDirection(entity: Entity, target: Entity): Vector3 {
    return new Vector(target.location.x - entity.location.x, 0, target.location.z - entity.location.z).normalized()
}

function getKnockbackTargets(location: Vector3, dimension: Dimension) {
    return dimension.getEntities({
        location,
        excludeTypes: [
            'minecraft:arrow',
            'rpg:falling_slime',
            'minecraft:item'
        ],
        maxDistance: 7
    })
}