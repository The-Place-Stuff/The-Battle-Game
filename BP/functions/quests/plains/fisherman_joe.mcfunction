tellraw @s[tag=quests_plains_fisherman_joe] {"rawtext":[{"text":"§4You have already completed this quest!"}]}
tag @s[hasitem={item=minecraft:cod,quantity=15..},tag=!quests_plains_fisherman_joe] add marker
xp 50 @s[tag=marker]
clear @s[tag=marker] cod 0 15
execute as @s[tag=marker] run function quests/quest_effects
tag @s[tag=marker] add quests_plains_fisherman_joe
tag @s[tag=quests_plains_fisherman_joe] remove marker