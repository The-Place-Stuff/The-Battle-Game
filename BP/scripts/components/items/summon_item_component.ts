import { ItemCustomComponent, ItemComponentUseEvent, Player } from '@minecraft/server'

export default class SummonItemComponent implements ItemCustomComponent {
    private readonly summonId: string

    public constructor(summonId: string) {
        this.summonId = summonId
        this.onUse = this.onUse.bind(this)
    }

    public onUse(event: ItemComponentUseEvent): void {
        this.spawnManager(event.source)
        this.clearItem(event.source)
    }

    private spawnManager(owner: Player): void {
        const manager = owner.dimension.spawnEntity('battle:summon_manager', owner.location)
        const projectile = manager.getComponent('minecraft:projectile')
        projectile.owner = owner
        manager.triggerEvent(`battle:transform_into_${this.summonId}`)
    }

    private clearItem(owner: Player): void {
        const inventory = owner.getComponent('minecraft:inventory')
        const container = inventory.container
        container.setItem(owner.selectedSlot)
    }
}