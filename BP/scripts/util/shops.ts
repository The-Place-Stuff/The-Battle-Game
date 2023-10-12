import { ActionFormData } from '@minecraft/server-ui'
import { Player } from '@minecraft/server'

export function createShop(desc: string) {
    const ui = new ActionFormData()
    ui.title('Shop').body(desc)
    return ui
}

export function addItem(player: Player, item: string, cost: number) {
    player.runCommand(`give @s[scores={money=${cost}}] ${item}`)
    player.runCommand(`scoreboard players remove @s[scores={money=${cost}}] money ${cost}`)
}