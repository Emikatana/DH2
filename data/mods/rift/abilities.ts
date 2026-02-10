export const Abilities: import('../../../sim/dex-abilities').ModdedAbilityDataTable = {
    deathbringerstance: {
        onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender) {
			if (atk.id === 'basicattack' && !source.volatiles['alreadyAttacked']) {
				this.debug('db boost');
				return atk + 20;
			}
		},
        onModifyMove(move, source, target) {
            if (atk.id === 'basicattack' && !source.volatiles['alreadyAttacked']) {
				move.drain = [1, 1];
			}
		},
        onAfterMoveSecondarySelf(source, target, move) {
            if (atk.id === 'basicattack' && !source.volatiles['alreadyAttacked']) {
                source.addVolatile('alreadyAttacked');
            }
        },
		flags: {},
		name: "Deathbringer Stance",
		rating: 5,
		num: -1,
		shortDesc: "First basic attack after switching in gains +20 BP and +100% Drain.",
	},
};
