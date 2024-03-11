import { world, Dimension, Player, Entity, Vector3, GameMode } from '@minecraft/server'
import { Vector3d, VectorUtils } from '../utils/vector_utils'

world.afterEvents.dataDrivenEntityTrigger.subscribe(event => {
    const entity = event.entity
    const id = event.eventId

    if (entity.typeId != 'battle:king_jello') return
    
    if (id == 'battle:perform_stomp_attack') {
        performStompAttack(entity)
        return
    }
    if (id == 'battle:summon_minion') {
        summonMinion(entity)
        return
    }
    if (id == 'battle:perform_knockback_roar') {
        performKnockbackRoar(entity)
        return
    }
})

function performStompAttack(entity: Entity) {
    const dimension = entity.dimension
    for (const target of getKnockbackTargets(5, entity.location, dimension)) {
        const knockbackDir = getLaunchDirection(entity, target)
        try {
            target.applyKnockback(knockbackDir.x, knockbackDir.z, 6, 0.25)
        }
        catch {
            console.warn(target.typeId)
        }
    }
    dimension.spawnParticle('battle:stomp_emitter', { x: entity.location.x, y: entity.location.y + 0.5, z: entity.location.z})
    entity.runCommand('camerashake add @a[r=4] 0.1 0.5 rotational')
}

function summonMinion(entity: Entity) {
    const dimension = entity.dimension
    const projectile = dimension.spawnEntity('battle:falling_slime', {
        x: entity.location.x,
        y: entity.location.y + 5,
        z: entity.location.z
    })
    const component = projectile.getComponent('minecraft:projectile')
    const target = getTarget(entity.location, dimension)
    let shootVelocity
    
    if (!target) {
        shootVelocity = new Vector3d(0, 4, 0)
    }
    else {
        const shootDir = getLaunchDirection(entity, target)
        const distance = VectorUtils.distance(entity.location, target.location)
        shootVelocity = VectorUtils.add(VectorUtils.multiply(shootDir, { x: distance / 32, y: 0, z: distance / 32}), new Vector3d(0, 2, 0))
    }
    component.gravity = 0.1
    component.owner = entity
    component.shoot(shootVelocity, {
        uncertainty: 1
    })
}

function performKnockbackRoar(entity: Entity) {
    const dimension = entity.dimension
    for (const target of getKnockbackTargets(7, entity.location, dimension)) {
        const knockbackDir = getLaunchDirection(entity, target)
        try {
            target.applyKnockback(knockbackDir.x, knockbackDir.z, 6, 0.25)
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
    return new Vector3d(target.location.x - entity.location.x, 0, target.location.z - entity.location.z).normalized()
}

function getKnockbackTargets(maxDistance: number, location: Vector3, dimension: Dimension) {
    return dimension.getEntities({
        location,
        excludeTypes: [
            'minecraft:arrow',
            'battle:falling_slime',
            'minecraft:item'
        ],
        excludeGameModes: [
            GameMode.creative,
            GameMode.spectator
        ],
        maxDistance
    })
}