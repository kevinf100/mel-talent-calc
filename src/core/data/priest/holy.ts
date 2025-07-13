import type { Tree } from '../../types';

export const holy: Tree = {
    specIcon: "spell_holy_holybolt.png",
    name: "Holy",
    backgroundImage: "src/assets/images/priest/background-priest-holy.webp",
    talents: [
        {
            id: "spell_holy_healingfocus",
            ranks: [
                "Gives you a 35% chance to avoid interruption caused by damage while casting any Holy spell.",
                "Gives you a 70% chance to avoid interruption caused by damage while casting any Holy spell."
            ],
            row: 0,
            name: "Holy Focus",
            col: 0,
            maxPoints: 2,
            icon: "spell_holy_healingfocus.png",
            points: 0
        },
        {
            id: "spell_holy_renew",
            ranks: [
                "Increases the amount healed by your Renew spell by 5%.",
                "Increases the amount healed by your Renew spell by 10%.",
                "Increases the amount healed by your Renew spell by 15%."
            ],
            row: 0,
            name: "Improved Renew",
            col: 1,
            maxPoints: 3,
            icon: "spell_holy_renew.png",
            points: 0
        },
        {
            id: "spell_holy_sealofsalvation",
            ranks: [
                "Increases the critical effect chance of your Holy spells by 1%.",
                "Increases the critical effect chance of your Holy spells by 2%.",
                "Increases the critical effect chance of your Holy spells by 3%.",
                "Increases the critical effect chance of your Holy spells by 4%.",
                "Increases the critical effect chance of your Holy spells by 5%."
            ],
            row: 0,
            name: "Holy Specialization",
            col: 2,
            maxPoints: 5,
            icon: "spell_holy_sealofsalvation.png",
            points: 0
        },
        {
            id: "spell_holy_spellwarding",
            ranks: [
                "Reduces all spell damage taken by 2%.",
                "Reduces all spell damage taken by 4%.",
                "Reduces all spell damage taken by 6%.",
                "Reduces all spell damage taken by 8%.",
                "Reduces all spell damage taken by 10%."
            ],
            row: 1,
            name: "Spell Warding",
            col: 1,
            maxPoints: 5,
            icon: "spell_holy_spellwarding.png",
            points: 0
        },
        {
            id: "spell_holy_sealofwrath",
            ranks: [
                "Reduces the casting time of your Smite, Holy Fire, Heal and Greater Heal spells by 0.1 sec.",
                "Reduces the casting time of your Smite, Holy Fire, Heal and Greater Heal spells by 0.2 sec.",
                "Reduces the casting time of your Smite, Holy Fire, Heal and Greater Heal spells by 0.3 sec.",
                "Reduces the casting time of your Smite, Holy Fire, Heal and Greater Heal spells by 0.4 sec.",
                "Reduces the casting time of your Smite, Holy Fire, Heal and Greater Heal spells by 0.5 sec."
            ],
            row: 1,
            name: "Divine Fury",
            col: 2,
            maxPoints: 5,
            icon: "spell_holy_sealofwrath.png",
            points: 0
        },
        {
            id: "spell_holy_holynova",
            ranks: [
                "Causes an explosion of holy light around the caster, causing 36 Holy damage to all enemy targets within 10 yards and healing all party members within 10 yards for 68.  These effects cause no threat."
            ],
            row: 2,
            name: "Holy Nova",
            col: 0,
            maxPoints: 1,
            icon: "spell_holy_holynova.png",
            points: 0
        },
        {
            id: "spell_holy_blessedrecovery",
            ranks: [
                "After being struck by a melee or ranged critical hit, heal 8% of the damage taken over 6 seconds.",
                "After being struck by a melee or ranged critical hit, heal 16% of the damage taken over 6 seconds.",
                "After being struck by a melee or ranged critical hit, heal 25% of the damage taken over 6 seconds."
            ],
            row: 2,
            name: "Blessed Recovery",
            col: 1,
            maxPoints: 3,
            icon: "spell_holy_blessedrecovery.png",
            points: 0
        },
        {
            id: "spell_holy_searinglightpriest",
            ranks: [
                "Increases the damage of your Smite and Holy Fire spells by 5%.",
                "Increases the damage of your Smite and Holy Fire spells by 10%."
            ],
            row: 2,
            name: "Searing Light",
            col: 2,
            maxPoints: 2,
            requires: {
                id: "spell_holy_sealofwrath",
                points: 5
            },
            icon: "spell_holy_searinglightpriest.png",
            points: 0
        },
        {
            id: "spell_holy_heal02",
            ranks: [
                "Reduces the mana cost of your Lesser Heal, Heal, and Greater Heal spells by 5%.",
                "Reduces the mana cost of your Lesser Heal, Heal, and Greater Heal spells by 10%.",
                "Reduces the mana cost of your Lesser Heal, Heal, and Greater Heal spells by 15%."
            ],
            row: 2,
            name: "Improved Healing",
            col: 3,
            maxPoints: 3,
            icon: "spell_holy_heal02.png",
            points: 0
        },
        {
            id: "spell_holy_layonhands",
            ranks: [
                "Increases your target's armor by 8% for 15 seconds after getting a critical effect from your Flash Heal, Heal, Greater Heal, Binding Heal, Prayer of Healing, or Circle of Healing spell.",
                "Increases your target's armor by 16% for 15 seconds after getting a critical effect from your Flash Heal, Heal, Greater Heal, Binding Heal, Prayer of Healing, or Circle of Healing spell.",
                "Increases your target's armor by 25% for 15 seconds after getting a critical effect from your Flash Heal, Heal, Greater Heal, Binding Heal, Prayer of Healing, or Circle of Healing spell."
            ],
            row: 3,
            name: "Inspiration",
            col: 1,
            maxPoints: 3,
            icon: "spell_holy_layonhands.png",
            points: 0
        },
        {
            id: "spell_holy_purify",
            ranks: [
                "Increases the range of your Smite and Holy Fire spells and the radius of your Prayer of Healing, Holy Nova and Circle of Healing spells by 10%.",
                "Increases the range of your Smite and Holy Fire spells and the radius of your Prayer of Healing, Holy Nova and Circle of Healing spells by 20%."
            ],
            row: 3,
            name: "Holy Reach",
            col: 2,
            maxPoints: 2,
            icon: "spell_holy_purify.png",
            points: 0
        },
        {
            id: "spell_holy_prayerofhealing02",
            ranks: [
                "Reduces the mana cost of your Prayer of Healing and Prayer of Mending spell by 10%.",
                "Reduces the mana cost of your Prayer of Healing and Prayer of Mending spell by 20%."
            ],
            row: 4,
            name: "Healing Prayers",
            col: 0,
            maxPoints: 2,
            icon: "spell_holy_prayerofhealing02.png",
            points: 0
        },
        {
            id: "inv_enchant_essenceeternallarge",
            ranks: [
                "Increases total Spirit by 5% and upon death, the priest becomes the Spirit of Redemption for 15 seconds.  The Spirit of Redemption cannot move, attack, be attacked or targeted by any spells or effects.  While in this form the priest can cast any healing spell free of cost.  When the effect ends, the priest dies."
            ],
            row: 4,
            name: "Spirit of Redemption",
            col: 1,
            maxPoints: 1,
            icon: "inv_enchant_essenceeternallarge.png",
            points: 0
        },
        {
            id: "spell_holy_spiritualguidence",
            ranks: [
                "Increases spell damage and healing by up to 5% of your total Spirit.",
                "Increases spell damage and healing by up to 10% of your total Spirit.",
                "Increases spell damage and healing by up to 15% of your total Spirit.",
                "Increases spell damage and healing by up to 20% of your total Spirit.",
                "Increases spell damage and healing by up to 25% of your total Spirit."
            ],
            row: 4,
            name: "Spiritual Guidance",
            col: 2,
            maxPoints: 5,
            icon: "spell_holy_spiritualguidence.png",
            points: 0
        },
        {
            id: "spell_holy_surgeoflight",
            ranks: [
                "Your spell criticals have a 25% chance to cause your next Smite spell to be instant cast, cost no mana but be incapable of a critical hit.  This effect lasts 10 seconds.",
                "Your spell criticals have a 50% chance to cause your next Smite spell to be instant cast, cost no mana but be incapable of a critical hit.  This effect lasts 10 seconds."
            ],
            row: 5,
            name: "Surge of Light",
            col: 0,
            maxPoints: 2,
            icon: "spell_holy_surgeoflight.png",
            points: 0
        },
        {
            id: "spell_nature_moonglow",
            ranks: [
                "Increases the amount healed by your healing spells by 2%.",
                "Increases the amount healed by your healing spells by 4%.",
                "Increases the amount healed by your healing spells by 6%.",
                "Increases the amount healed by your healing spells by 8%.",
                "Increases the amount healed by your healing spells by 10%."
            ],
            row: 5,
            name: "Spiritual Healing",
            col: 2,
            maxPoints: 5,
            icon: "spell_nature_moonglow.png",
            points: 0
        },
        {
            id: "spell_holy_fanaticism",
            ranks: [
                "Gives you a 2% chance to enter a Clearcasting state after casting any Flash Heal, Binding Heal, or Greater Heal spell.  The Clearcasting state reduces the mana cost of your next Flash Heal, Binding Heal, or Greater Heal spell by 100%.",
                "Gives you a 4% chance to enter a Clearcasting state after casting any Flash Heal, Binding Heal, or Greater Heal spell.  The Clearcasting state reduces the mana cost of your next Flash Heal, Binding Heal, or Greater Heal spell by 100%.",
                "Gives you a 6% chance to enter a Clearcasting state after casting any Flash Heal, Binding Heal, or Greater Heal spell.  The Clearcasting state reduces the mana cost of your next Flash Heal, Binding Heal, or Greater Heal spell by 100%."
            ],
            row: 6,
            name: "Holy Concentration",
            col: 0,
            maxPoints: 3,
            icon: "spell_holy_fanaticism.png",
            points: 0
        },
        {
            id: "spell_holy_summonlightwell",
            ranks: [
                "Creates a Holy Lightwell.  Members of your raid or party can click the Lightwell to restore 801 health over 6 seconds.  Any direct damage taken will cancel the effect.  Each member can only use this Lightwell once.  Lightwell lasts for 180 seconds or 15 charges."
            ],
            row: 6,
            name: "Lightwell",
            col: 1,
            maxPoints: 1,
            requires: {
                id: "inv_enchant_essenceeternallarge",
                points: 1
            },
            icon: "spell_holy_summonlightwell.png",
            points: 0
        },
        {
            id: "spell_holy_blessedresillience",
            ranks: [
                "Critical hits made against you have a 20% chance to prevent you from being critically hit again for 6 seconds.",
                "Critical hits made against you have a 40% chance to prevent you from being critically hit again for 6 seconds.",
                "Critical hits made against you have a 60% chance to prevent you from being critically hit again for 6 seconds."
            ],
            row: 6,
            name: "Blessed Resilience",
            col: 2,
            maxPoints: 3,
            icon: "spell_holy_blessedresillience.png",
            points: 0
        },
        {
            id: "spell_holy_greaterheal",
            ranks: [
                "Your Greater Heal spell gains an additional 4% and your Flash Heal and Binding Heal gain an additional 2% of your bonus healing effects.",
                "Your Greater Heal spell gains an additional 8% and your Flash Heal and Binding Heal gain an additional 4% of your bonus healing effects.",
                "Your Greater Heal spell gains an additional 12% and your Flash Heal and Binding Heal gain an additional 6% of your bonus healing effects.",
                "Your Greater Heal spell gains an additional 16% and your Flash Heal and Binding Heal gain an additional 8% of your bonus healing effects.",
                "Your Greater Heal spell gains an additional 20% and your Flash Heal and Binding Heal gain an additional 10% of your bonus healing effects."
            ],
            row: 7,
            name: "Empowered Healing",
            col: 1,
            maxPoints: 5,
            icon: "spell_holy_greaterheal.png",
            points: 0
        },
        {
            id: "spell_holy_circleofrenewal",
            ranks: [
                "Heals friendly target and that target's party members within 15 yards of the target for 256."
            ],
            row: 8,
            name: "Circle of Healing",
            col: 1,
            maxPoints: 1,
            icon: "spell_holy_circleofrenewal.png",
            points: 0
        }
    ]
};