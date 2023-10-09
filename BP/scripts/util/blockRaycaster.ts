import { BlockRaycastOptions, BlockRaycastHit, Dimension, Vector3, Entity } from '@minecraft/server'

export class BlockRaycaster implements BlockRaycastOptions {
    public maxDistance: number
    public includePassableBlocks: boolean
    public includeLiquidBlocks: boolean

    public constructor(maxDistance: number, includePassableBlocks: boolean = false, includeLiquidBlocks: boolean = false) {
        this.maxDistance = maxDistance
        this.includePassableBlocks = includePassableBlocks
        this.includeLiquidBlocks = includeLiquidBlocks
    }

    public cast(dimension: Dimension, location: Vector3, direction: Vector3): BlockRaycastHit {
        return dimension.getBlockFromRay(location, direction, this)
    }

    public castFromEntityView(source: Entity): BlockRaycastHit {
        return source.getBlockFromViewDirection(this)
    }
}