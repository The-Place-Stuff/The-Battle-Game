import { world, Player } from '@minecraft/server'

world.afterEvents.playerSpawn.subscribe(event => {
    const player = event.player
    const pet = player.getDynamicProperty('Pet')
    
    player.setDynamicProperty('Volume', 'none')
    player.setDynamicProperty('OldVolume', 'none')

    if (pet == undefined) {
        player.setDynamicProperty('Pet', 'none')
    }
})

function printAllProperties(player: Player) {
    world.sendMessage('-------------------------------')
    player.getDynamicPropertyIds().forEach(property => {
        world.sendMessage(`${property}: ${player.getDynamicProperty(property)}`)
    })
}

world.afterEvents.itemUse.subscribe(event => {
    const player = event.source
    const stack = event.itemStack

    if (stack.typeId != 'minecraft:stick' || !player.hasTag('debug')) return

    printAllProperties(player)    
})