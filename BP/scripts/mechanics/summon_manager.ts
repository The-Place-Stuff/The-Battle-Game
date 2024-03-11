import { world } from '@minecraft/server'
import { ITEM_TO_SUMMON } from '../constants'

world.afterEvents.itemUse.subscribe(event => {
    const user = event.source
    const dimension = user.dimension
    const stack = event.itemStack

    if (!ITEM_TO_SUMMON.has(stack.typeId)) {
        return
    }
    const summonId = ITEM_TO_SUMMON.get(stack.typeId)
    const summonManager = dimension.spawnEntity('battle:summon_manager', user.location)
    const projectile = summonManager.getComponent('minecraft:projectile')
    projectile.owner = user
    summonManager.triggerEvent(`battle:transform_into_${summonId}`)
})