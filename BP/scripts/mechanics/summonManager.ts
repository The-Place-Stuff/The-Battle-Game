import { world, Player, Entity, EntityQueryOptions, GameMode, EntityInitializationCause } from '@minecraft/server'
import { ITEM_TO_SUMMON } from '../util/constants'

const cooldownCriteria: EntityQueryOptions = { 
    excludeGameModes: [GameMode.creative, GameMode.spectator]
}    

/**
 * Handles the cooldown logic.
 */
world.beforeEvents.itemUse.subscribe(async event => {
    const owner = event.source
    const stack = event.itemStack
    if (!ITEM_TO_SUMMON.has(stack.typeId)) return

    if (owner.getItemCooldown('summon') > 0) {
        event.cancel = true
    }
})

/**
 * Handles the summoning logic.
 */
world.afterEvents.itemUse.subscribe(async event => {
    const owner = event.source
    const stack = event.itemStack
    const summonId = owner.getDynamicProperty('the_battle_game:summon') as string
    const newSummonId = ITEM_TO_SUMMON.get(stack.typeId)

    if (!ITEM_TO_SUMMON.has(stack.typeId)) return

    if (newSummonId == summonId || summonId != 'none') {
        const summon = getSummon(owner, summonId)

        if (!summon) {
            owner.setDynamicProperty('the_battle_game:summon', 'none')
            return
        }
        summon.triggerEvent('the_battle_game:instant_despawn')
        world.playSound(`mob.${summonId}.despawn`, owner.location, { pitch: 1.0, volume: 1.0 })

        if (newSummonId == summonId) {
            owner.setDynamicProperty('the_battle_game:summon', 'none')
            if (owner.matches(cooldownCriteria)) {
                owner.startItemCooldown('summon', 1200)
            }
            return
        }
    }
    createSummon(owner, newSummonId)
})

/**
 * Applies a cooldown to the owner when their summon dies.
 */
world.afterEvents.entityDie.subscribe(event => {
    const entity = event.deadEntity
    const owner = getOwner(entity)

    if (!owner) return
    owner.setDynamicProperty('the_battle_game:summon', 'none')
    if (owner.matches(cooldownCriteria)) {
        owner.startItemCooldown('summon', 1200)
    }
})

/**
 * Spawns in the summon manager and configures its owner and transforms into the correct summon.
 */
function createSummon(owner: Player, summonId: string): void {
    const dimension = owner.dimension
    const summonManager = dimension.spawnEntity('the_battle_game:summon_manager', owner.location)
    const projectileComponent = summonManager.getComponent('minecraft:projectile')
    projectileComponent.owner = owner

    summonManager.nameTag = `${owner.name}'s Summon`
    summonManager.triggerEvent(`the_battle_game:transform_into_${summonId}`)
    owner.setDynamicProperty('the_battle_game:summon', summonId)
}

/**
 * Looks for the specified player's summon
 */
function getSummon(owner: Player, summonId: string): Entity {
    const searchOptions: EntityQueryOptions = {
        type: `the_battle_game:${summonId}_summon`
    }
    const summons = owner.dimension.getEntities(searchOptions)
    return summons.find(summon => summon.nameTag.startsWith(owner.name))
}

/**
 * Looks for the specified summon's owner
 */
function getOwner(summon: Entity): Player {
    const players = world.getAllPlayers()
    return players.find(player => summon.nameTag.startsWith(player.name))
}