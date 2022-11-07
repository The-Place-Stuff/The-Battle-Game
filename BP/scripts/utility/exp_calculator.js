import { world } from '@minecraft/server'
import { ModalFormData, MessageFormData } from '@minecraft/server-ui'

world.events.itemUse.subscribe(event => {
    const item = event.item
    const player = event.source
    if (player.hasTag("debug") && item.typeId == 'minecraft:netherite_axe') {
        const ui = new ModalFormData()
        ui.slider("XP Amount", 0, 50, 1, 0)
        
        ui.show(player).then(result => {
            const input = result.formValues[0]
            console.warn(calculateDifference(input))
            console.warn(calculateTotal(input))
        })
    }
})


function calculateDifference(level) {
    if (level >= 31) {
        return 9 * level - 158
    } else if (level >= 16) {
        return 5 * level - 38
    } else {
        return 2 * level + 7
    }
}

function calculateTotal(level) {
    if (level >= 32) {
        return 4.5 * Math.pow(level, 2) - 162.5 * level + 2220
    } else if (level >= 17) {
        return 2.5 * Math.pow(level, 2) - 40.5 * level + 360
    } else {
        return Math.pow(level, 2) + 6 * level
    }
}