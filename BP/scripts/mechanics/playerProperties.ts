import { world } from '@minecraft/server'

world.afterEvents.playerSpawn.subscribe(event => {
    const player = event.player
    const pet = player.getDynamicProperty('Pet')
    
    player.setDynamicProperty('Volume', 'none')
    player.setDynamicProperty('OldVolume', 'none')

    if (pet == undefined) {
        player.setDynamicProperty('Pet', 'none')
    }
})