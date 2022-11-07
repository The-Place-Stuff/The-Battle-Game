import { ActionFormData } from '@minecraft/server-ui' 
import { BlockLocation } from '@minecraft/server'

export function createShop(desc) {
    const ui = new ActionFormData()
    ui.title("Shop").body(desc)
    return ui
}

export function addItem(player, item, sellAmount) {
    player.runCommandAsync(`give @s[scores={money=${sellAmount}}] ${item}`)
    player.runCommandAsync(`scoreboard players remove @s[scores={money=${sellAmount}}] money ${sellAmount}`)
}