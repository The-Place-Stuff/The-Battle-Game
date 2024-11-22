import { world, Dimension, Player, Entity, Vector3, EntityProjectileComponent } from '@minecraft/server'
import { Vector3d, VectorUtils } from '../utils/vector_utils'
import { NON_LIVING_ENTITIES } from '../constants'

const excludeTypes = getExcludedTypes()

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
    if (id == 'battle:perform_death_explosion') {
        performDeathExplosion(entity)
        return
    }
})

world.afterEvents.entityHurt.subscribe(event => {
    const entity = event.hurtEntity

    if (entity.typeId == 'battle:king_jello' && entity.isValid()) {
        entity.playAnimation('animation.king_jello.hurt')
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
    const component = projectile.getComponent('minecraft:projectile') as EntityProjectileComponent
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
            target.applyKnockback(knockbackDir.x, knockbackDir.z, 6, 0.5)
        }
        catch {
            console.warn(target.typeId)
        }
    }
    dimension.spawnParticle('minecraft:knockback_roar_particle', entity.location)
}

function performDeathExplosion(entity: Entity) {
    const dimension = entity.dimension

    for (let i = 0; i < 10; i++) {
        const slime = dimension.spawnEntity('battle:slime', entity.getHeadLocation())
        const velocity: Vector3 = {
            x: (Math.random() - Math.random()) * 2,
            y: 1,
            z: (Math.random() - Math.random()) * 2
        }
        slime.triggerEvent('battle:from_king_jello')
        slime.applyImpulse(velocity)
    }
    dimension.playSound('random.explode', entity.location)
    dimension.spawnParticle('minecraft:huge_explosion_emitter', entity.getHeadLocation())
    entity.remove()
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
    return new Vector3d(target.location.x - entity.location.x, 1, target.location.z - entity.location.z).normalized()
}

function getKnockbackTargets(maxDistance: number, location: Vector3, dimension: Dimension) {
    return dimension.getEntities({
        location, 
        maxDistance,
        excludeTypes
    })
}

function getExcludedTypes() {
    const types = NON_LIVING_ENTITIES
    types.push('battle:king_jello') // King Jello shouldn't be affected by their own projectiles lol
    return types
}