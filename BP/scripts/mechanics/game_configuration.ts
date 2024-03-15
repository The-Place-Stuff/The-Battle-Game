import { world } from '@minecraft/server'

world.afterEvents.playerSpawn.subscribe(event => {
    const player = event.player
    
    player.setDynamicProperty('battle:volume', 'none')
    player.setDynamicProperty('battle:previous_volume', 'none')
})

world.afterEvents.worldInitialize.subscribe(event => {
    world.gameRules.keepInventory = true
    world.gameRules.showCoordinates = true
    world.gameRules.doMobSpawning = false
    world.gameRules.showTags = false
    world.gameRules.pvp = false
    world.gameRules.recipesUnlock = false
    world.gameRules.doLimitedCrafting = true
    world.gameRules.doMobSpawning = false
    world.gameRules.mobGriefing = false
    world.gameRules.doWeatherCycle = false
})