import { world } from '@minecraft/server'
import { Level } from './level/level.js'

import './items/sludgySlasher.js'
import './items/petSummoner.js'

import './util/experienceCalculator.js'

world.afterEvents.worldInitialize.subscribe(event => {
    new Level()
})