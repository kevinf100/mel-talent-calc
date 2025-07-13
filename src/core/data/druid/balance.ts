import type { Tree } from '../../types';

export const balance: Tree = {
    specIcon: "spell_nature_starfall.png",
    name: "Balance",
    backgroundImage: "src/assets/images/druid/background-druid-balance.webp",
    talents: [
        {
            id: "spell_nature_abolishmagic",
            ranks: [
                "Reduces the cast time of your Wrath and Starfire spells by 0.1 sec.",
                "Reduces the cast time of your Wrath and Starfire spells by 0.2 sec.",
                "Reduces the cast time of your Wrath and Starfire spells by 0.3 sec.",
                "Reduces the cast time of your Wrath and Starfire spells by 0.4 sec.",
                "Reduces the cast time of your Wrath and Starfire spells by 0.5 sec."
            ],
            row: 0,
            name: "Starlight Wrath",
            col: 0,
            maxPoints: 5,
            icon: "spell_nature_abolishmagic.png",
            points: 0
        },
        {
            id: "spell_nature_natureswrath",
            ranks: [
                "While active, any time an enemy strikes the caster they have a 35% chance to become afflicted by Entangling Roots (Rank 1).  Only useable outdoors.  1 charge.  Lasts 45 seconds."
            ],
            row: 0,
            name: "Nature's Grasp",
            col: 1,
            maxPoints: 1,
            icon: "spell_nature_natureswrath.png",
            points: 0
        },
        {
            id: "spell_nature_natureswrath",
            ranks: [
                "Increases the chance for your Nature's Grasp to entangle an enemy by 15%.",
                "Increases the chance for your Nature's Grasp to entangle an enemy by 30%.",
                "Increases the chance for your Nature's Grasp to entangle an enemy by 45%.",
                "Increases the chance for your Nature's Grasp to entangle an enemy by 65%."
            ],
            row: 0,
            name: "Improved Nature's Grasp",
            col: 2,
            maxPoints: 4,
            requires: {
                id: "spell_nature_natureswrath",
                points: 1
            },
            icon: "spell_nature_natureswrath.png",
            points: 0
        },
        {
            id: "spell_nature_stranglevines",
            ranks: [
                "Gives you a 40% chance to avoid interruption caused by damage while casting Entangling Roots and Cyclone.",
                "Gives you a 70% chance to avoid interruption caused by damage while casting Entangling Roots and Cyclone.",
                "Gives you a 100% chance to avoid interruption caused by damage while casting Entangling Roots and Cyclone."
            ],
            row: 1,
            name: "Control of Nature",
            col: 0,
            maxPoints: 3,
            icon: "spell_nature_stranglevines.png",
            points: 0
        },
        {
            id: "inv_staff_01",
            ranks: [
                "Increases the critical strike chance of your Wrath and Starfire spells by 2%.",
                "Increases the critical strike chance of your Wrath and Starfire spells by 4%."
            ],
            row: 1,
            name: "Focused Starlight",
            col: 1,
            maxPoints: 2,
            icon: "inv_staff_01.png",
            points: 0
        },
        {
            id: "spell_nature_starfall",
            ranks: [
                "Increases the damage and critical strike chance of your Moonfire spell by 5%.",
                "Increases the damage and critical strike chance of your Moonfire spell by 10%."
            ],
            row: 1,
            name: "Improved Moonfire",
            col: 2,
            maxPoints: 2,
            icon: "spell_nature_starfall.png",
            points: 0
        },
        {
            id: "spell_nature_thorns",
            ranks: [
                "Increases damage caused by your Thorns and Entangling Roots spells by 25%.",
                "Increases damage caused by your Thorns and Entangling Roots spells by 50%.",
                "Increases damage caused by your Thorns and Entangling Roots spells by 75%."
            ],
            row: 2,
            name: "Brambles",
            col: 0,
            maxPoints: 3,
            icon: "spell_nature_thorns.png",
            points: 0
        },
        {
            id: "spell_nature_insectswarm",
            ranks: [
                "The enemy target is swarmed by insects, decreasing their chance to hit by 2% and causing 108 Nature damage over 12 seconds."
            ],
            row: 2,
            name: "Insect Swarm",
            col: 2,
            maxPoints: 1,
            icon: "spell_nature_insectswarm.png",
            points: 0
        },
        {
            id: "spell_nature_naturetouchgrow",
            ranks: [
                "Increases the range of your Balance spells and Faerie Fire (Feral) ability by 10%.",
                "Increases the range of your Balance spells and Faerie Fire (Feral) ability by 20%."
            ],
            row: 2,
            name: "Nature's Reach",
            col: 3,
            maxPoints: 2,
            icon: "spell_nature_naturetouchgrow.png",
            points: 0
        },
        {
            id: "spell_nature_purge",
            ranks: [
                "Increases the critical strike damage bonus of your Starfire, Moonfire, and Wrath spells by 20%.",
                "Increases the critical strike damage bonus of your Starfire, Moonfire, and Wrath spells by 40%.",
                "Increases the critical strike damage bonus of your Starfire, Moonfire, and Wrath spells by 60%.",
                "Increases the critical strike damage bonus of your Starfire, Moonfire, and Wrath spells by 80%.",
                "Increases the critical strike damage bonus of your Starfire, Moonfire, and Wrath spells by 100%."
            ],
            row: 3,
            name: "Vengeance",
            col: 1,
            maxPoints: 5,
            requires: {
                id: "inv_staff_01",
                points: 2
            },
            icon: "spell_nature_purge.png",
            points: 0
        },
        {
            id: "spell_arcane_starfire",
            ranks: [
                "Gives your Starfire spell a 5% chance to stun the target for 3 seconds and increases the chance you'll resist spell interruption when casting your Wrath or Starfire spells by 25%.",
                "Gives your Starfire spell a 10% chance to stun the target for 3 seconds and increases the chance you'll resist spell interruption when casting your Wrath or Starfire spells by 50%.",
                "Gives your Starfire spell a 15% chance to stun the target for 3 seconds and increases the chance you'll resist spell interruption when casting your Wrath or Starfire spells by 70%."
            ],
            row: 3,
            name: "Celestial Focus",
            col: 2,
            maxPoints: 3,
            icon: "spell_arcane_starfire.png",
            points: 0
        },
        {
            id: "ability_druid_lunarguidance",
            ranks: [
                "Increases your Intellect by 3% and your spell damage and healing by 10% of your total Intellect.",
                "Increases your Intellect by 6% and your spell damage and healing by 20% of your total Intellect.",
                "Increases your Intellect by 9% and your spell damage and healing by 30% of your total Intellect."
            ],
            row: 4,
            name: "Lunar Guidance",
            col: 0,
            maxPoints: 3,
            icon: "ability_druid_lunarguidance.png",
            points: 0
        },
        {
            id: "spell_nature_naturesblessing",
            ranks: [
                "All spell criticals grace you with a blessing of nature, reducing the casting time of your next spell by 0.5 sec."
            ],
            row: 4,
            name: "Nature's Grace",
            col: 1,
            maxPoints: 1,
            icon: "spell_nature_naturesblessing.png",
            points: 0
        },
        {
            id: "spell_nature_sentinal",
            ranks: [
                "Reduces the Mana cost of your Moonfire, Starfire, Wrath, Hurricane, Healing Touch, Regrowth and Rejuvenation spells by 3%.",
                "Reduces the Mana cost of your Moonfire, Starfire, Wrath, Hurricane, Healing Touch, Regrowth and Rejuvenation spells by 6%.",
                "Reduces the Mana cost of your Moonfire, Starfire, Wrath, Hurricane, Healing Touch, Regrowth and Rejuvenation spells by 9%."
            ],
            row: 4,
            name: "Moonglow",
            col: 2,
            maxPoints: 3,
            icon: "spell_nature_sentinal.png",
            points: 0
        },
        {
            id: "spell_nature_moonglow",
            ranks: [
                "Increases the damage done by your Starfire, Moonfire and Wrath spells by 2%.",
                "Increases the damage done by your Starfire, Moonfire and Wrath spells by 4%.",
                "Increases the damage done by your Starfire, Moonfire and Wrath spells by 6%.",
                "Increases the damage done by your Starfire, Moonfire and Wrath spells by 8%.",
                "Increases the damage done by your Starfire, Moonfire and Wrath spells by 10%."
            ],
            row: 5,
            name: "Moonfury",
            col: 1,
            maxPoints: 5,
            requires: {
                id: "spell_nature_naturesblessing",
                points: 1
            },
            icon: "spell_nature_moonglow.png",
            points: 0
        },
        {
            id: "ability_druid_balanceofpower",
            ranks: [
                "Increases your chance to hit with all attacks and spells and reduces the chance you'll be hit by spells by 2%.",
                "Increases your chance to hit with all attacks and spells and reduces the chance you'll be hit by spells by 4%."
            ],
            row: 5,
            name: "Balance of Power",
            col: 2,
            maxPoints: 2,
            icon: "ability_druid_balanceofpower.png",
            points: 0
        },
        {
            id: "ability_druid_dreamstate",
            ranks: [
                "Regenerate mana equal to 5% of your Intellect every 5 sec, even while casting.",
                "Regenerate mana equal to 10% of your Intellect every 5 sec, even while casting.",
                "Regenerate mana equal to 15% of your Intellect every 5 sec, even while casting."
            ],
            row: 6,
            name: "Dreamstate",
            col: 0,
            maxPoints: 3,
            icon: "ability_druid_dreamstate.png",
            points: 0
        },
        {
            id: "spell_nature_forceofnature",
            ranks: [
                "Shapeshift into Moonkin Form.  While in this form the armor contribution from items is increased by 400%, attack power is increased by 150% of your level, all party and raid members within 100 yards have their spell critical chance increased by 2%, and your spell critical strike chance is increased by an additional 3%.  Melee attacks in this form have a chance on hit to regenerate mana based on attack power, and receiving damage has a chance to enrage you.  The Moonkin can only cast Balance and non-healing Restoration spells.\n\nThe act of shapeshifting frees the caster of Polymorph and Movement Impairing effects."
            ],
            row: 6,
            name: "Moonkin Form",
            col: 1,
            maxPoints: 1,
            icon: "spell_nature_forceofnature.png",
            points: 0
        },
        {
            id: "spell_nature_faeriefire",
            ranks: [
                "Your Faerie Fire spell also increases the chance the target will be hit by melee and ranged attacks by 1%.",
                "Your Faerie Fire spell also increases the chance the target will be hit by melee and ranged attacks by 2%.",
                "Your Faerie Fire spell also increases the chance the target will be hit by melee and ranged attacks by 3%."
            ],
            row: 6,
            name: "Improved Faerie Fire",
            col: 2,
            maxPoints: 3,
            icon: "spell_nature_faeriefire.png",
            points: 0
        },
        {
            id: "ability_druid_twilightswrath",
            ranks: [
                "Your Starfire spell gains an additional 4% and your Wrath gains an additional 2% of your bonus damage effects.",
                "Your Starfire spell gains an additional 8% and your Wrath gains an additional 4% of your bonus damage effects.",
                "Your Starfire spell gains an additional 12% and your Wrath gains an additional 6% of your bonus damage effects.",
                "Your Starfire spell gains an additional 16% and your Wrath gains an additional 8% of your bonus damage effects.",
                "Your Starfire spell gains an additional 20% and your Wrath gains an additional 10% of your bonus damage effects."
            ],
            row: 7,
            name: "Wrath of Cenarius",
            col: 1,
            maxPoints: 5,
            icon: "ability_druid_twilightswrath.png",
            points: 0
        },
        {
            id: "ability_druid_forceofnature",
            ranks: [
                "Summons 3 treants to attack enemy targets for 30 seconds."
            ],
            row: 8,
            name: "Force of Nature",
            col: 1,
            maxPoints: 1,
            icon: "ability_druid_forceofnature.png",
            points: 0
        }
    ]
};