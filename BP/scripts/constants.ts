import { DefaultItemStack } from './types'

export const DEFAULT_ITEM_STACKS: Map<string, DefaultItemStack> = new Map()

DEFAULT_ITEM_STACKS.set('battle:quiver', {
    lore: ['', '§r§9Sharpshooter:', '§r§9Increased accuracy and damage of arrows']
})
DEFAULT_ITEM_STACKS.set('battle:cactus_hat', {
    lore: ['', '§r§9Natural Thorns:', '§r§9Reflects 4 damage upon attackers']
})

export const NON_LIVING_ENTITIES = [
    // Custom
    'battle:falling_slime',

    // Vanilla
    'minecraft:area_effect_cloud',
    'minecraft:armor_stand',
    'minecraft:arrow',
    'minecraft:boat',
    'minecraft:chest_boat',
    'minecraft:chest_minecart',
    'minecraft:command_block_minecart',
    'minecraft:dragon_fireball',
    'minecraft:egg',
    'minecraft:ender_crystal',
    'minecraft:ender_pearl',
    'minecraft:eye_of_ender_signal',
    'minecraft:fireball',
    'minecraft:fireworks_rocket',
    'minecraft:fishing_hook',
    'minecraft:hopper_minecart',
    'minecraft:lightning_bolt',
    'minecraft:lingering_potion',
    'minecraft:llama_spit',
    'minecraft:minecart',
    'minecraft:npc',
    'minecraft:shulker_bullet',
    'minecraft:small_fireball',
    'minecraft:snowball',
    'minecraft:splash_potion',
    'minecraft:thrown_trident',
    'minecraft:tnt',
    'minecraft:tnt_minecart',
    'minecraft:tripod_camera',
    'minecraft:wither_skull',
    'minecraft:wither_skull_dangerous',
    'minecraft:xp_bottle',
    'minecraft:xp_orb'
]