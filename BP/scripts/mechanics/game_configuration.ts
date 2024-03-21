import { world } from '@minecraft/server'
import SummonItemComponent from '../components/items/summon_item_component'

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

world.beforeEvents.worldInitialize.subscribe(event => {
    const itemRegistry = event.itemComponentRegistry
    itemRegistry.registerCustomComponent('battle:wolf_summon', new SummonItemComponent('wolf'))
    itemRegistry.registerCustomComponent('battle:allay_summon', new SummonItemComponent('allay'))
    itemRegistry.registerCustomComponent('battle:bootrap_summon', new SummonItemComponent('bootrap'))
})