import { Player, Vector3 } from '@minecraft/server'
import { Volume } from './volume.js'

export class MusicVolume extends Volume {
    private track: string

    public constructor(track: string, from: Vector3, to: Vector3) {
        super(from, to)
        this.track = track
    }

    public onEnter(player: Player): void {
        player.playMusic(this.track, {
            volume: 1.0,
            fade: 0.5,
            loop: true
        })
    }

    public onTick(player: Player): void {

    }
    
    public onExit(player: Player): void {
        player.stopMusic()
    }
}