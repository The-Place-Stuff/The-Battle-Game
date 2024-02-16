import { world, system, Player } from '@minecraft/server'
import { VOLUMES } from '../util/constants'

system.runInterval(() => world.getAllPlayers().forEach(tick), 1)

function tick(player: Player) {
    const currentVolume = player.getDynamicProperty('the_battle_game:volume') as string
    const previousVolume = player.getDynamicProperty('the_battle_game:previous_volume') as string

    if (previousVolume != currentVolume && previousVolume != 'none') {
        if (VOLUMES.has(previousVolume)) {
            VOLUMES.get(previousVolume).onExit(player)
        }
    }
    player.setDynamicProperty('Volume', 'none')

    for (const [id, volume] of VOLUMES) {
        if (!volume.contains(player)) continue

        player.setDynamicProperty('Volume', id)
        volume.onTick(player)

        if (currentVolume != previousVolume) {
            if (currentVolume != 'none') {
                volume.onEnter(player)
            }
        }
    }
    player.setDynamicProperty('the_battle_game:previous_volume', currentVolume)
}
