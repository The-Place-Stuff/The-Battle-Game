import { world, BlockLocation } from '@minecraft/server'
import { ModalFormData } from '@minecraft/server-ui'
import {teleportToArea} from '../utility/location.js'

world.events.tick.subscribe(event => {
    for (let player of world.getPlayers()) {
        // Plains Teleporter
        const blockLocation = new BlockLocation(player.location.x, player.location.y, player.location.z)

        if (blockLocation.equals(new BlockLocation(9995, 16, 10017))) {
            teleportToArea(player, 9917, 16, 9987)
        }
    }
})

world.events.entityCreate.subscribe(event => {
    if (event.entity.typeId != "minecraft:player") return
    const player = event.entity

    if (!player.getDynamicProperty("SettingsJoined")) {
        player.setDynamicProperty("SettingsMusicEnabled", true)
    }
    player.setDynamicProperty("SettingsJoined", true)
    
})

world.events.buttonPush.subscribe(event => {
    const player = event.source
    const location = event.block.location
    
    if (!location.equals(new BlockLocation(10000, 17, 9994))) return
    showSettingsUI(player)
})

export function showSettingsUI(player) {
    const settingsUI = new ModalFormData()
    settingsUI.title("Settings")
    settingsUI.toggle("Music", player.getDynamicProperty("SettingsMusicEnabled"))

    settingsUI.show(player).then((result) => {
        if (!result.formValues[0]) {
            player.runCommandAsync(`stopsound @s`)
            player.setDynamicProperty("MusicInterval", -1)
        }
        player.setDynamicProperty("SettingsMusicEnabled", result.formValues[0])
    })
}