import {world} from '@minecraft/server'

export const areaTags = [
    "lobby",
    "plains",
    "plains_village",
    "plains_underground",
    "king_jello",
    "desert"
]

export function teleportTo(player, x, y, z ) {
    player.teleport({x: x, y: y, z: z}, world.getDimension("overworld"), player.rotation.x, player.rotation.y, false)
}

