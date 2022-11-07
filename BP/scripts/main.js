
import "./weapons/sludgy_slasher.js"

import "./mechanics/lobby.js"
import "./mechanics/mob_spawner.js"
import "./mechanics/pet_master.js"
import "./mechanics/music.js"
import "./mechanics/shops.js"

import "./utility/exp_calculator.js"

import { world, DynamicPropertiesDefinition, EntityTypes, MinecraftEntityTypes } from '@minecraft/server'

world.events.worldInitialize.subscribe(event => {
    const playerProperties = new DynamicPropertiesDefinition()
    playerProperties.defineNumber("MusicInterval")
    playerProperties.defineString("CurrentPet", 500)

    // Settings
    playerProperties.defineBoolean("SettingsJoined")
    playerProperties.defineBoolean("SettingsMusicEnabled")

    const spawnerProperties = new DynamicPropertiesDefinition()
    spawnerProperties.defineNumber("MobSpawnerCapacity")
    
    event.propertyRegistry.registerEntityTypeDynamicProperties(playerProperties, MinecraftEntityTypes.player)
    event.propertyRegistry.registerEntityTypeDynamicProperties(spawnerProperties, EntityTypes.get("rpg:mob_spawner"))
    
    try { 
        world.scoreboard.addObjective("money", "§aEmeralds§r")
    } catch (e) {}
    world.getDimension("overworld").runCommandAsync("scoreboard objectives setdisplay sidebar money")
})

