import { world, system, Player, Entity, EntityQueryOptions } from '@minecraft/server'

const ITEM_TO_PET: Map<string, string> = new Map()

ITEM_TO_PET.set('rpg:bottled_allay', 'allay')
ITEM_TO_PET.set('rpg:loyal_bone', 'wolf')
ITEM_TO_PET.set('rpg:foreign_diamond', 'bootrap')


world.afterEvents.itemUse.subscribe(async event => {
    const owner = event.source
    const stack = event.itemStack
    const petID = owner.getDynamicProperty('rpg:pet') as string
    const newPetID = ITEM_TO_PET.get(stack.typeId)

    if (!ITEM_TO_PET.has(stack.typeId)) return

    if (newPetID == petID || petID != 'none') {
        const currentPet = getPet(owner, petID)

        if (!currentPet) {
            owner.setDynamicProperty('rpg:pet', 'none')
            return
        }
        currentPet.triggerEvent('rpg:instant_despawn')
        world.playSound(`mob.${petID}.despawn`, owner.location, { pitch: 1.0, volume: 1.0 })

        if (newPetID == petID) {
            owner.setDynamicProperty('rpg:pet', 'none')
            return
        }
    }
    summonPetMaster(owner, newPetID)

    owner.setDynamicProperty('rpg:pet', newPetID)
    world.playSound(`mob.${newPetID}.summon`, owner.location)
})

function getPet(owner: Player, petID: string): Entity {
    const searchOptions: EntityQueryOptions = {
        type: `rpg:pet_${petID}`
    }
    return owner.dimension.getEntities(searchOptions)[0]
}


function summonPetMaster(owner: Player, petID: string): void {
    const dimension = owner.dimension
    const pet = dimension.spawnEntity('rpg:pet_summoner', owner.location)
    const projectileComponent = pet.getComponent('minecraft:projectile')
    projectileComponent.owner = owner

    pet.triggerEvent(`rpg:transform_into_${petID}`)
    pet.addTag(owner.name)
}