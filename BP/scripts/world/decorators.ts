import SimpleBlockDecorator from './decorators/simple_block_decorator'
import StructureDecorator from './decorators/structure_decorator'
import RandomPatchDecorator from './decorators/random_patch_decorator'
import WeightedRandomDecorator from './decorators/weighted_random_decorator'
import PlacedDecorator from './decorators/placed_decorator'
import HeightmapRule from './rules/heightmap_rule'
import ScanRule from './rules/scan_rule'
import CountRule from './rules/count_rule'
import RarityRule from './rules/rarity_rule'
import SpreadRule from './rules/spread_rule'
import BlockFilterRule from './rules/block_filter_rule'

import { HeightmapType } from '../types'
import { Vector3d } from '../utils/vector_utils'

export const TALL_GRASS = new SimpleBlockDecorator('minecraft:tallgrass', {})
export const DOUBLE_TALL_GRASS = new SimpleBlockDecorator('minecraft:double_plant', {double_plant_type: 'grass'})
export const DANDELION = new SimpleBlockDecorator('minecraft:yellow_flower', {})
export const TREE = new StructureDecorator('battle:plains_arena/decorators/tree_1', new Vector3d(-2, 0, -2))

export const BOULDER_1 = new StructureDecorator('battle:plains_arena/decorators/boulder_1', new Vector3d(-2, 0, -2))
export const BOULDER_2 = new StructureDecorator('battle:plains_arena/decorators/boulder_2', new Vector3d(-2, 0, -2))
export const BOULDER_3 = new StructureDecorator('battle:plains_arena/decorators/boulder_3', new Vector3d(-1, 0, -1))

export const DANDELION_PATCH = new RandomPatchDecorator(new PlacedDecorator(DANDELION, [
    new BlockFilterRule([
        {
            name: 'minecraft:air',
            states: {},
            offset: {
                x: 0, y: 0, z: 0
            }
        },
        {
            name: 'minecraft:grass_block',
            states: {},
            offset: {
                x: 0, y: -1, z: 0
            }
        }
    ])
]), 16, 4, 0)

export const TALL_GRASS_PATCH = new RandomPatchDecorator(new PlacedDecorator(TALL_GRASS, [
    new BlockFilterRule([
        {
            name: 'minecraft:air',
            states: {},
            offset: {
                x: 0, y: 0, z: 0
            }
        },
        {
            name: 'minecraft:grass_block',
            states: {},
            offset: {
                x: 0, y: -1, z: 0
            }
        }
    ])
]), 32, 4, 0)

export const DOUBLE_TALL_GRASS_PATCH = new RandomPatchDecorator(new PlacedDecorator(DOUBLE_TALL_GRASS, [
    new BlockFilterRule([
        {
            name: 'minecraft:air',
            states: {},
            offset: {
                x: 0, y: 0, z: 0
            }
        },
        {
            name: 'minecraft:air',
            states: {},
            offset: {
                x: 0, y: 1, z: 0
            }
        },
        {
            name: 'minecraft:grass_block',
            states: {},
            offset: {
                x: 0, y: -1, z: 0
            }
        }
    ])
]), 16, 7, 0)

export const TALL_GRASS_PATCH_FEATURE = new PlacedDecorator(TALL_GRASS_PATCH, [
    new CountRule(4),
    new SpreadRule(15),
    new HeightmapRule(HeightmapType.Static)
])
export const DOUBLE_TALL_GRASS_PATCH_FEATURE = new PlacedDecorator(DOUBLE_TALL_GRASS_PATCH, [
    new CountRule(3),
    new SpreadRule(15),
    new HeightmapRule(HeightmapType.Static)
])
export const DANDELION_PATCH_FEATURE = new PlacedDecorator(DANDELION_PATCH, [
    new CountRule(2),
    new SpreadRule(15),
    new HeightmapRule(HeightmapType.Static)
])
export const TREE_FEATURE = new PlacedDecorator(TREE, [
    new CountRule(3),
    new SpreadRule(15),
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

export const RANDOM_BOULDER = new WeightedRandomDecorator([
    {
        decorator: new PlacedDecorator(BOULDER_1, [
            new ScanRule(new Vector3d(2, 0, 2))
        ]),
        weight: 3
    },
    {
        decorator: new PlacedDecorator(BOULDER_2, [
            new ScanRule(new Vector3d(2, 0, 2))
        ]),
        weight: 3
    },
    {
        decorator: new PlacedDecorator(BOULDER_3, [
            new ScanRule(new Vector3d(1, 0, 1))
        ]),
        weight: 5
    }
])

export const BOULDER_FEATURE = new PlacedDecorator(RANDOM_BOULDER, [
    new CountRule(2),
    new RarityRule(5),
    new SpreadRule(15),
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