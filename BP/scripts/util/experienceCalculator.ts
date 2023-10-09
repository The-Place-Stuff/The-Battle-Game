import { world } from '@minecraft/server'
import { ModalFormData } from '@minecraft/server-ui'

world.afterEvents.itemUse.subscribe(async event => {
    const stack = event.itemStack
    const player = event.source

    if (player.hasTag('debug') && stack.typeId == 'minecraft:netherite_axe') {
        const ui = new ModalFormData()

        ui.slider('XP Amount', 0, 50, 1, 0)
        const uiResult = await ui.show(player)

        const sliderInput = uiResult.formValues[0]

        world.sendMessage(`The amount of xp required to level up from ${sliderInput} is ${calculateDifference(sliderInput)}`)
        world.sendMessage(`The total experience required is ${calculateTotal(sliderInput)}`)
    }
})

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