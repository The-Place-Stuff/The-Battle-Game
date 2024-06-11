import { ItemCustomComponent, ItemComponentUseEvent, Player } from '@minecraft/server'

export default class SummonComponent implements ItemCustomComponent {
    private readonly summonId: string

    public constructor(summonId: string) {
        this.summonId = summonId
        this.onUse = this.onUse.bind(this)
    }

    public onUse(event: ItemComponentUseEvent): void {
        this.createSummon(event.source)
        this.clearItem(event.source)
    }

    private createSummon(owner: Player): void {
        const summon = owner.dimension.spawnEntity(this.summonId, owner.location)
        const tameableComponent = summon.getComponent('minecraft:tameable')
        tameableComponent.tame(owner)
    }

    private clearItem(owner: Player): void {
        const inventory = owner.getComponent('minecraft:inventory')
        const container = inventory.container
        container.setItem(owner.selectedSlotIndex)
    }
}