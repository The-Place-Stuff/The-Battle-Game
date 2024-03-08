import Volume from './volumes/volume'
import BlockPermutationDecorator from './world/decorators/block_permutation_decorator'
import StructureDecorator from './world/decorators/structure_decorator'
import RandomPatchDecorator from './world/decorators/random_patch_decorator'
import { DefaultItemStack } from './types'
import { Vector3d } from './utils/vector_utils'
import { StructureRotation } from '@minecraft/server'

export const ITEM_TO_SUMMON: Map<string, string> = new Map([
    ['battle:loyal_bone', 'wolf'],
    ['battle:allay_bottle', 'allay'],
    ['battle:otherworldly_diamond', 'bootrap']
])
export const VOLUMES: Map<string, Volume> = new Map()
export const DEFAULT_ITEM_STACKS: Map<string, DefaultItemStack> = new Map()

DEFAULT_ITEM_STACKS.set('battle:quiver', {
    lore: ['Increases the accuracy and damage of arrows']
})
DEFAULT_ITEM_STACKS.set('battle:jungle_vines', {
    lore: ['Attackers will receive 4 damage']
})

export const ROTATION_MAP: Map<StructureRotation, string> = new Map([
    [StructureRotation.None, '0_degrees'],
    [StructureRotation.Rotate180, '180_degrees'],
    [StructureRotation.Rotate270, '270_degrees'],
    [StructureRotation.Rotate90, '90_degrees']
])

export const TALL_GRASS = new BlockPermutationDecorator('minecraft:tallgrass', {}, {
    blockFilters: [
        {
            name: 'minecraft:air',
            states: {},
            offset: { x: 0, y: 0, z: 0 }
        }
    ]
})
export const TALL_GRASS_PATCH = new RandomPatchDecorator(TALL_GRASS, 48, 4, 1, {
    count: 4,
    spread: {
        x: 15,
        z: 15
    },
    blockFilters: [
        {
            name: 'minecraft:air',
            states: {},
            offset: { x: 0, y: 0, z: 0 }
        }
    ]
})

export const DANDELION = new BlockPermutationDecorator('minecraft:yellow_flower', {}, {})

export const DANDELION_PATCH = new RandomPatchDecorator(DANDELION, 32, 4, 2, {
    count: 2,
    spread: {
        x: 15,
        z: 15
    },
    blockFilters: [
        {
            name: 'minecraft:air',
            states: {},
            offset: { x: 0, y: 0, z: 0 }
        }
    ]
})

export const TREE = new StructureDecorator('battle:plains_arena/tree', new Vector3d(-2, 0, -2), {
    chance: 4,
    count: 4,
    spread: {
        x: 13,
        z: 13
    },
    blockFilters: [
        {
            name: 'minecraft:air',
            states: {},
            offset: { x: 0, y: 0, z: 0 }
        }
    ]
})