import { world, Player } from '@minecraft/server'
import { ActionFormData, ModalFormData } from '@minecraft/server-ui'

const debugUI = new ActionFormData()
debugUI.title('Debug Features')
debugUI.button('View World Properties')
debugUI.button('View Player Properties')
debugUI.button('Experience Calculator')

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
    if (debugResponse.selection == 2) {
        showExperienceCalculator(player)
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

async function showExperienceCalculator(player: Player) {
    const ui = new ModalFormData()
    ui.slider('XP Amount', 0, 50, 1, 0)

    const uiResult = await ui.show(player)
    if (!uiResult.canceled) {
        const sliderInput = uiResult.formValues[0]
        player.sendMessage(`The amount of xp required to upgrade from level ${sliderInput} to the next level is ${calculateDifference(sliderInput)}`)
        player.sendMessage(`The total experience required is ${calculateTotal(sliderInput)}`)
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

function calculateDifference(level): number {
    if (level >= 31) {
        return 9 * level - 158
    } else if (level >= 16) {
        return 5 * level - 38
    } else {
        return 2 * level + 7
    }
}

function calculateTotal(level): number {
    if (level >= 32) {
        return 4.5 * Math.pow(level, 2) - 162.5 * level + 2220
    } else if (level >= 17) {
        return 2.5 * Math.pow(level, 2) - 40.5 * level + 360
    } else {
        return Math.pow(level, 2) + 6 * level
    }
}
