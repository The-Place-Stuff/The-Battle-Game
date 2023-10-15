// Mechanics
import './mechanics/playerProperties.js'
import './mechanics/debugScreen.js'
import './mechanics/volumeManager.js'
import './mechanics/petSummoner.js'

// Items
import './items/sludgySlasher.js'

// Utils
import './util/experienceCalculator.js'

import { world } from '@minecraft/server'

world.afterEvents.dataDrivenEntityTriggerEvent.subscribe(event => {
    console.warn(event.id)
})