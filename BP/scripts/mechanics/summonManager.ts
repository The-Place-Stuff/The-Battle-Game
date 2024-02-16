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
    const petID = owner.getDynamicProperty('the_battle_game:summon') as string
    const newPetID = ITEM_TO_SUMMON.get(stack.typeId)

    if (!ITEM_TO_SUMMON.has(stack.typeId)) return

    if (newPetID == petID || petID != 'none') {
        const currentPet = getSummon(owner, petID)

        if (!currentPet) {
            owner.setDynamicProperty('the_battle_game:summon', 'none')
            return
        }
        currentPet.triggerEvent('the_battle_game:instant_despawn')
        world.playSound(`mob.${petID}.despawn`, owner.location, { pitch: 1.0, volume: 1.0 })

        if (newPetID == petID) {
            owner.setDynamicProperty('the_battle_game:summon', 'none')
            if (owner.matches(cooldownCriteria)) {
                owner.startItemCooldown('summon', 1200)
            }
            return
        }
    }
    spawnPet(owner, newPetID)
})

/**
 * Asserts that a summon was spawned with a player's name, marking it as a summon.
 */
world.afterEvents.entitySpawn.subscribe(event => {
    if (event.cause != EntityInitializationCause.Event) return
    const entity = event.entity
    const players = world.getAllPlayers()

    if (players.find(player => player.nameTag == entity.nameTag)) {
        const ownerName = entity.nameTag
        entity.nameTag = ''
        entity.setDynamicProperty('the_battle_game:owner', ownerName)
    }
})

/**
 * Applies a cooldown to the owner when their summon dies.
 */
world.afterEvents.entityDie.subscribe(event => {
    const entity = event.deadEntity
    const players = world.getAllPlayers()
    const owner = players.find(player => player.name == entity.getDynamicProperty('the_battle_game:owner'))
    if (!owner) return
    owner.setDynamicProperty('the_battle_game:summon', 'none')
    if (owner.matches(cooldownCriteria)) {
        owner.startItemCooldown('summon', 1200)
    }
})

/**
 * Looks for an entity with an owner.
 */
function getSummon(owner: Player, petID: string): Entity {
    const searchOptions: EntityQueryOptions = {
        type: `the_battle_game:pet_${petID}`
    }
    const pets = owner.dimension.getEntities(searchOptions)
    return pets.find(pet => pet.getDynamicProperty('the_battle_game:owner') == owner.name)
}

function getOwner()

/**
 * Spawns in the summon manager and configures its owner and transforms into the correct summon.
 */
function spawnPet(owner: Player, petID: string): void {
    const dimension = owner.dimension
    const pet = dimension.spawnEntity('the_battle_game:summon_manager', owner.location)
    const projectileComponent = pet.getComponent('minecraft:projectile')
    projectileComponent.owner = owner

    pet.nameTag = owner.nameTag
    pet.triggerEvent(`the_battle_game:transform_into_${petID}`)
    owner.setDynamicProperty('the_battle_game:summon', petID)
}