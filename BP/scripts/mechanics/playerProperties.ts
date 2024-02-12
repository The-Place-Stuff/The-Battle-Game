import { world } from '@minecraft/server'

world.afterEvents.playerSpawn.subscribe(event => {
    const player = event.player
    const pet = player.getDynamicProperty('rpg:pet')
    
    player.setDynamicProperty('rpg:volume', 'none')
    player.setDynamicProperty('rpg:previous_volume', 'none')

    if (!pet) {
        player.setDynamicProperty('rpg:pet', 'none')
    }
})