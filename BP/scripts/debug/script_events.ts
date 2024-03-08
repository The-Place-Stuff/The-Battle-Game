import { world, system, Player, ItemStack, StructureRotation, StructureMirrorAxis, ScriptEventSource, Block } from '@minecraft/server'
import Arena from'../world/arena'
import { DEFAULT_ITEM_STACKS } from '../constants'



system.afterEvents.scriptEventReceive.subscribe(event => {
    const sender = event.sourceEntity
    const id = event.id
    const message = event.message

    if (sender instanceof Player) {
        if (id == 'battle:toggle_debug') {
            toggleDebug(sender)
        }
        if (id == 'battle:give_item') {
            giveItem(sender, message)
        }
        if (id == 'debug:place_structure') {
            debugPlaceStructure(sender, message.split(' '))
        }
        if (id == 'battle:build_arena') {
            buildArena(sender, message.split(' '))
        }
    }
    if (event.sourceType == ScriptEventSource.Block) {
        if (id == 'debug:place_structure') {
            debugPlaceStructure(event.sourceBlock, message.split(' '))
        }
    }
})

function giveItem(sender: Player, itemId: string) {
    if (!DEFAULT_ITEM_STACKS.has(itemId)) {
        sender.sendMessage(`${itemId} does not have a registered default item stack.`)
        return
    }
    const defaultItem = DEFAULT_ITEM_STACKS.get(itemId)
    const dimension = sender.dimension
    
    const itemStack = new ItemStack(itemId, 1)
    itemStack.setLore(defaultItem.lore)

    dimension.spawnItem(itemStack, sender.location)
}

function toggleDebug(sender: Player) {
    world.setDynamicProperty('battle:debug_world', !world.getDynamicProperty('battle:debug_world'))
    sender.sendMessage(`Debug Mode: ${world.getDynamicProperty('battle:debug_world')}`)
}

async function buildArena(sender: Player, args: string[]) {
    const id = args[0]
    const size = args[1]

    const arena = new Arena(id, Number.parseInt(size))
    await arena.build(sender.location)
    sender.sendMessage('Arena has finished building!')
}

function debugPlaceStructure(source: Player | Block, args: string[]) {
    const structureId = args[0]
    const rotation = args[1]
    
    world.structureManager.place(structureId, source.dimension, { x: source.location.x + 1, y: source.location.y, z: source.location.z + 1 }, {
        rotation: StructureRotation[rotation]
    })
}