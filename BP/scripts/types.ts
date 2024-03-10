import { Vector3 } from '@minecraft/server'
import Decorator from './world/decorators/decorator'

export type DefaultItemStack = {
    lore: string[]
}

export type PlacementOptions = {
    count?: number,
    chance?: number,
    spread?: XZSpread,
    blockFilters?: BlockFilter[]
}

export type XZSpread = {
    x: number
    z: number
}

export type BlockFilter = {
    name: string,
    states: Record<string, string | number | boolean>
    offset: Vector3
}

export type DecoratorChoice = {
    decorator: Decorator,
    weight: number
}

export enum HeightmapType {
    Static = 'static',
    Dynamic = 'dynamic'
}