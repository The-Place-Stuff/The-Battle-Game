import { world, system, Player } from '@minecraft/server'
import { VOLUMES } from '../constants'

system.runInterval(() => world.getAllPlayers().forEach(tick), 1)

function tick(player: Player) {
    const currentVolume = player.getDynamicProperty('battle:volume') as string
    const previousVolume = player.getDynamicProperty('battle:previous_volume') as string

    if (previousVolume != currentVolume && previousVolume != 'none') {
        if (VOLUMES.has(previousVolume)) {
            VOLUMES.get(previousVolume).onExit(player)
        }
    }
    player.setDynamicProperty('battle:volume', 'none')

    for (const [id, volume] of VOLUMES) {
        if (!volume.isInside(player.location)) continue

        player.setDynamicProperty('Volume', id)
        volume.onTick(player)

        if (currentVolume != previousVolume) {
            if (currentVolume != 'none') {
                volume.onEnter(player)
            }
        }
    }
    player.setDynamicProperty('battle:previous_volume', currentVolume)
}
