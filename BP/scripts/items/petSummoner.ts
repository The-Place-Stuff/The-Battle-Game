import { world, Player, ItemStack, SoundOptions, EntityTameableComponent } from '@minecraft/server'

const PET_TO_ITEM: Map<string, string> = new Map()

PET_TO_ITEM.set('allay', 'rpg:bottled_allay')
PET_TO_ITEM.set('wolf', 'rpg:loyal_bone')
PET_TO_ITEM.set('bootrap', 'rpg:foreign_diamond')

world.afterEvents.itemUse.subscribe(async event => {
    summonPet(event.source, event.itemStack)
})

async function summonPet(owner: Player, stack: ItemStack) {
    const currentPet = owner.getDynamicProperty('CurrentPet')

    if (currentPet == undefined) {
        owner.setDynamicProperty('CurrentPet', 'none')
    }
    
    for (const [petID, item] of PET_TO_ITEM) {
        if (stack.typeId != item) continue

        if (currentPet != 'none') {
            owner.runCommandAsync(`event entity @e[tag=${owner.nameTag}] rpg:instant_despawn`)

            if (owner.getDynamicProperty('CurrentPet') == petID) {
                owner.setDynamicProperty('CurrentPet', 'none')
                world.playSound(`mob.${petID}.despawn`, owner.location, { pitch: 1.0, volume: 1.0 })
            }
            else {
                owner.triggerEvent(`rpg:spawn_pet_${petID}`)
                await owner.runCommandAsync(`tag @e[c=1,type=rpg:pet_${petID},r=5] add ${owner.nameTag}`)
                owner.setDynamicProperty('CurrentPet', petID)
                world.playSound(`mob.${petID}.summon`, owner.location, { pitch: 1.0, volume: 1.0 })
            }
        }
        else {
            owner.triggerEvent(`rpg:spawn_pet_${petID}`)
            await owner.runCommandAsync(`tag @e[c=1,type=rpg:pet_${petID},r=5] add ${owner.nameTag}`)
            owner.setDynamicProperty('CurrentPet', petID)
            world.playSound(`mob.${petID}.summon`, owner.location, { pitch: 1.0, volume: 1.0 })
        }
    }
}