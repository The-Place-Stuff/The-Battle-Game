import { world } from '@minecraft/server'

const ITEM_TO_PET: Map<string, string> = new Map()

ITEM_TO_PET.set('rpg:bottled_allay', 'allay')
ITEM_TO_PET.set('rpg:loyal_bone', 'wolf')
ITEM_TO_PET.set('rpg:foreign_diamond', 'bootrap')

world.afterEvents.itemUse.subscribe(async event => {
    const owner = event.source
    const stack = event.itemStack
    const currentPet = owner.getDynamicProperty('Pet') as string
    const newPet = ITEM_TO_PET.get(stack.typeId)

    if (!ITEM_TO_PET.has(stack.typeId)) return

    if (newPet == currentPet || currentPet != 'none') {
        await owner.runCommandAsync(`event entity @e[tag=${owner.nameTag}] rpg:instant_despawn`)
        world.playSound(`mob.${currentPet}.despawn`, owner.location, { pitch: 1.0, volume: 1.0 })

        if (newPet == currentPet) {
            owner.setDynamicProperty('Pet', 'none')
            return
        }
    }
    owner.triggerEvent(`rpg:spawn_pet_${newPet}`)
    await owner.runCommandAsync(`tag @e[c=1,type=rpg:pet_${newPet},r=5] add ${owner.nameTag}`)
    owner.setDynamicProperty('Pet', newPet)
    world.playSound(`mob.${newPet}.summon`, owner.location, { pitch: 1.0, volume: 1.0 })
})