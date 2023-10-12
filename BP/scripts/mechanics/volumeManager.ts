import { world, system, Player } from '@minecraft/server'

import { Volume } from '../volumes/volume.js'
import * as Volumes from '../volumes/volumes.js'

const VOLUMES: Map<string, Volume> = new Map()

VOLUMES.set('plains_music', Volumes.PLAINS_MUSIC)
VOLUMES.set('warp_to_plains', Volumes.WARP_TO_PLAINS)

system.runInterval(() => world.getAllPlayers().forEach(tick), 1)

function tick(player: Player) {
    const currentVolume = player.getDynamicProperty('Volume') as string
    const oldVolume = player.getDynamicProperty('OldVolume') as string

    if (oldVolume != currentVolume && oldVolume != 'none') {
        VOLUMES.get(oldVolume).onExit(player)
    }
    player.setDynamicProperty('Volume', 'none')

    for (const [id, volume] of VOLUMES) {
        if (!volume.contains(player)) continue

        player.setDynamicProperty('Volume', id)
        volume.onTick(player)

        if (currentVolume != oldVolume) {
            if (currentVolume != 'none') {
                volume.onEnter(player)
            }
        }
    }
    player.setDynamicProperty('OldVolume', currentVolume)
}
