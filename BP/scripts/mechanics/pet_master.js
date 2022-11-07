import { world, Player } from '@minecraft/server'

world.events.itemUse.subscribe(event => {
    const player = event.source
    const petActive = player.getDynamicProperty("CurrentPet") != "none"
    const item = event.item

    summonPet("allay", "rpg:bottled_allay")
    summonPet("wolf", "rpg:loyal_bone")
    summonPet("bootrap", "rpg:foreign_diamond")

    function summonPet(identifier = "", itemIdentifier = "", summonSound, despawnSound) {
        const soundOptions = {
            location: player.location, 
            pitch : 1.0, 
            volume : 1.0
        }

        if (item.typeId != itemIdentifier) return

        if (petActive) {
            player.runCommandAsync(`event entity @e[tag=${player.nameTag}] rpg:instant_despawn`)

            if (player.getDynamicProperty("CurrentPet") == identifier) {
                player.setDynamicProperty("CurrentPet", "none")
                world.playSound(`mob.${identifier}.despawn`, soundOptions)
            } else {
                player.triggerEvent("rpg:spawn_pet_" + identifier)
                player.runCommandAsync(`tag @e[c=1,type=rpg:pet_${identifier},r=5] add ${player.nameTag}`)
                player.setDynamicProperty("CurrentPet", identifier)
                world.playSound(`mob.${identifier}.summon`, soundOptions)
            }

        } else {
            player.triggerEvent("rpg:spawn_pet_" + identifier)
            player.runCommandAsync(`tag @e[c=1,type=rpg:pet_${identifier},r=5] add ${player.nameTag}`)
            player.setDynamicProperty("CurrentPet", identifier)
            world.playSound(`mob.${identifier}.summon`, soundOptions)
        }
        console.warn(player.getDynamicProperty("CurrentPet"))
    }
})

world.events.entityHurt.subscribe(event => {

})