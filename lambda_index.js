/* eslint-disable  func-names */
/* eslint-disable  no-console */

var lastOutput = "";
const Alexa = require('ask-sdk');
const ANSWERS = {
  ExplainAmbushIntent: {
    answer: "An enemy group ambushing the heroes is placed adjacent to the heroes, and gains +2 initiative for the first round of combat.",
    name:	"ambushes",
    tags: ["enemies"]
  },
  ExplainAdvancedEncountersIntent: {
    answer: "Game variant: at the bottom of each map card representing a unique room, you find the name of a matching encounter. When such a room is explored, add this encounter to the exploration. That encounter may not be re-drawn or canceled. Resolve this encounter and the regular exploration event in any order.",
    name:	"advanced encounters",
    tags: ["optional rules"]
  },
  ExplainMissionCompletionIntent: {
    answer: 'A mission is completed as soon the completion criteria of the mission are met. A mission has failed if each hero is knocked out or dead, if the heroes decide to flee, or if the darkness escapes. Once a mission has been completed, and you rolled for dark stone corruption, every hero is reset to full health, full sanity, and one grit. Your heroes can then travel to a town.',
    name:	"mission completion",
    tags: ["missions"]
  },
  ExplainAmmoIntent: {
    answer: "Heroes with ranged happens have unlimited regular ammo. Sometimes heroes can obtain special versions, such as dark stone ammo, which lasts for one mission only. You can only use one type of ammo at a time. However, you can switch between multiple types of ammo whenever you want.",
    name:	"ammo",
    tags: ["equipment"]
  },
  ExplainArmorIntent: {
    answer: "Armor and spirit armor give additional protection. For each damage the target would suffer, roll a die. If the result is higher or equal to the armor value, that damage is prevented. Armor protects against regular damage, spirit armor against sanity damage.",
    name:	"armor",
    tags: ["equipment", "combat"]
  },
  ExplainBandagesIntent: {
    answer: "To use a bandage, discard the token and heal D6 wounds from yourself or an adjacent hero. In case of the latter, you gain 5XP for each wound healed. Bandages can be used at any point during your heroes activation.",
    name:	"bandages",
    tags: ["sidebag", "equipment"]
  },
  ExplainBandidoIntent: {
    answer: "The bandido, or bandida, is a hero class known for rolling lots of dice, recovering grit quickly, and making frequent use of dynamite.",
    name:	"bandido",
    tags: ["hero classes"]
  },
  ExplainBasicCombatIntent: {
    answer: "A models combat value, unmodified by items or effects. Combat bonuses gained from upgrades or enemy elite abilities do count towards basic combat.",
    name:	"basic combat",
    tags: ["combat"]
  },
  ExplainBasicGameIntent: {
    answer: "A game variant: if an epic threat would be drawn, draw a high threat card instead. Also, there are no gateways to other worlds. If a gateway would be drawn, re-draw.",
    name:	"basic game",
    tags: ["optional rules"]
  },
  ExplainBelowTheDarknessIntent: {
    answer: "A game variant: whenever the darkness marker passes the hero posse marker on the depth track, from that point forward, all enemies gain a free elite ability.",
    name:	"below the darkness",
    tags: ["optional rules"]
  },
  ExplainBlessingIntent: {
    answer: "Blessings are a teachers defensive sermons.",
    name:	"blessings",
    tags: ["magic"]
  },
  ExplainBrutalEnemyIntent: {
    answer: "Hero posses with a level of five or higher encounter brutal enemies. They are described on the backside of the enemy record sheets.",
    name:	"brutal enemy",
    tags: ["enemies"]
  },
  ExplainCancelIntent: {
    answer: "Whenever a card is canceled, it is discarded and has no effect.",
    name:	"cancelling a card",
    tags: ["game concepts"]
  },
  ExplainCastingNumbersIntent: {
    answer: "The casting number describes the difficulty to successfully cast or perform a spell or sermon. The hero must roll two dice and roll equal to or higher than the casting number.",
    name:	"casting number",
    tags: ["magic"]
  },
  ExplainCatchingBreathIntent: {
    answer: "After each fight the heroes catch their breath, healing any combination of D3 wounds and/or sanity. Heroes, who had no activation in a turn in which the fight ended, either heal D6 instead of D3, or may choose to not heal at all but recover one grit. After catching their breath, the heroes may loot.",
    name:	"catching ones breath",
    tags: ["combat"]
  },
  ExplainCluesIntent: {
    answer: "A clue is noted on the exploration tokens as an exclamation mark, and describe progress towards a mission goal.",
    name:	"clues",
    tags: ["missions"]
  },
  ExplainFightIntent: {
    answer: "A fight lasts from when an enemy model is put on the board until either all heroes are dead, fled, or KOed, or until all enemies are dead. If all enemies are dead, the heroes can catch their breath.",
    name:	"fights",
    tags: ["combat"]
  },
  ExplainKillingEnemiesIntent: {
    answer: "Whenever a hero kills an enemy, that model is removed from the board. Weaker enemies give experience when they are killed, larger enemies whenever they are wounded.",
    name:	"killing enemies",
    tags: ["combat"]
  },
  ExplainCritsIntent: {
    answer: "A hero rolling a six on their to hit roll is scoring a critical strike, enabling that attack to ignore the enemies defense. Enemies can not critical strike.",
    name:	"critical hits",
    tags: ["combat"]
  },
  ExplainDangerousDynamiteIntent: {
    answer: "Game variant: whenever a hero or ally receives ten or more wounds from a single source, roll a D6 for each dynamite or bomb token they carry in their side bag. On a roll of 1 or 2, that dynamite immediately explodes.",
    name:	"dangerous dynamite",
    tags: ["optional rules"]
  },
  ExplainDangerousSpellIntent: {
    answer: "A spell or semon with a tentacle icon is considered dangerous. If the caster rolls doubles on the casting roll, they takes that many corruption hits.",
    name:	"dangerous spells",
    tags: ["magic"]
  },
  ExplainDarkStoneIntent: {
    answer: 'Dark Stone can be sold, used to improve items, or for certain skills. At the end of each adventure, each hero must roll a D6 for each dark stone they carry, each dark stone icon or forged dark stone on their equipment and each dark stone. For every roll of 1, 2, or 3, that hero takes one corruption hit.',
    name:	"dark stone",
    tags: ["game concepts"]
  },
  ExplainDefenseIntent: {
    answer: "Defense works differently for heroes and enemies. An enemy hit by an attack reduce the damage by the defense value. A heroes defense allows them to roll on its value to attempt to avoid a hit that would cause woundsdefense to attempt to avoid a hit that would cause wounds.voided.",
    name:	"defense",
    tags: ["combat", "enemies"]
  },
  ExplainDepthEventIntent: {
    answer: "When a hero rolls natural doubles for the holding back the darkness test, the darkness marker is not moved. Instead, consult the depth event chart to see which event occured.",
    name:	"depth events",
    tags: ["game concepts"]
  },
  ExplainDepthTrackIntent: {
    answer: "The orange hero posse marker starts at the mine entrance. It moves forward one space each time a map tile is placed. Each time the 'Hold Back the Darkness' test is failed, the green darkness marker moves one space forward. Draw and reveal a darkness card each time the darkness marker reaches a blood spatter space, and add a growing dread card to the growing dread card stack when the marker reaches a growing dread space.",
    name:	"depth track",
    tags: ["game concepts"]
  },
  ExplainDiceIntent: {
    answer: "When the rules refer to dice, then most often six sided dice, called D6, are meant. The game also comes with a peril die, which also has six sides but different numbers, and a die with eight sides, called a D8.",
    name:	"dice",
    tags: ["game concepts"]
  },
  ExplainDoubleHandedIntent: {
    answer: "An item that requires both heroes hands to be used. The number of hands an item requires is noted on each card in form of hand icons",
    name:	"two-handed weapons",
    tags: ["equipment"]
  },
  ExplainDualWieldingIntent: {
    answer: "A hero with two one-handed ranged weapons can fire both in a single ranged attack. However, they can not score critical hits. If weapons with different statistics are used, roll dice with different colors and assign one to each weapon. To dual wield one handed melee weapons, simply add up the the bonuses of each weapon. They can still score critical strikes.",
    name:	"dual wielding",
    tags: ["equipment", "combat"]
  },
  ExplainDynamiteIntent: {
    answer: 'To throw dynamite or a bomb, instead of using your regular attack, discard the according token from your sidebag. This counts as a ranged attack, with a maximum distance of 3 plus the heroes strength. You can choose any tile in range and line of sight. Roll once to hit. If successful, it lands at the targeted space and explodes for D6 wounds to each model on the target and its adjacent spaces, ignoring defense. Roll damage for each model seperately. If missed: it bounces D3 times in random directions (use a D8 to find the next adjacent space it bounces to).',
    name:	"dynamite",
    tags: ["sidebag", "equipment"]
  },
  ExplainEliteAbilitiesIntent: {
    answer: "There are two ways how enemies can acquire elite abilities: First: if your hero posse is level 3 or 7, enemies gain one elite ability. On level 4, 8, or higher, they gain two. Second: if more models should be placed on a board than you have, that enemy type also gains an elite ability instead. If you encounter such enemies, roll one D6 for each elite ability they have, and consult the elite ability chart on the enemy record sheet. If the enemy already has that ability, reroll. All enemies of that type acquire those abilities for the rest of the fight, including enemies of that type that might join the fight later. Put elite markers with the rolled results on the enemy record sheet, to keep in mind what abilities they gained. Enemies with elite abilities are worth 5 more XP per kill or per hit, depending on whether the enemy rewards XP per kill or hit and wounds.",
    name:	"elite enemies",
    tags: ["enemies"]
  },
  ExplainEnemyAttacksIntent: {
    answer: "Once all enemies of the currently active group have moved and found their targets, they attack. Each enemy rolls a number of dice equal to their combat value, and compare the result with their hit values. For each successful hit, the target rolls on their defense. For each failed defense, the target receives damage as noted on the enemy sheet. If the target has armor, an armor roll might reduce the damage taken. Note that enemies can not score critical hits.",
    name:	"enemy attacks",
    tags: ["enemies", "combat"]
  },
  ExplainEnemyMovementIntent: {
    answer: "If it's an enemy groups turn to act, the enemies closest to the heroes or allies move first. If an enemy has no target in range, it moves to towards the closest target outside of range. Otherwise, the enemy targets a random hero that is in range and it has a clear path to, and moves to an adjacent space of the hero as far as it can (thus most often behind the hero). Then, repeat the process for the next closest enemy model, though it targets a different model if possible. An enemy will continue attacking that hero, until the hero is knocked out or moves away. In that case, the enemy finds a new target.",
    name:	"enemy movement",
    tags: ["enemies"]
  },
  ExplainPlacingEnemiesIntent: {
    answer: "Start by placing the enemies with the lowest initiative on the board first, in the row the farthest away from the map entrance the heroes came from. Enemies are put on every other tile, resulting in a checkerboard pattern. Once all those enemies have been placed, continue with those with the next higher initiative, until all enemies have been placed. If you run out of space, start filling up the aforementioned checkeboard pattern, the remaining free spaces. If there is still not enough space, fill up the map tile the heroes were coming from. If you have not enough models, see running out of models.",
    name:	"enemy placement",
    tags: ["enemies", "combat"]
  },
  ExplainEscapingDarknessIntent: {
    answer: "If the Darkness marker ever reaches the Mine Entrance space on the Depth Track, the Darkness escapes the mine and lays waste to the countryside. The Mission is failed and the Heroes must head home in defeat",
    name:	"escaping darkness",
    tags: ["missions"]
  },
  ExplainEscapingFromEnemiesIntent: {
    answer: "A hero wanting to move away from adjacent enemies has to escape them first. To do so, roll a D6. If the result is equal to or higher than the enemies escape value, the escape succeeded and the hero may move away. A hero has to roll only one escape test per move, unless they want to move away from an enemy with higher escape value than rolled for earlier that turn.",
    name:	"escaping from enemies",
    tags: ["combat", "enemies"]
  },
  ExplainExperienceIntent: {
    answer: "Heroes gain experience by defeating and fighting enemies, healing each other, completing missions, and by various other means. At the start of a game turn, if a hero has acquired enough experience, they may spend as much experience points as required to level up. The hero then heals to full health and sanity, regains one grit, rolls two D6 for an upgrade bonus, and may choose a new ability from their upgrade track. When choosing abilities that way, you may not skip or pass abilities. For example: if you want the fourth ability of the second track, you must have already acquired that tracks earlier three abilities. Note that a heroes maximum level is eight, and that a higher level may result in more dangerous enemies.",
    name:	"experience",
    tags: ["game concepts", "heroes"]
  },
  ExplainExplorationIntent: {
    answer: "Whenever a room map tile is placed (except for passages), draw an exploration token without looking at it, and place it face down on the tile. After holding back the darkness, and model activation, the exploration tokens are revealed. The exploration token shows the following information: the number of doors of that room, has a clue been found, and is there a gate to another world. In addition, one of the three following situations will happen: the players are attacked, an encounter takes place, or a growing dread card is drawn and added to the stack. The door icons on the exploration token show how many open doors are left. Roll a die to determine which connections are open doors, and close the others with end caps. If an open door would not allow a new map tile to be connected to it, as it points directly at another earlier placed map tile, close it with an end cap, and open another door instead. Feel free to remove map tiles from the board, if you are unlikely to return to them.",
    name:	"exploration",
    tags: ["game concepts", "missions"]
  },
  ExplainFaithIntent: {
    answer: "Preachers and nuns use faith tokens either pay the cost of a sermon being cast, or to improve a casting roll by 1 for each token spent. They recover all faith at the start of their turn. Ask me about sermons to learn more about those.",
    name:	"faith",
    tags: ["magic"]
  },
  ExplainFaithCostIntent: {
    answer: "The amount of faith a preacher has to spend in order to cast a sermon",
    name:	"faith cost",
    tags: ["magic"]
  },
  ExplainFixedHeroMovementIntent: {
    answer: "Game variant: Instead of moving the rolled result, the heroes move always four spaces (modified by abilities and equipment). The move roll is still required, as it might reward a grit token.",
    name:	"fixed hero movement",
    tags: ["optional rules"]
  },
  ExplainFlashTokenIntent: {
    answer: "To use flash, discard the token and give all enemies -2 iniative until end of turn. The effect of flash does stack, should several tokens be used in one turn. Yes, blind enemies are effected to. They are startled by the noise.",
    name:	"flash",
    tags: ["sidebag", "equipment"]
  },
  ExplainFleeingIntent: {
    answer: "If all those heroes, that are neither knocked out nor dead, agree, they can abandon a mission and flee. This must be done as the first action in a turn. Knocked out heroes still have to roll on injury and or madness tables. Also pay attention to the details in the mission description, on what happens in case of a failure",
    name:	"fleeing",
    tags: ["missions"]
  },
  ExplainFreeAttacksIntent: {
    answer: "A free attack may be used by a hero during their activation, either before or after their regular attack. A hero may never use more than one free attack per activation.",
    name:	"free attacks",
    tags: ["combat"]
  },
  ExplainGameSetupIntent: {
    answer: "Follow these steps: 1) Choose the number of heroes. 2) Shuffle all decks. 3) Ready the heroes. Create heroes if necessary. 4) Choose one hero and give them the old lantern card. 5) Select a mission and follow its setup instructions. 6) Place the hero posse and darkness markers on the depth track. 7) Set the mine entrance on the center of the table. 8) Place each hero model in one of the six starting spaces on the mine entrance map tile.",
    name:	"game setup",
    tags: ["game concepts"]
  },
  ExplainTurnOrderIntent: {
    answer: 'Each game turn has four steps that are completed in the following order: 1: Hold back the darkness. 2: Model activation. 3: Room exploration. 4: End of turn.',
    name:	"turn order",
    tags: ["game concepts"]
  },
  ExplainGameVariantsIntent: {
    answer: "1: Basic game. 2: Shared experience. 3: Fixed hero move. 4: Advanced Encounters. 5: hardcore mode. 6. Themed threat deck. 7. Dangerous dynamite. 8. Below the darkness. 9. Same hero class. Ask me about those variants to learn more.",
    name:	"optional rules",
    tags: ["optional rules"]
  },
  ExplainGatesIntent: {
    answer: "If you reveal an exploration token with a blue gate icon, place a gate end cap on the board. To look through the gate, a hero must end their move on the half-space between the gate and the current map tile. Then draw a random world card from those not already in play, to find out where the gate leads to. Next, draw a map card and matching tile from that world, and place that tile on the board, together with a matching gate end cap. Also place an exploration token on  the tile as normal. A hero standing on the gate does not count as standing on the tile on the other side of the gate. The room exploration token on the newly placed map tile is not revealed, until the end of a turn, in which a hero ended their turn on that map tile. To move through a gate, treat both the map tiles as directly adjacent. It is not possible to attack through a gate, unless you are standing directly on the gate tile itself, and use a ranged weapon. The light of the lantern, does shines through the gate. Once all heroes have left a world, shuffle that worlds card back into the world card stack. Nots that if an enemies terror ability will hit heroes in another world, if they stand directly on the gate.",
    name:	"gates",
    tags: ["game concepts"]
  },
  ExplainGoldIntent: {
    answer: "Heroes earn gold by scavenging and looting, by selling items, completing missions and various other means. Gold is spent between missions in a town.",
    name:	"gold",
    tags: ["game concepts"]
  },
  ExplainGritIntent: {
    answer: "Each hero starts each adventure with one grit. A hero regains one grit when rolling a one for movement. Each hero has a max grit value listed on their character sheet. Grit may be used for three things. 1: To reroll any number of dice you just rolled. 2: To add an extra D6 to your movement. 3: To activate abilities or items that require grit.",
    name:	"grit",
    tags: ["game concepts"]
  },
  ExplainGrowingDreadIntent: {
    answer: "Growing dread cards come into play, when the darkness marker moves onto a growing dread space, a growing dread exploration token is revealed, or by certain events. When such a card is drawn, it is not resolved right away. Instead, it is placed face down, without looking at it, on a stack near the depth track. They can be fanned out a little, so that the players know how many have already been drawn during this mission. When the Objective is found for the current Mission, but before any Threat cards are drawn or Enemies placed, the cards in the Growing Dread stack are revealed and resolved, one at a time, starting from the top of the stack. At any time before a growing dread card has been revealed or resolved, all heroes, who are neither dead nor knocked out, may spend one grit each, to cancel the top card on the growing dread stack.",
    name:	"growing dread",
    tags: ["game concepts", "missions"]
  },
  ExplainGunslingerIntent: {
    answer: "The Gunslinger is a hero class known for their damage and speed, but also their frailty. The Gunslinger comes with a special six shooter template, that they load at the beginning of each adventure with a combination of special bullets. See six shooter for more information.",
    name:	"gunslinger",
    tags: ["hero classes"]
  },
  ExplainGunSlingerShotsIntent: {
    answer: "At the beginning of each mission, the gunslinger loads their six shooter template with six bullets of their choice. The gun slinger hero has at first access only to dead eye shots, but can later unlock more types. Dead eye shots can be used after the gun slinger has hit with a pistol shot and rolled for damage. The dead eye shot increases the damage of that shot by +2. Using a ricochet shot allows the gun slinger to choose a target without regard to range, line of sight, or being adjacent to it. To use a cerberus shot, you have to pay 1 grit. This shot immediately deals a free hit for D6 damage to every enemy adjacent to the target. Lastly, you may pay 1 grit to use a hellfire shot, which doubles the amount of damage just rolled on one of your hits.",
    name:	"gunslinger shots",
    tags: ["equipment"]
  },
  ExplainHardcoreIntent: {
    answer: "Game variant: When a player would be knocked out, they are instead killed, unless they recover in the same turn. If you like this mode to be more forgiving: allow the resurrection at the church in town.",
    name:	"hardcore mode",
    tags: ["optional rules"]
  },
  ExplainHealingIntent: {
    answer: "Whenever a Hero is allowed to heal health or sanity damage, they simply remove that number of damage markers from their character. Any time a hero heals another hero, they healer gains 5 XP for each wound or sanity healed. Tokens like whiskey or bandages may be used to heal other heroes that are adjacent to you during a fight, or even just on the same map tile while there are no enemies on the board.",
    name:	"healing",
    tags: ["game concepts"]
  },
  ExplainHerbsIntent: {
    answer: "A herb token can be discarded to heal 2D6 wounds.",
    name:	"herbs",
    tags: ["sidebag", "equipment"]
  },
  ExplainMeleeCombatIntent: {
    answer: "To attack in melee combat, roll a number of die equal to your combat rating. A hit roll equal to or higher than your hit rating counts as a hit. A roll of six is a critical hit, and ignores the enemie defense. Then assign those hits to adjacent enemies. A hit enemy takes D6 wounds, reduced by that enemie defense value. If an enemy is killed that way, remaining hits assigned to that enemy can be assigned to a different valid target. A killed enemy is immediately removed from the board.",
    name:	"melee combat",
    tags: ["combat"]
  },
  ExplainHeroCreationIntent: {
    answer: "To create a ner character, choose a hero class. Then get all starting gear cards listed on the heroes character sheet. Next, draw one personal item card. Also, choose one hero upgrade. Then get a side bag with one token of your choice (whiskey, dynamite, or bandages). Lastly, name your hero. Note: some heroes require additional steps during creation. This is then noted on the heroes character sheet.",
    name:	"hero creation",
    tags: ["game concepts", "heroes"]
  },
  ExplainHeroDeathIntent: {
    answer: "Heroes are normally just knocked out, and rarely die. Should actually die then that is specifically noted. The rest of the hero posse is then considered to drag the unfortunate heroes remains around until they find a way to ressurrect them (usually by visiting a church in a town). The corpse may not be looted for items.",
    name:	"hero death",
    tags: ["heroes", "combat", "game concepts"]
  },
  ExplainMovementIntent: {
    answer: "When a hero activates, they roll one D6. On a roll of one, they may choose to either regain one grit, or roll again and add the second result to the first. Then they may move up to that many spaces horizontally, vertically or diagonally across the board. A hero may not move through walls or other models. During a fight, hero movement works the same, except when they stand adjacent to an enemy, they must escape that enemy first. See escaping enemies.",
    name:	"hero movement",
    tags: ["combat", "heroes", "game concepts"]
  },
  ExplainPosseSizeIntent: {
    answer: "The number of heroes and advanced allies in the posse determine the threat level of the encounters. Three advanced allies count as one hero. One hero: low threats, gain two revive tokens. Two heroes: low threats and one token. Three heroes: medium threats and revive token. Four heroes: medium threats. Five heroes: high threats and one revive token. Six heroes: high threats. Note: if a posse of one or two heroes would encounter an epic threat for any reason, they face a high threat instead.",
    name:	"posse size",
    tags: ["heroes", "game concepts"]
  },
  ExplainHitIntent: {
    answer: "A hit is a single strike against a model. An attacking model has to roll a D6 and achieve a result equal to or higher than its to hit value, in order to hit with that attack. A hit from an enemy deals one damage, a hit from a hero deals D6 damage. Three kinds of hits exist: hits causing wounds, hits causing sanity damage, and corruption hits. Heroes and enemies defend against hits causing wounds with their defense. Heroes defend against sanity damage and corruption hits using their willpower.",
    name:	"hits",
    tags: ["combat"]
  },
  ExplainIndianScoutIntent: {
    answer: "The indian scout is one of the most versatile hero classes, starting with a carabine for ranged attacks and a hatchet for close combat. With their ability to re-draw an encounter or exploration token, they can help the hero posse finding their objectives quickly.",
    name:	"indian scout",
    tags: ["hero classes"]
  },
  ExplainHoldBackTheDarknessIntent: {
    answer: 'At the start of each turn (even in combat) the hero with the lantern must roll two D6 and add the results together. If that number is equal to or higher than the needed value (listed at the bottom of the stage the hero posse marker is currently in), the darkness has been held back. Otherwise, the darkness moves one step forward on the depth track. If natural doubles are rolled, the darkness marker is not moved. Instead, a depth event has occured. Consult the depth event chart for event descriptions. Grit may not be used to reroll this test.',
    name:	"holding back the darkness",
    tags: ["game concepts"]
  },
  ExplainInitiativeIntent: {
    answer: "Initiative determines the order in which models activate (from highest to lowest). If heroes are tied for initiative, or if enemies are tied, the players choose the order. If a hero and a monster are tied, the enemy goes first.",
    name:	"initiative",
    tags: ["combat", "game concepts"]
  },
  ExplainKnockedOutIntent: {
    answer: 'When a hero is reduced to zero health or sanity, they are knocked out until they recover (see "recovering"for more informatino). If all heroes are knocked out at the same time, the mission has failed. The heroes have escaped, but still must roll in the injury and/or madness tables.',
    name:	"getting knocked out",
    tags: ["combat", "heroes"]
  },
  ExplainOverflowIntent: {
    answer: " In some cases, an extra large enemy can only reach a hero by smashing through a wall. This is called overflowing the board, and at least half the model must still be on the board at the end of its movement. Area effects, like dynamite, still hit extra large enemies only once.",
    name:	"board overflow",
    tags: ["enemies", "combat"]
  },
  ExplainLawmanIntent: {
    answer: "The lawman is a very well rounded hero, dealing good damage, being able to heal, and boosting the entire group. For dire situations, they can also flash their sheriff's badge once per adventure, to strengthen the entire team.",
    name:	"lawman",
    tags: ["hero classes"]
  },
  ExplainLookingIntent: {
    answer: "A hero ending their move on an open-ended puzzle connection half-space may search by looking through the door, seeing into the next map tile. Draw a map card and place the map tile shown as the next piece of the board, connected to the door that the Hero is looking through. The green arrow on the card indicates the entrance to the new map tile. If the new map tile cannot be placed because it would overlap an existing map tile, discard it and draw a new map card. Also draw a new map tile, if the drawn tile is already in use in another world.",
    name:	"looking through a door",
    tags: ["game concepts", "heroes"]
  },
  ExplainLootIntent: {
    answer: "After a fight, the heroes may catch their breath, and then they may loot. Each hero may draw one loot card for each threat card that added enemies to the fight, up to a maximum of three.",
    name:	"looting",
    tags: ["game concepts", "combat"]
  },
  ExplainNaturalRollIntent: {
    answer: "A natural roll refers to the unmodified result of a dice roll",
    name:	"natural rolls",
    tags: ["game concepts"]
  },
  ExplainPreacherIntent: {
    answer: "The preacher, or nun, is a hero class able to cast powerful spells, called sermons. Their blessings heal and strengthen the group, while their judgements allow them to fight the wicked enemies. While physically frail and low in defense, they have a high tolerance for sanity and can hold their own in melee combat. See the following subjects related to this class: faith, faith cost, sermons, dangerous sermons, blessings, judgements.",
    name:	"preacher",
    tags: ["hero classes"]
  },
  ExplainPoisonIntent: {
    answer: "At the beginning of their activation, a poisoned hero rolls one D6 for each poison counter they have. On a roll of 1 or 2, that hero takes one wound ignoring defense. On a roll of 6, the poison has worn off, and that poison counter is removed.",
    name:	"poison",
    tags: ["combat", "game concepts", "enemies"]
  },
  ExplainEnemyRangedAttackIntent: {
    answer: "Some enemies have ranged attacks. They do not move unless they have no target in range, in which case they move towards the closest hero in line of sight and target them. If a hero is adjacent to that enemy, that hero is targeted first. If a ranged enemy has multiple heroes to choose from, they change targets each turn. An enemy with ranged and melee attacks will behave like a ranged enemy, unless heroes are adjacent, in which case it uses its melee attacks only.",
    name:	"ranged enemies",
    tags: ["enemies"]
  },
  ExplainPerilDieIntent: {
    answer: "A six sided die with higher average numbers than a regular D6.",
    name:	"the peril die",
    tags: ["game concepts"]
  },
  ExplainNotEnoughModelsIntent: {
    answer: "Whenever you are supposed to put enemy models on the board, and you have no such models left, all enemies of that type gain an elite ability. This can happen multiple times in one fight. See elite abilities.",
    name:	"running out of models",
    tags: ["enemies", "game concepts"]
  },
  ExplainOtherWorldIntent: {
    answer: "Other worlds are normally entered via gates. Each other world has a global effect, that is described on the other world card. When a map card, an encounter, an artifact, or a thread card would be drawn in an other world, use the respective other world versions of those cards. Note that when a loot card drawn in an other world would have you draw a gear card, you instead draw an artifact card, and vice versa.",
    name:	"other worlds",
    tags: ["game concepts"]
  },
  ExplainReviveTokenIntent: {
    answer: "A revive token is held by the entire hero posse instead of a specific hero. Whenever a hero is knocked out, if the posse has one or more revive tokens, discard one token. The hero is then restored to full health, full sanity, and gains one grit.",
    name:	"reviving",
    tags: ["heroes", "game concepts"]
  },
  ExplainMultipleSameClassIntent: {
    answer: "Game variant: have a hero posse include multiple heroes, or all heroes, of the same class. For example: a hero posse consisting of nothing but bandidos.",
    name:	"revive tokens",
    tags: ["heroes", "combat", "game concepts"]
  },
  ExplainJudgementsIntent: {
    answer: "A preachers offensive sermons",
    name:	"judgements",
    tags: ["magic"]
  },
  ExplainRecoveryIntent: {
    answer: "A knocked out hero may recover at the end of any turn, in which no enemies are on the board. Alternatively, a hero can forfeit their action to help another hero recover, as long as they are adjacent and there are no enemies on that map tile. If a model stands on the space of the recovering hero, that model is pushed to the side. A hero must then roll on the madness and/or injury chart, depending on whether they were knocked out by wounds and/or sanity damage. If the hero has to roll on one chart, they recover two D6 health and/or sanity. If the hero has to roll on both charts, they recover two D6 health and sanity each. A hero can never activate in the turn they recover. A knocked out hero can be dragged around like a wet sack of sand, but that costs two movement points per space travelled.",
    name:	"recovering",
    tags: ["heroes", "combat"]
  },
  ExplainRerollIntent: {
    answer: "Various skills and abilities, as well as grit, allow you to reroll most dice rolls. Some dice rolls can not be rerolled, as is then specified. Note: You may never reroll the same dice more than once.",
    name:	"rerolling",
    tags: ["game concepts"]
  },
  ExplainRunningOutOfCardsIntent: {
    answer: "If you draw a card from a deck that ran out of cards, shuffle the discard pile of that deck, and use it as a new deck to draw from. The following exceptions exist: if you run out of artifact cards, draw a gear card instead. If you run out of growing dread cards, draw a darkness card instead. Note that the loot and scavenging decks have no discard pile. Once a card is drawn, resolve or note its effect, and then shuffle the drawn card back into the deck.",
    name:	"running out of cards",
    tags: ["game concepts"]
  },
  ExplainSaloonGirlIntent: {
    answer: "The saloon girl, or piano player, is a hero class known for their agility and fast movement. While frail, they excel in dodging enemy attacks and healing the group.",
    name:	"saloon girl",
    tags: ["hero classes"]
  },
  ExplainSanityIntent: {
    answer: "A models capacity to take mental damage before being knocked out. Horror and terror hits can at times be avoided with willpower tests. Sanity damage can be reduced by spirit armor. The loss of sanity is tracked by the use of sanity damage markers.",
    name:	"sanity",
    tags: ["heroes", "game concepts"]
  },
  ExplainSharedXPIntent: {
    answer: "Game variant: The hero characters no longer gain experience individually. Instead, the experience is added up. Heroes thus level up at the same time. Heroes that require a different amount of XP to level up, still receive XP individually.",
    name:	"shared xp",
    tags: ["optional rules"]
  },
  ExplainScavengingIntent: {
    answer: "If your hero ends their move on a map tile that has been explored but has not yet been successfully scavenged, they may scavenge. Roll three D6. For every six rolled, draw a scavenge card. Any map tile may be scavenged, except for end caps and gates. A hero may not scavenge more than once per turn, and can not scavenge during a fight. Note that the scavenge deck has no discard pile: all scavenge cards are shuffled back into the deck once that action has been completed.",
    name:	"scavenging",
    tags: ["heroes", "game concepts"]
  },
  ExplainSingleHandedWeaponsIntent: {
    answer: "An item that requires one of the heroes hands to be used. The number of hands an item requires is noted on each card in form of hand icons.",
    name:	"one-handed weapons",
    tags: ["equipment"]
  },
  ExplainSermonIntent: {
    answer: "The preacher, or nun, is able to cast spells in the form of sermons. Those sermons can be cast at any time, even outside the preachers turn, unless the sermon requires the preacher to have not moved. In that case, it can only be cast after the preacher gave up their movement. To cast a sermon, pay the faith cost noted on the card, and roll two D6. If the result is equal to or higher than the sermons casting number, casting it succeeded. The preacher may spend additional faith tokens, to improve the roll by plus one for each additional token spent. Some sermons are especially dangerous, indicated by a tentacle icon on the card. If the preacher rolls doubles for the casting roll of a dangerous sermon, they take that many corruption hits. For example: rolling two fours when casting a dangerous sermon makes the preacher suffer four corruption damage. The preacher also gains experience when successfully casting sermons. Note that sermons can only be cast when they make sense. For example: you can not farm experience by healing a hero who is at full health. At the beginning of each turn, the preacher recovers all spent faith.",
    name:	"sermons",
    tags: ["magic"]
  },
  ExplainSidebagIntent: {
    answer: 'Each hero has a side bag, that can hold up to five side bag tokens at a time. A side bag token is a small "discard to use" item, such as whiskey or bandages. A side bag token is identified by the parchment colored background and green title bar.',
    name:	"sidebag",
    tags: ["sidebag"]
  },
  ExplainShadowsOfBrimstoneIntent: {
    answer: "Shadows of Brimstone, by Flying Frog Productions, is a fully cooperative game for 1-4 players. If combining this Core Set with another Core Set, this can be increased to 5-6 players. All of the players work together against the game itself, and the difficulty is scaled based on the number of Heroes taking part in an adventure",
    name:	"shadows of brimstone",
    tags: ["game concepts"]
  },
  ExplainSidebagTokenIntent: {
    answer: 'A side bag token is identified by the parchment colored background and green title bar. A hero can carry up to five in their side bag. You can use a side bag token at any point in a turn, except when this is limited by its effect. For example, dynamite is used as a ranged attack, and you can only attack during your heroes activation. I can tell you about the following sidebag tokens: bandages, dynamite, flash, herbs, tonic, whiskey',
    name:	"sidebag token",
    tags: ["sidebag"]
  },
  ExplainSkillsIntent: {
    answer: "Each hero has six skills: agility, cunning, spirit, strength, lore, and luck. These Skills are mostly used for making tests during encounters.",
    name:	"skills",
    tags: ["heroes"]
  },
  ExplainThemedThreatDeckIntent: {
    answer: "Game variant: Choose only certain enemies or enemy types for your threat deck, giving it a specific theme. For example: only void creatures, or only hungry dead. For advanced version of themed threats, ask me about adventures",
    name:	"themed threat decks",
    tags: ["optional rules"]
  },
  ExplainThreatCardIntent: {
    answer: "Threat cards display what kind and how many enemies are attacking the heroes. They come in the following versions: low, medium, high, and epic. In addition to the threat cards for attacks in the mines, there are threat cards specific for each otherworld.",
    name:	"threat cards",
    tags: ["game concepts"]
  },
  ExplainTonicIntent: {
    answer: "To use a tonic, discard the token and recover 1 grit",
    name:	"tonic",
    tags: ["sidebag", "equipment"]
  },
  ExplainToughEnemiesIntent: {
    answer: "Some enemies have an ability called 'tough'. Critical hits against tough enemies are treated like regular hits.",
    name:	"tough enemies",
    tags: ["enemies"]
  },
  ExplainTownstayIntent: {
    answer: "After an adventure, the heroes travel to a town (see travel). Once your hero posse has reached a town, put the darkness marker on the number 1 of the town event track. If one or more locations got destroyed, roll that many D6, and consider the town board. The locations with the matching numbers are destroyed. If a location already got destroyed, reroll. At the start of each day in town, each hero must decide whether to pay 10 $ to stay in town, or stay for free at the camp. Heroes staying at the camp have to roll 2 D6 and consult the camp hazard chart. Next, each hero chooses the location to visit on that day, rolls 2 D6, and consults the event chart for that location. Then, each hero can make use of the locations services or buy items as often as desired. Items can be sold in town for half the purchase value at any time and any location. Once each hero has finished their location visit, the hero posse must roll a D6. If the result is higher than the number the darkness marker is on, nothing special happens, and the darkness marker moves to the next higher number. Otherwise, move the darkness marker back to the one, roll two D6, and consult the town event chart. After that, each hero may choose to leave town. They are then no longer affected by town events, but can also no longer return to town until after the next adventure.",
    name:	"townstay",
    tags: ["town"]
  },
  ExplainTradingIntent: {
    answer: "During their turn, heroes can give items to other heroes. If enemies are on the board, the receiving hero can be anywhere on the same map tile. During combat, the receiving hero must stand adjacent.",
    name:	"trading items",
    tags: ["game concepts", "heroes"]
  },
  ExplainTravelIntent: {
    answer: "After a mission has been finished, each hero rolls a D6. On a result of 1 or 2, add a travel hazard to the journey. Resolve the travel hazards one at a time, by rolling 3 D6. The sum of the results equals the number to look for on the travel hazard chart. Once all hazards have been completed, the posse has reached the town. See town.",
    name:	"travelling to town",
    tags: ["town"]
  },
  ExplainUpgradeIntent: {
    answer: 'There are two types of upgrades in Shadows of Brimstone. One refers to the permanent bonus a hero gains when levelling up. The other refers to item upgrades. Items can have up to three upgrade slots. To upgrade an item, visit a blacksmith in town. There are two types of upgrades: forged dark stone and upgrade cards. A forged dark stone upgrade can never be removed. An upgrade card can be removed at any time. You can not have more than one upgrade card of the same type applied to an item.',
    name:	"upgrades",
    tags: ["heroes", "equipment"]
  },
  ExplainUSMarshalIntent: {
    answer: "The US marshal class is with their powerful defense a strong frontline fighter. With their shotgun and doubleshot abilities, they can also deal a lot of damage, and using their badge allows them to boost their fellow heroes.",
    name:	"us marshal",
    tags: ["hero classes"]
  },
  ExplainVoicesIntheDarkIntent: {
    answer: "The lantern one hero is carrying illuminates the map tile that hero is on, as well as any adjacent map tile. A hero that starts their activation on a non-illuminated map tile immediately takes D6 horror hits.",
    name:	"voices in the dark",
    tags: ["game concepts"]
  },
  ExplainItemWeightIntent: {
    answer: "The weight of an item is displayed in the form of anvil icons on the item card. A hero can carry items with a total weight of five plus the heroes strength. If a hero would receive an item that would exceed their weight limit, then the following options exist: 1) another hero gains that item (see trading), 2) that hero drops enough items until they could carry the newly acquired one. Dropped items, depending on the players house rule, either disappear right away, or are marked on that heroes space with a token, to be potentially later picked up during that mission.",
    name:	"item weight",
    tags: ["equipment"]
  },
  ExplainWhiskeyIntent: {
    answer: "To use whiskey, discard the token and heal D6 sanity damage from yourself or an adjacent hero. Don't forget that healing another hero rewards the healer with 5xp for each wound healed",
    name:	"whiskey",
    tags: ["sidebag", "equipment"]
  },
  ExplainCorruptionIntent: {
    answer: "If you take a corruption hit, gain a corruption point for each hit you couldn't defend against with a willpower roll. If you have as many corruption points as corruption resistence (default is 5), you mutate. See mutations. Note that corruption points are not removed at the start or end of an adventure or town stay, and that spirit armor does not help against corruption.",
    name:	"corruption",
    tags: ["heroes", "combat"]
  },
  ExplainMutationIntent: {
    answer: "If you have as many corruption points as corruption resistence (default 5), remove that many points and roll on the mutation table. If you would ever acquire the same mutation twice at the same time, you turn into a pile of goo. That means that you are dead, for good. No resurrection possible.",
    name:	"mutations",
    tags: ["heroes"]
  },
  ExplainPushingAsideIntent: {
    answer: "Large and extra large enemies and heroes can push aside small or medium sized enemies to reach a hero. Those enemies are then pushed to the field the large one has just left, swapping places. Large enemies may push aside any number of small or medium enemies, but no heroes or other large enemies. An enemy four spaces big is considered extra large. Choose one of the four spaces for placement and moving, the rest of the model must be on valid spaces as well.",
    name:	"pushing aside",
    tags: ["enemies", "combat"]
  },
  ExplainItemsIntent: {
    answer: "I can tell you about the following item related subjects: ammo, armor, dark stone, double handed weapons, item weight, looting, sidebag tokens, single handed weapons, trading items.",
    name:	"items",
    tags: ["equipment"]
  }
};

function fetchAnswersByCategory(category) {
  var answersArray = [];
  for(var i in ANSWERS) {
    if(ANSWERS[i].tags.includes(category)) {
      answersArray.push(ANSWERS[i].name);
    }
  }
  return answersArray.sort().join();
}

const CATSET = getCats();
const CATSTRING = Array.from(CATSET).sort();
function getCats() {
  var cats = new Set();
  for(var i in ANSWERS) {
    for(var b in ANSWERS[i].tags) {
      cats.add(ANSWERS[i].tags[b]);
    }
  }
  return cats;
}

const ExplainSkillHandler = {
  async canHandle(handlerInput) {
  const request = handlerInput.requestEnvelope.request;
  return (request.type === 'LaunchRequest' || request.type === 'IntentRequest');
},
async handle(handlerInput) {
  var speechOutput = "";

  if(handlerInput.requestEnvelope.request.type === 'LaunchRequest') {
    speechOutput = "Welcome to the Shadows of Brimstone Assistant. Just ask me to explain something, or ask for help to receive a quick introduction.";
    lastOutput = speechOutput;
  }
  else if(handlerInput.requestEnvelope.request.type === 'IntentRequest') {
    var question = handlerInput.requestEnvelope.request.intent.name;

    speechOutput = "I do not know the answer to this.";
    if(question == "listCategories") {
      speechOutput = "I can tell you about the following categories: " + CATSTRING + ". Feel free to ask me to list one category. For example: list " + CATSET.values().next().value;
    }
    else if(question == "listCategory") {
      // const subject = this.event.request.intent.slots.category.value;
      var category = handlerInput.requestEnvelope.request.intent.slots.category.value;
      switch(category) {
        case "side bag":
        case "side back":
        case "sideback":
              category = "sidebag";
              break;
        case "game concerts":
        case "game contents":
        case "gain concerts":
        case "gain contents":
              category = "game concepts";
              break;
        case "mission":
        case "adventure":
        case "adventures":
              category = "missions";
              break;
        case "enemies":
              category = "enemy";
              break;
      }
      if(CATSET.has(category)) {
        speechOutput = "I can explain to you the following " + category + " related subjects: " + fetchAnswersByCategory(category);
      }
      else {
        speechOutput = "I don't know the category " + category + ". The categories I do know are as follows: " + CATSTRING;
      }
    }
    else if(question in ANSWERS) {
      speechOutput = ANSWERS[question].answer;
    }

    lastOutput = speechOutput;
    speechOutput = "hupsa: " + question;
  }

  var response =  handlerInput.responseBuilder.speak(speechOutput).reprompt("helloooo?").getResponse();
  response.ShouldEndSession = false;
  return response;
},
};

const HelpHandler = {
  canHandle(handlerInput) {
  lastOutput = HELP_MESSAGE;
  const request = handlerInput.requestEnvelope.request;
  return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.HelpIntent';
},
handle(handlerInput) {
  return handlerInput.responseBuilder
      .speak(HELP_MESSAGE)
//      .reprompt(HELP_REPROMPT)
      .getResponse();
},
};

const ExitHandler = {
  canHandle(handlerInput) {
  console.log(`exit 375`);
  const request = handlerInput.requestEnvelope.request;
  return request.type === 'IntentRequest'
      && (request.intent.name === 'AMAZON.StopIntent');
},
handle(handlerInput) {
  return handlerInput.responseBuilder
      .speak(STOP_MESSAGE)
      .withShouldEndSession(true)
      .getResponse();
},
};

const CancelHandler = {
  canHandle(handlerInput) {
  console.log(`exit 375`);
  const request = handlerInput.requestEnvelope.request;
  return request.type === 'IntentRequest'
      && (request.intent.name === 'AMAZON.CancelIntent');
},
handle(handlerInput) {
  return handlerInput.responseBuilder
      .speak(CANCEL_MESSAGE)
      .withShouldEndSession(false)
      .getResponse();
},
};
const RepeatHandler = {
  canHandle(handlerInput) {
  const request = handlerInput.requestEnvelope.request;
  return request.type === 'IntentRequest'
      && (request.intent.name === 'AMAZON.RepeatIntent');
},
handle(handlerInput) {
  return handlerInput.responseBuilder
      .speak(lastOutput)
      .withShouldEndSession(false)
      .getResponse();
},
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
  const request = handlerInput.requestEnvelope.request;
  return request.type === 'SessionEndedRequest';
},
handle(handlerInput) {
  console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

  return handlerInput.responseBuilder.getResponse();
},
};

const ErrorHandler = {
  canHandle() {
  return true;
},
handle(handlerInput, error) {
  console.log(`Error handled: ${error.message}`);

  return handlerInput.responseBuilder
      .speak('Sorry, an error occurred.')
      .reprompt('Sorry, an error occurred.')
      .getResponse();
},
};

const HELP_MESSAGE = 'I help the best if you just ask me to explain something. For example: explain poison, or explain depth event. You can also ask me for an index, and I will list of broad categories I have information about. If I speak too quickly, ask me to repeat. If I speak too much, ask Alexa to cancel.';
const HELP_REPROMPT = 'What?';
const STOP_MESSAGE = 'Goodbye!';
const CANCEL_MESSAGE = 'Sorry.';
const skillBuilder = Alexa.SkillBuilders.standard();


exports.handler = skillBuilder
    .addRequestHandlers(
    HelpHandler,
    ExitHandler,
    RepeatHandler,
    CancelHandler,
    ExplainSkillHandler,
    SessionEndedRequestHandler
)
    .addErrorHandlers(ErrorHandler)
    .lambda();