import SimpleBlockDecorator from './decorators/simple_block_decorator'
import StructureDecorator from './decorators/structure_decorator'
import RandomPatchDecorator from './decorators/random_patch_decorator'
import PlacedDecorator from './decorators/placed_decorator'
import HeightmapRule from './rules/heightmap_rule'
import CountRule from './rules/count_rule'
import RarityRule from './rules/rarity_rule'
import SpreadRule from './rules/spread_rule'
import BlockFilterRule from './rules/block_filter_rule'

import { HeightmapType } from '../types'
import { Vector3d } from '../utils/vector_utils'

export const TALL_GRASS = new SimpleBlockDecorator('minecraft:tallgrass', {})
export const DANDELION = new SimpleBlockDecorator('minecraft:yellow_flower', {})
export const TREE = new StructureDecorator('battle:plains_arena/tree', new Vector3d(-2, 0, -2))

export const DANDELION_PATCH = new RandomPatchDecorator(new PlacedDecorator(DANDELION, [
    new BlockFilterRule([
        {
            name: 'minecraft:air',
            states: {},
            offset: {
                x: 0, y: 0, z: 0
            }
        }
    ])
]), 24, 4, 0)

export const TALL_GRASS_PATCH = new RandomPatchDecorator(new PlacedDecorator(TALL_GRASS, [
    new BlockFilterRule([
        {
            name: 'minecraft:air',
            states: {},
            offset: {
                x: 0, y: 0, z: 0
            }
        }
    ])
]), 48, 4, 0)

export const TALL_GRASS_PATCH_FEATURE = new PlacedDecorator(TALL_GRASS_PATCH, [
    new CountRule(4),
    new SpreadRule(13),
    new HeightmapRule(HeightmapType.Static)
])
export const DANDELION_PATCH_FEATURE = new PlacedDecorator(DANDELION_PATCH, [
    new CountRule(2),
    new SpreadRule(15),
    new HeightmapRule(HeightmapType.Static)
])
export const TREE_WALLS_FEATURE = new PlacedDecorator(TREE, [
    new CountRule(6),
    new SpreadRule(13),
    new HeightmapRule(HeightmapType.Dynamic),
    new BlockFilterRule([
        {
            name: 'minecraft:grass_block',
            states: {},
            offset: {
                x: 0, y: -1, z: 0
            }
        }
    ])
])
export const TREE_FEATURE = new PlacedDecorator(TREE, [
    new CountRule(1),
    new RarityRule(4),
    new SpreadRule(13),
    new HeightmapRule(HeightmapType.Dynamic),
    new BlockFilterRule([
        {
            name: 'minecraft:grass_block',
            states: {},
            offset: {
                x: 0, y: -1, z: 0
            }
        }
    ])
])