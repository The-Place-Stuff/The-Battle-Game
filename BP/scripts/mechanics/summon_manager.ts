import { world } from '@minecraft/server'
import { ITEM_TO_SUMMON } from '../constants'
import { VectorUtils } from '../utils/vector_utils'

world.afterEvents.itemUseOn.subscribe(event => {
    const user = event.source
    const dimension = user.dimension
    const faceLocation = event.faceLocation
    const stack = event.itemStack

    if (!ITEM_TO_SUMMON.has(stack.typeId)) {
        return
    }
    const summonId = ITEM_TO_SUMMON.get(stack.typeId)
    const location = event.block.location
    const summonManager = dimension.spawnEntity('battle:summon_manager', VectorUtils.add(location, faceLocation))
    const projectile = summonManager.getComponent('minecraft:projectile')
    projectile.owner = user
    summonManager.triggerEvent(`battle:transform_into_${summonId}`)
})