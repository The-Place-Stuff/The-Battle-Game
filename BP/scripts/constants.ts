import Volume from './volumes/volume'
import { DefaultItemStack } from './types'
import { StructureRotation } from '@minecraft/server'

export const ITEM_TO_SUMMON: Map<string, string> = new Map([
    ['battle:loyal_bone', 'wolf'],
    ['battle:allay_bottle', 'allay'],
    ['battle:otherworldly_diamond', 'bootrap']
])
export const VOLUMES: Map<string, Volume> = new Map()
export const DEFAULT_ITEM_STACKS: Map<string, DefaultItemStack> = new Map()

DEFAULT_ITEM_STACKS.set('battle:quiver', {
    lore: ['', '§r§9Sharpshooter:', '§r§9Increased accuracy and damage of arrows']
})
DEFAULT_ITEM_STACKS.set('battle:cactus_hat', {
    lore: ['', '§r§9Natural Thorns:', '§r§9Reflects 4 damage upon attackers']
})

export const ROTATION_MAP: Map<StructureRotation, string> = new Map([
    [StructureRotation.None, '0_degrees'],
    [StructureRotation.Rotate180, '180_degrees'],
    [StructureRotation.Rotate270, '270_degrees'],
    [StructureRotation.Rotate90, '90_degrees']
])