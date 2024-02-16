import { Vector3, BlockVolume, BlockVolumeUtils, Player } from '@minecraft/server'

export default abstract class Volume implements BlockVolume {
    public from: Vector3
    public to: Vector3

    public constructor(from: Vector3, to: Vector3) {
        this.from = from
        this.to = to
    }

    public abstract onEnter(player: Player): void

    public abstract onTick(player: Player): void

    public abstract onExit(player: Player): void

    public contains(player: Player): boolean {
        return BlockVolumeUtils.isInside(this, player.location)
    }
}
