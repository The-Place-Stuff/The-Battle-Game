import { world } from '@minecraft/server'

world.events.tick.subscribe(event => {
    const tickCount = event.currentTick
    
    for (let player of world.getPlayers()) {

        if (tickCount % 20 == 0 && player.getDynamicProperty("SettingsMusicEnabled")) {
            player.setDynamicProperty("MusicInterval", player.getDynamicProperty("MusicInterval") + 1)
            
            playSong("plains", 150, player)
            playSong("desert", 160, player)
            playSong("king_jello", 80, player)
        }
    }
})

// This makes all joined players reset their music
world.events.playerJoin.subscribe(event => {
    setMusicInterval(event.player, -5)
})

/**
 * @param {entity} The entity to target.
 * @param {number} The value to set.
 */
function setMusicInterval(entity, value) {
    entity.setDynamicProperty("MusicInterval", value)
}

/**
 * @remarks Plays a music track.
 * @param {string} trackId
 * @param {Player} player
 * @param {string} tag
 */
function playSong(identifier, frequency, player) {
    if (!player.hasTag(identifier)) return false
    const tickCount = player.getDynamicProperty("MusicInterval")
    const soundOptions = {
        location : player.location,
        pitch : 1.0,
        volume : 1.0
    }
    if (tickCount % frequency == 0) {
        player.playSound(`music.${identifier}`, soundOptions)
    }
    return true
}