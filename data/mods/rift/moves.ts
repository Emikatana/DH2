export const Moves: import('../../../sim/dex-moves').ModdedMoveDataTable = {
    basicattack: {
		num: -1,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Basic Attack",
		pp: 20,
		priority: 0,
		flags: { protect: 1, mirror: 1, metronome: 1 },
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Tough",
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
            const meleeChamps = ['aatrox', 'alistar', 'amumu', 'braum', 'briar', 'chogath'];
			if (meleeChamps.includes(pokemon.species.id) {
				this.add('-anim', source, 'Sacred Sword', target);
			}
			else this.add('-anim', source, 'Aura Sphere', target);
		},
        onModifyMove(move, pokemon, target) {
			const meleeChamps = ['aatrox', 'alistar', 'amumu', 'braum', 'briar', 'chogath'];
			if (meleeChamps.includes(pokemon.species.id) {
				move.flags.contact = 1;
			}
		},
        onModifyType(move, pokemon) {
			const types = pokemon.getTypes();
			let type = types[0];
			if (type === 'Bird') type = '???';
			if (type === '???' && types[1]) type = types[1];
			move.type = type;
        },
		shortDesc: "A basic attack.",
		desc: "A basic attack.",
	},
};
