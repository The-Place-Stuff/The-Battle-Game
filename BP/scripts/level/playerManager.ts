import { world, Player } from '@minecraft/server'
import { Level } from './level.js'

export class PlayerManager {
    private level: Level

    public constructor(level: Level) {
        this.level = level

        world.afterEvents.playerJoin.subscribe(event => this.onPlayerJoin(event.playerId, event.playerName))
        world.afterEvents.playerSpawn.subscribe(event => this.onPlayerSpawn(event.player, event.initialSpawn))
        world.afterEvents.playerLeave.subscribe(event => this.onPlayerLeave(event.playerId, event.playerName))

        world.afterEvents.entityDie.subscribe(event => {
            if (event.deadEntity.typeId == 'minecraft:player') {
                this.onPlayerDeath(event.deadEntity as Player)
            }
        })
    }

    public onPlayerJoin(id: string, name: string) {
        
    }

    public onPlayerSpawn(player: Player, initialSpawn: boolean): void {
        player.setDynamicProperty('CurrentVolume', 'none')
        player.setDynamicProperty('OldVolume', 'none')
    }

    public onPlayerDeath(player: Player) {

    }

    public onPlayerLeave(id: string, name: string) {

    }
}