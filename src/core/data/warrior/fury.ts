import type { Tree } from '../../types'

export const fury: Tree = {
  name: 'Fury',
  backgroundImage: 'src/assets/images/warrior/background-warrior-fury.webp',
  specIcon: 'ability_warrior_innerrage.png',
  talents: [
    {
      row: 0,
      col: 1,
      icon: 'spell_nature_purge.png',
      id: 'spell_nature_purge',
      name: 'Booming Voice',
      ranks: [
        'Increases the area of effect and duration of your Battle Shout, Demoralizing Shout and Commanding Shout by 10%.',
        'Increases the area of effect and duration of your Battle Shout, Demoralizing Shout and Commanding Shout by 20%.',
        'Increases the area of effect and duration of your Battle Shout, Demoralizing Shout and Commanding Shout by 30%.',
        'Increases the area of effect and duration of your Battle Shout, Demoralizing Shout and Commanding Shout by 40%.',
        'Increases the area of effect and duration of your Battle Shout, Demoralizing Shout and Commanding Shout by 50%.'
      ],
      points: 0,
      maxPoints: 5
    },
    {
      row: 0,
      col: 2,
      icon: 'ability_rogue_eviscerate.png',
      id: 'ability_rogue_eviscerate',
      name: 'Cruelty',
      ranks: [
        'Increases your chance to get a critical strike with melee weapons by 1%.',
        'Increases your chance to get a critical strike with melee weapons by 2%.',
        'Increases your chance to get a critical strike with melee weapons by 3%.',
        'Increases your chance to get a critical strike with melee weapons by 4%.',
        'Increases your chance to get a critical strike with melee weapons by 5%.'
      ],
      points: 0,
      maxPoints: 5
    },
    {
      row: 1,
      col: 1,
      icon: 'ability_warrior_warcry.png',
      id: 'ability_warrior_warcry',
      name: 'Improved Demoralizing Shout',
      ranks: [
        'Increases the melee attack power reduction of your Demoralizing Shout by 8%.',
        'Increases the melee attack power reduction of your Demoralizing Shout by 16%.',
        'Increases the melee attack power reduction of your Demoralizing Shout by 24%.',
        'Increases the melee attack power reduction of your Demoralizing Shout by 32%.',
        'Increases the melee attack power reduction of your Demoralizing Shout by 40%.'
      ],
      points: 0,
      maxPoints: 5
    },
    {
      row: 1,
      col: 2,
      icon: 'spell_nature_stoneclawtotem.png',
      id: 'spell_nature_stoneclawtotem',
      name: 'Unbridled Wrath',
      ranks: [
        'Gives you a chance to generate an additional rage point when you deal melee damage with a weapon.',
        'Gives you a chance to generate an additional rage point when you deal melee damage with a weapon.  Effect occurs more often than Unbridled Wrath (Rank 1).',
        'Gives you a chance to generate an additional rage point when you deal melee damage with a weapon.  Effect occurs more often than Unbridled Wrath (Rank 2).',
        'Gives you a chance to generate an additional rage point when you deal melee damage with a weapon.  Effect occurs more often than Unbridled Wrath (Rank 3).',
        'Gives you a chance to generate an additional rage point when you deal melee damage with a weapon.  Effect occurs more often than Unbridled Wrath (Rank 4).'
      ],
      points: 0,
      maxPoints: 5
    },
    {
      row: 2,
      col: 0,
      icon: 'ability_warrior_cleave.png',
      id: 'ability_warrior_cleave',
      name: 'Improved Cleave',
      ranks: [
        'Increases the bonus damage done by your Cleave ability by 40%.',
        'Increases the bonus damage done by your Cleave ability by 80%.',
        'Increases the bonus damage done by your Cleave ability by 120%.'
      ],
      points: 0,
      maxPoints: 3
    },
    {
      row: 2,
      col: 1,
      icon: 'spell_shadow_deathscream.png',
      id: 'spell_shadow_deathscream',
      name: 'Piercing Howl',
      ranks: [
        'Causes all enemies within 10 yards to be Dazed, reducing movement speed by 50% for 6 seconds.'
      ],
      points: 0,
      maxPoints: 1,
      abilityData: {
        leftSide: [
            '10 Rage',
            'Instant'
        ]
      }
    },
    {
      row: 2,
      col: 2,
      icon: 'spell_shadow_summonimp.png',
      id: 'spell_shadow_summonimp',
      name: 'Blood Craze',
      ranks: [
        'Regenerates 1% of your total Health over 6 seconds after being the victim of a critical strike.',
        'Regenerates 2% of your total Health over 6 seconds after being the victim of a critical strike.',
        'Regenerates 3% of your total Health over 6 seconds after being the victim of a critical strike.'
      ],
      points: 0,
      maxPoints: 3
    },
    {
      row: 2,
      col: 3,
      icon: 'spell_nature_focusedmind.png',
      id: 'spell_nature_focusedmind',
      name: 'Commanding Presence',
      ranks: [
        'Increases the melee attack power bonus of your Battle Shout and the health bonus of your Commanding Shout by 3%.',
        'Increases the melee attack power bonus of your Battle Shout and the health bonus of your Commanding Shout by 6%.',
        'Increases the melee attack power bonus of your Battle Shout and the health bonus of your Commanding Shout by 9%.',
        'Increases the melee attack power bonus of your Battle Shout and the health bonus of your Commanding Shout by 12%.',
        'Increases the melee attack power bonus of your Battle Shout and the health bonus of your Commanding Shout by 15%.'
      ],
      points: 0,
      maxPoints: 5
    },
    {
      row: 3,
      col: 1,
      icon: 'ability_dualwield.png',
      id: 'ability_dualwield',
      name: 'Dual Wield Specialization',
      ranks: [
        'Increases the damage done by your offhand weapon by 5%.',
        'Increases the damage done by your offhand weapon by 10%.',
        'Increases the damage done by your offhand weapon by 15%.',
        'Increases the damage done by your offhand weapon by 20%.',
        'Increases the damage done by your offhand weapon by 25%.'
      ],
      points: 0,
      maxPoints: 5
    },
    {
      row: 3,
      col: 2,
      icon: 'spell_shadow_unholyfrenzy.png',
      id: 'spell_shadow_unholyfrenzy',
      name: 'Enrage',
      ranks: [
        'Gives you a 5% melee damage bonus for 12 seconds up to a maximum of 12 swings after being the victim of a critical strike.',
        'Gives you a 10% melee damage bonus for 12 seconds up to a maximum of 12 swings after being the victim of a critical strike.',
        'Gives you a 15% melee damage bonus for 12 seconds up to a maximum of 12 swings after being the victim of a critical strike.',
        'Gives you a 20% melee damage bonus for 12 seconds up to a maximum of 12 swings after being the victim of a critical strike.',
        'Gives you a 25% melee damage bonus for 12 seconds up to a maximum of 12 swings after being the victim of a critical strike.'
      ],
      points: 0,
      maxPoints: 5
    },
    {
      row: 4,
      col: 0,
      icon: 'inv_sword_48.png',
      id: 'inv_sword_48',
      name: 'Improved Execute',
      ranks: [
        'Reduces the rage cost of your Execute ability by 2.',
        'Reduces the rage cost of your Execute ability by 5.'
      ],
      points: 0,
      maxPoints: 2
    },
    {
      row: 4,
      col: 1,
      icon: 'spell_shadow_deathpact.png',
      id: 'spell_shadow_deathpact',
      name: 'Death Wish',
      ranks: [
        'When activated, increases your physical damage by 20% and makes you immune to Fear effects, but increases all damage taken by 5%.  Lasts 30 seconds.'
      ],
      points: 0,
      maxPoints: 1,
      abilityData: {
        leftSide: [
            '10 Rage',
            'Instant'
        ],
        rightSide: [
            '',
            '3 min cooldown'
        ]
      }
    },
    {
      row: 4,
      col: 3,
      icon: 'ability_warrior_weaponmastery.png',
      id: 'ability_warrior_weaponmastery',
      name: 'Weapon Mastery',
      ranks: [
        'Reduces the chance for your attacks to be dodged by 1% and reduces the duration of all Disarm effects used against you by 25%.  This does not stack with other Disarm duration reducing effects.',
        'Reduces the chance for your attacks to be dodged by 2% and reduces the duration of all Disarm effects used against you by 50%.  This does not stack with other Disarm duration reducing effects.'
      ],
      points: 0,
      maxPoints: 2
    },
    {
      row: 5,
      col: 0,
      icon: 'spell_nature_ancestralguardian.png',
      id: 'spell_nature_ancestralguardian',
      name: 'Improved Berserker Rage',
      ranks: [
        'The Berserker Rage ability will generate 10 rage when used.',
        'The Berserker Rage ability will generate 20 rage when used.'
      ],
      points: 0,
      maxPoints: 2
    },
    {
      row: 5,
      col: 2,
      icon: 'ability_ghoulfrenzy.png',
      id: 'ability_ghoulfrenzy',
      name: 'Flurry',
      ranks: [
        'Increases your attack speed by 5% for your next 3 swings after dealing a melee critical strike.',
        'Increases your attack speed by 10% for your next 3 swings after dealing a melee critical strike.',
        'Increases your attack speed by 15% for your next 3 swings after dealing a melee critical strike.',
        'Increases your attack speed by 20% for your next 3 swings after dealing a melee critical strike.',
        'Increases your attack speed by 25% for your next 3 swings after dealing a melee critical strike.'
      ],
      points: 0,
      maxPoints: 5,
      requires: {
        id: 'spell_shadow_unholyfrenzy',
        points: 5
      }
    },
    {
      row: 6,
      col: 0,
      icon: 'ability_marksmanship.png',
      id: 'ability_marksmanship',
      name: 'Precision',
      ranks: [
        'Increases your chance to hit with melee weapons by 1%.',
        'Increases your chance to hit with melee weapons by 2%.',
        'Increases your chance to hit with melee weapons by 3%.'
      ],
      points: 0,
      maxPoints: 3
    },
    {
      row: 6,
      col: 1,
      icon: 'spell_nature_bloodlust.png',
      id: 'spell_nature_bloodlust',
      name: 'Bloodthirst',
      ranks: [
        'Instantly attack the target causing 45 damage.  In addition, the next 5 successful melee attacks will restore 10 health.  This effect lasts 8 seconds.  Damage is based on your attack power.'
      ],
      points: 0,
      maxPoints: 1,
      requires: {
        id: 'spell_shadow_deathpact',
        points: 1
      },
      abilityData: {
        leftSide: [
            '30 Rage',
            'Instant'
        ],
        rightSide: [
            'Melee Range',
            '6 sec cooldown'
        ]
      }
    },
    {
      row: 6,
      col: 2,
      icon: 'ability_whirlwind.png',
      id: 'ability_whirlwind',
      name: 'Improved Whirlwind',
      ranks: [
        'Reduces the cooldown of your Whirlwind ability by 1 sec.',
        'Reduces the cooldown of your Whirlwind ability by 2 sec.'
      ],
      points: 0,
      maxPoints: 2
    },
    {
      row: 7,
      col: 2,
      icon: 'ability_racial_avatar.png',
      id: 'ability_racial_avatar',
      name: 'Improved Berserker Stance',
      ranks: [
        'Increases attack power by 2% and reduces threat caused by 2% while in Berserker Stance.',
        'Increases attack power by 4% and reduces threat caused by 4% while in Berserker Stance.',
        'Increases attack power by 6% and reduces threat caused by 6% while in Berserker Stance.',
        'Increases attack power by 8% and reduces threat caused by 8% while in Berserker Stance.',
        'Increases attack power by 10% and reduces threat caused by 10% while in Berserker Stance.'
      ],
      points: 0,
      maxPoints: 5
    },
    {
      row: 8,
      col: 1,
      icon: 'ability_warrior_rampage.png',
      id: 'ability_warrior_rampage',
      name: 'Rampage',
      ranks: [
        'Warrior goes on a rampage, increasing attack power by 30 and causing most successful melee attacks to increase attack power by an additional 30.  This effect will stack up to 5 times.  Lasts 30 seconds.  This ability can only be used after scoring a critical hit.'
      ],
      points: 0,
      maxPoints: 1,
      requires: {
        id: 'spell_nature_bloodlust',
        points: 1
      },
      abilityData: {
        leftSide: [
            '20 Rage',
            'Instant'
        ]
      }
    }
  ]
}