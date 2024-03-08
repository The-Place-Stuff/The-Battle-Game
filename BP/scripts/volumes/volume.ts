import { Vector3, BlockVolume, Player } from '@minecraft/server'

export default abstract class Volume extends BlockVolume {

    public constructor(from: Vector3, to: Vector3) {
        super(from, to)
    }

    public abstract onEnter(player: Player): void

    public abstract onTick(player: Player): void

    public abstract onExit(player: Player): void
}