import { world, EquipmentSlot, EntityDamageCause } from '@minecraft/server'

world.afterEvents.entityHurt.subscribe(event => {
    const entity = event.hurtEntity
    const equippableComponent = entity.getComponent('minecraft:equippable')
    const source = event.damageSource

    if (!source.damagingEntity || source.cause == EntityDamageCause.thorns) return

    if (equippableComponent) {
        const helmetStack = equippableComponent.getEquipment(EquipmentSlot.Head)
        if (!helmetStack || helmetStack.typeId != 'battle:cactus_hat') return
        
        source.damagingEntity.applyDamage(4, {
            cause: EntityDamageCause.thorns,
            damagingEntity: entity
        })
        world.playSound('damage.thorns', entity.location)
    }
})