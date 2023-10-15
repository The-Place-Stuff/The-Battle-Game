
// REQUIRES TYPESCRIPT PORT

import { world, BlockLocation } from '@minecraft/server'
import * as ShopUtils from '../utility/shop.js'

world.events.buttonPush.subscribe(event => {
    const player = event.source
    const location = event.block.location

    // Shop Plains 1
    
    if (location.equals(new BlockLocation(9903, 17, 10000))) {
        const ui = ShopUtils.createShop("Welcome, hero. There's plenty to buy here!")
        .button("10 Emeralds", "textures/items/stone_sword.png")
        .button("5 Emeralds", "textures/items/fishing_rod_uncast.png")
        .button("20 Emeralds", "textures/icons/leather_helmet.png")
        .button("30 Emeralds", "textures/icons/leather_chestplate.png")
        .button("25 Emeralds", "textures/icons/leather_leggings.png")
        .button("20 Emeralds", "textures/icons/leather_boots.png")

        ui.show(player).then((result) => {
            const selection = result.selection

            switch (selection) {
                case 0: ShopUtils.addItem(player, "stone_sword", 10)
                case 1: ShopUtils.addItem(player, "fishing_rod", 5)
                case 2: ShopUtils.addItem(player, "leather_helmet", 20)
                case 3: ShopUtils.addItem(player, "leather_chestplate", 30)
                case 4: ShopUtils.addItem(player, "leather_leggings", 25)
                case 5: ShopUtils.addItem(player, "leather_boots", 20)
            }
        })
    }

})
