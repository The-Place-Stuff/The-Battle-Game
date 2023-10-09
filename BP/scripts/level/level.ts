import { world, system, Player } from '@minecraft/server'
import { Volume } from './volumes/volume.js'
import * as Volumes from './volumes/volumes.js'
import { PlayerManager } from './playerManager.js'

export class Level {
    private volumes: Map<string, Volume> = new Map()
    private playerManager: PlayerManager

    public constructor() {
        system.runInterval(() => this.tick(), 1)
        this.playerManager = new PlayerManager(this)
        this.createVolumes(this.volumes)
    }

    private tick(): void {
        world.getAllPlayers().forEach(player => {
            this.tickVolumes(player)
        })
    }

    private tickVolumes(player: Player): void {
        const currentVolume = player.getDynamicProperty('CurrentVolume') as string
        const oldVolume = player.getDynamicProperty('OldVolume') as string

        if (this.volumes.size == 0) return

        if (currentVolume != oldVolume && oldVolume != 'none') {
            this.volumes.get(oldVolume).onExit(player)
        }
        player.setDynamicProperty('CurrentVolume', 'none')

        for (const [id, volume] of this.volumes) {
            if (!volume.contains(player)) continue

            player.setDynamicProperty('CurrentVolume', id)
            volume.onTick(player)

            if (currentVolume != oldVolume) {
                if (currentVolume != 'none') {
                    volume.onEnter(player)
                }
            }
        }
        player.setDynamicProperty('OldVolume', currentVolume)
    }

    private createVolumes(volumes: Map<string, Volume>): void {
        volumes.set('plains_music', Volumes.PLAINS_MUSIC)
        volumes.set('warp_to_plains', Volumes.WARP_TO_PLAINS)
    }
}