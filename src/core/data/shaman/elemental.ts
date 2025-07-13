import type { Tree } from '../../types';

export const elemental: Tree = {
    specIcon: "spell_nature_lightning.png",
    name: "Elemental",
    backgroundImage: "src/assets/images/shaman/background-shaman-elemental.webp",
    talents: [
        {
            id: "spell_nature_wispsplode",
            ranks: [
                "Reduces the mana cost of your Shock, Molten Blast, Lightning Bolt and Chain Lightning spells by 2%.",
                "Reduces the mana cost of your Shock, Molten Blast, Lightning Bolt and Chain Lightning spells by 4%.",
                "Reduces the mana cost of your Shock, Molten Blast, Lightning Bolt and Chain Lightning spells by 6%.",
                "Reduces the mana cost of your Shock, Molten Blast, Lightning Bolt and Chain Lightning spells by 8%.",
                "Reduces the mana cost of your Shock, Molten Blast, Lightning Bolt and Chain Lightning spells by 10%."
            ],
            row: 0,
            name: "Convection",
            col: 1,
            maxPoints: 5,
            icon: "spell_nature_wispsplode.png",
            points: 0
        },
        {
            id: "spell_fire_fireball",
            ranks: [
                "Increases the damage done by your Lightning Bolt, Molten Blast, Chain Lightning and Shock spells by 1%.",
                "Increases the damage done by your Lightning Bolt, Molten Blast, Chain Lightning and Shock spells by 2%.",
                "Increases the damage done by your Lightning Bolt, Molten Blast, Chain Lightning and Shock spells by 3%.",
                "Increases the damage done by your Lightning Bolt, Molten Blast, Chain Lightning and Shock spells by 4%.",
                "Increases the damage done by your Lightning Bolt, Molten Blast, Chain Lightning and Shock spells by 5%."
            ],
            row: 0,
            name: "Concussion",
            col: 2,
            maxPoints: 5,
            icon: "spell_fire_fireball.png",
            points: 0
        },
        {
            id: "spell_nature_stoneclawtotem",
            ranks: [
                "Your Earth Totems give you a 25% chance to avoid interruption caused by damage while casting any Shaman damaging spell. Increases the health of your Stoneclaw Totem by 25% and the radius of your Earthbind Totem by 10%.",
                "Your Earth Totems give you a 50% chance to avoid interruption caused by damage while casting any Shaman damaging spell. Increases the health of your Stoneclaw Totem by 50% and the radius of your Earthbind Totem by 20%."
            ],
            row: 1,
            name: "Earth's Grasp",
            col: 0,
            maxPoints: 2,
            icon: "spell_nature_stoneclawtotem.png",
            points: 0
        },
        {
            id: "spell_nature_spiritarmor",
            ranks: [
                "Reduces damage taken from Fire, Frost and Nature effects by 4%.",
                "Reduces damage taken from Fire, Frost and Nature effects by 7%.",
                "Reduces damage taken from Fire, Frost and Nature effects by 10%."
            ],
            row: 1,
            name: "Elemental Warding",
            col: 1,
            maxPoints: 3,
            icon: "spell_nature_spiritarmor.png",
            points: 0
        },
        {
            id: "spell_fire_immolation",
            ranks: [
                "Increases the damage done by your Fire Totems by 5% and increases the critical strike chance of your Molten Blast spell by an additional 1%.",
                "Increases the damage done by your Fire Totems by 10% and increases the critical strike chance of your Molten Blast spell by an additional 2%.",
                "Increases the damage done by your Fire Totems by 15% and increases the critical strike chance of your Molten Blast spell by an additional 3%."
            ],
            row: 1,
            name: "Call of Flame",
            col: 2,
            maxPoints: 3,
            icon: "spell_fire_immolation.png",
            points: 0
        },
        {
            id: "spell_shadow_manaburn",
            ranks: [
                "After landing a critical strike with a Fire, Frost, or Nature damage spell, you enter a Clearcasting state.  The Clearcasting state reduces the mana cost of your next 2 damage spells or fire totems by 40%."
            ],
            row: 2,
            name: "Elemental Focus",
            col: 0,
            maxPoints: 1,
            icon: "spell_shadow_manaburn.png",
            points: 0
        },
        {
            id: "spell_frost_frostward",
            ranks: [
                "Reduces the cooldown of your Shock spells by 0.2 sec.",
                "Reduces the cooldown of your Shock spells by 0.4 sec.",
                "Reduces the cooldown of your Shock spells by 0.6 sec.",
                "Reduces the cooldown of your Shock spells by 0.8 sec.",
                "Reduces the cooldown of your Shock spells by 1 sec."
            ],
            row: 2,
            name: "Reverberation",
            col: 1,
            maxPoints: 5,
            icon: "spell_frost_frostward.png",
            points: 0
        },
        {
            id: "shaman_talent_elementalblast",
            ranks: [
                "Reduces the cast time of your Molten Blast, Lightning Bolt and Chain Lightning spells by 0.1 sec.",
                "Reduces the cast time of your Molten Blast, Lightning Bolt and Chain Lightning spells by 0.2 sec.",
                "Reduces the cast time of your Molten Blast, Lightning Bolt and Chain Lightning spells by 0.3 sec.",
                "Reduces the cast time of your Molten Blast, Lightning Bolt and Chain Lightning spells by 0.4 sec.",
                "Reduces the cast time of your Molten Blast, Lightning Bolt and Chain Lightning spells by 0.5 sec."
            ],
            row: 2,
            name: "Fire and Lightning Mastery",
            col: 2,
            maxPoints: 5,
            icon: "shaman_talent_elementalblast.png",
            points: 0
        },
        {
            id: "spell_fire_sealoffire",
            ranks: [
                "Reduces the delay before your Fire Nova Totem activates by 1 sec. and decreases the threat generated by your Magma Totem by 25%.",
                "Reduces the delay before your Fire Nova Totem activates by 2 sec. and decreases the threat generated by your Magma Totem by 50%."
            ],
            row: 3,
            name: "Improved Fire Totems",
            col: 0,
            maxPoints: 2,
            icon: "spell_fire_sealoffire.png",
            points: 0
        },
        {
            id: "spell_shaman_thunderstorm",
            ranks: [
                "If you have an active Lightning Shield, your critical hits with Lightning Bolt and Chain Lightning have a 33% chance to cause your Lightning Shield to gain an additional charges, up to 9. When you reach 9 charges, any attempt to gain another charge will instead launch a Lightning Shield ball at your target.\n\nWhen you have more than 3 Lightning Shield charges active, your Earth Shock spell will consume up to 1 surplus charge after 2 seconds, sending it at your target.",
                "If you have an active Lightning Shield, your critical hits with Lightning Bolt and Chain Lightning have a 66% chance to cause your Lightning Shield to gain an additional charges, up to 9. When you reach 9 charges, any attempt to gain another charge will instead launch a Lightning Shield ball at your target.\n\nWhen you have more than 3 Lightning Shield charges active, your Earth Shock spell will consume up to 2 surplus charges every 2 seconds for up to 4 seconds, sending them at your target.",
                "If you have an active Lightning Shield, your critical hits with Lightning Bolt and Chain Lightning have a 100% chance to cause your Lightning Shield to gain an additional charges, up to 9. When you reach 9 charges, any attempt to gain another charge will instead launch a Lightning Shield ball at your target.\n\nWhen you have more than 3 Lightning Shield charges active, your Earth Shock spell will consume up to 3 surplus charges every 2 seconds for up to 6 seconds, sending them at your target."
            ],
            row: 3,
            name: "Rolling Thunder",
            col: 1,
            maxPoints: 3,
            icon: "spell_shaman_thunderstorm.png",
            points: 0
        },
        {
            id: "spell_fire_elementaldevastation",
            ranks: [
                "Your offensive spell crits will increase your chance to get a critical strike with melee attacks by 3% for 10 seconds.",
                "Your offensive spell crits will increase your chance to get a critical strike with melee attacks by 6% for 10 seconds.",
                "Your offensive spell crits will increase your chance to get a critical strike with melee attacks by 9% for 10 seconds."
            ],
            row: 3,
            name: "Elemental Devastation",
            col: 3,
            maxPoints: 3,
            icon: "spell_fire_elementaldevastation.png",
            points: 0
        },
        {
            id: "spell_nature_stormreach",
            ranks: [
                "Increases the range of your Lightning Bolt and Chain Lightning spells by 3 yards.",
                "Increases the range of your Lightning Bolt and Chain Lightning spells by 6 yards."
            ],
            row: 4,
            name: "Storm Reach",
            col: 0,
            maxPoints: 2,
            icon: "spell_nature_stormreach.png",
            points: 0
        },
        {
            id: "spell_fire_volcano",
            ranks: [
                "Increases the critical strike damage bonus of your Searing, Magma, and Fire Nova Totems and your Fire, Frost, and Nature spells by 100%."
            ],
            row: 4,
            name: "Elemental Fury",
            col: 1,
            maxPoints: 1,
            icon: "spell_fire_volcano.png",
            points: 0
        },
        {
            id: "spell_nature_unrelentingstorm",
            ranks: [
                "Regenerate mana equal to 2% of your Intellect every 5 sec, even while casting.",
                "Regenerate mana equal to 4% of your Intellect every 5 sec, even while casting.",
                "Regenerate mana equal to 6% of your Intellect every 5 sec, even while casting.",
                "Regenerate mana equal to 8% of your Intellect every 5 sec, even while casting.",
                "Regenerate mana equal to 10% of your Intellect every 5 sec, even while casting."
            ],
            row: 4,
            name: "Unrelenting Storm",
            col: 3,
            maxPoints: 5,
            icon: "spell_nature_unrelentingstorm.png",
            points: 0
        },
        {
            id: "spell_nature_elementalprecision_1",
            ranks: [
                "Increases your chance to hit with spells by 2% and reduces the threat caused by Fire, Frost and Nature spells by 4%.",
                "Increases your chance to hit with spells by 4% and reduces the threat caused by Fire, Frost and Nature spells by 7%.",
                "Increases your chance to hit with spells by 6% and reduces the threat caused by Fire, Frost and Nature spells by 10%."
            ],
            row: 5,
            name: "Elemental Precision",
            col: 0,
            maxPoints: 3,
            icon: "spell_nature_elementalprecision_1.png",
            points: 0
        },
        {
            id: "spell_nature_callstorm",
            ranks: [
                "Increases the critical strike chance of your Lightning Bolt and Chain Lightning spells by an additional 1%.",
                "Increases the critical strike chance of your Lightning Bolt and Chain Lightning spells by an additional 2%.",
                "Increases the critical strike chance of your Lightning Bolt and Chain Lightning spells by an additional 3%.",
                "Increases the critical strike chance of your Lightning Bolt and Chain Lightning spells by an additional 4%.",
                "Increases the critical strike chance of your Lightning Bolt and Chain Lightning spells by an additional 5%."
            ],
            row: 5,
            name: "Call of Thunder",
            col: 2,
            maxPoints: 5,
            requires: {
                id: "shaman_talent_elementalblast",
                points: 1
            },
            icon: "spell_nature_callstorm.png",
            points: 0
        },
        {
            id: "spell_nature_wispheal",
            ranks: [
                "When activated, this spell gives your next Fire, Frost, or Nature damage spell a 100% critical strike chance and reduces the mana cost by 100%."
            ],
            row: 6,
            name: "Elemental Mastery",
            col: 1,
            maxPoints: 1,
            requires: {
                id: "spell_fire_volcano",
                points: 1
            },
            icon: "spell_nature_wispheal.png",
            points: 0
        },
        {
            id: "spell_nature_elementalshields",
            ranks: [
                "Reduces the chance you will be critically hit by melee and ranged attacks by 2%.",
                "Reduces the chance you will be critically hit by melee and ranged attacks by 4%.",
                "Reduces the chance you will be critically hit by melee and ranged attacks by 6%."
            ],
            row: 6,
            name: "Elemental Shields",
            col: 2,
            maxPoints: 3,
            icon: "spell_nature_elementalshields.png",
            points: 0
        },
        {
            id: "spell_shaman_lavaflow",
            ranks: [
                "Gives your Molten Blast, Lightning Bolt and Chain Lightning spells a 4% chance to cast a second, similar spell on the same target at no additional cost that causes half damage and no threat.",
                "Gives your Molten Blast, Lightning Bolt and Chain Lightning spells a 8% chance to cast a second, similar spell on the same target at no additional cost that causes half damage and no threat.",
                "Gives your Molten Blast, Lightning Bolt and Chain Lightning spells a 12% chance to cast a second, similar spell on the same target at no additional cost that causes half damage and no threat.",
                "Gives your Molten Blast, Lightning Bolt and Chain Lightning spells a 16% chance to cast a second, similar spell on the same target at no additional cost that causes half damage and no threat.",
                "Gives your Molten Blast, Lightning Bolt and Chain Lightning spells a 20% chance to cast a second, similar spell on the same target at no additional cost that causes half damage and no threat."
            ],
            row: 7,
            name: "Elemental Overload",
            col: 1,
            maxPoints: 5,
            icon: "spell_shaman_lavaflow.png",
            points: 0
        },
        {
            id: "spell_fire_totemofwrath",
            ranks: [
                "Summons a Totem of Wrath with 5 health at the feet of the caster.  The totem increases the chance to hit and critically strike with spells by 3% for all party and raid members within 20 yards.  Lasts 120 seconds."
            ],
            row: 8,
            name: "Totem of Wrath",
            col: 1,
            maxPoints: 1,
            requires: {
                id: "spell_shaman_lavaflow",
                points: 5
            },
            icon: "spell_fire_totemofwrath.png",
            points: 0
        }
    ]
};