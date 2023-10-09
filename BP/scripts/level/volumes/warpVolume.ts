import { Player, Vector3 } from '@minecraft/server'
import { Volume } from './volume.js'

export class WarpVolume extends Volume {
    private warpLocation: Vector3

    public constructor(warpLocation: Vector3, from: Vector3, to: Vector3) {
        super(from, to)
        this.warpLocation = warpLocation
    }

    public onEnter(player: Player): void {
        player.teleport(this.warpLocation, {
            checkForBlocks: false,
            dimension: player.dimension,
            rotation: player.location
        })
    }

    public onTick(player: Player): void {
        
    }
    
    public onExit(player: Player): void {

    }
}