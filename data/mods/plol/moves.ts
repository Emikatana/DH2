export const Moves: { [moveid: string]: ModdedMoveData } = {
	basicattack: {
		num: -001,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		name: "Basic Attack",
		pp: 15,
		priority: 0,
		flags: { protect: 1, mirror: 1, metronome: 1 },
		onModifyType(move, pokemon) {
			const types = pokemon.getTypes();
			let type = types[0];
			move.type = type;
		},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) {
				move.category = 'Physical';
			}
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Beautiful",
	},
};
