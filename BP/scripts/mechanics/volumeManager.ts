import { world, system, Player } from '@minecraft/server'

import { Volume } from '../volumes/volume.js'
import * as Volumes from '../volumes/volumes.js'

const VOLUMES: Map<string, Volume> = new Map()
VOLUMES.set('warp_to_plains', Volumes.WARP_TO_PLAINS)

system.runInterval(() => world.getAllPlayers().forEach(tick), 1)

function tick(player: Player) {
    const currentVolume = player.getDynamicProperty('rpg:volume') as string
    const previousVolume = player.getDynamicProperty('rpg:previous_volume') as string

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
    player.setDynamicProperty('rpg:previous_volume', currentVolume)
}
