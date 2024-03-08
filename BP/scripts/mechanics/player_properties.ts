import { world } from '@minecraft/server'

world.afterEvents.playerSpawn.subscribe(event => {
    const player = event.player
    
    player.setDynamicProperty('battle:volume', 'none')
    player.setDynamicProperty('battle:previous_volume', 'none')
})