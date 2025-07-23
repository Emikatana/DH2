export const Abilities: { [abilityid: string]: ModdedAbilityData } = {
	
	deathbringerstance: {
		onBasePowerPriority: 30,
		onBasePower(basePower, attacker, defender, move) {
			if (move.id === 'basicattack' && !attacker.getVolatile('deathbringerstance')) {
				move.basePower = Math.max(move.basePower + 20, 0);
			}
		},
		onSourceDamagingHit(damage, target, source, move) {
			if (move.id === 'basicattack' && !source.getVolatile('deathbringerstance')) {
				this.heal(move.drain[1], source, target, 'drain');
				source.addVolatile('deathbringerstance')
			}
		},
		condition: {},
		flags: {},
		name: "Deathbringer Stance",
		rating: 5,
		num: -001,
	},
	
	
	
};
