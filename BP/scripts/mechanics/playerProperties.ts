import { world } from '@minecraft/server'

world.afterEvents.playerSpawn.subscribe(event => {
    const player = event.player
    const pet = player.getDynamicProperty('the_battle_game:pet')
    
    player.setDynamicProperty('the_battle_game:volume', 'none')
    player.setDynamicProperty('the_battle_game:previous_volume', 'none')

    if (!pet) {
        player.setDynamicProperty('the_battle_game:pet', 'none')
    }
})