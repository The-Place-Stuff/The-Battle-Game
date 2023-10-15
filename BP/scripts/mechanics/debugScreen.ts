import { world, Player } from '@minecraft/server'
import { ActionFormData, ModalFormData } from '@minecraft/server-ui'

const debugUI = new ActionFormData()
debugUI.title('Debug Features')
debugUI.button('View World Properties')
debugUI.button('View Player Properties')

const playerViewerUI = new ModalFormData()
playerViewerUI.title('Player Property Viewer')
playerViewerUI.textField('Target', 'Insert name here', '')

world.afterEvents.itemUse.subscribe(async event => {
    const player = event.source
    const stack = event.itemStack

    if (stack.typeId != 'minecraft:stick') return
    
    const debugResponse = await debugUI.show(player)

    if (debugResponse.selection == 0) {
        printAllWorldProperties()
    }
    if (debugResponse.selection == 1) {
        showPlayerSelection(player)
    }
})

async function showPlayerSelection(player: Player) {
    const playerSelectionUI = new ActionFormData()
    const players = world.getAllPlayers()

    playerSelectionUI.title('View Player Properties')
    playerSelectionUI.body('Select a player')

    for (const player of players) {
        playerSelectionUI.button(player.name)
    }
    const response = await playerSelectionUI.show(player)
    
    if (!response.canceled) {
        printAllProperties(players[response.selection])
    }
}

function printAllWorldProperties() {
    world.sendMessage('Showing properties of world:')
    world.getDynamicPropertyIds().forEach(property => {
        world.sendMessage(`* ${property}: ${world.getDynamicProperty(property)}`)
    })
}

function printAllProperties(player: Player) {
    world.sendMessage(`Showing properties of ${player.name}:`)
    player.getDynamicPropertyIds().forEach(property => {
        world.sendMessage(`* ${property}: ${player.getDynamicProperty(property)}`)
    })
}
