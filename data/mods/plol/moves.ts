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
	thedarkinblade: {
		num: -002,
		accuracy: 90,
		basePower: 90,
		category: "Physical",
		name: "The Darkin Blade",
		pp: 20,
		priority: 0,
		basePowerCallback(pokemon, target, move) {
			let bp = move.basePower;
			if (this.field.pseudoWeather.thedarkinblade) {
				if (this.field.pseudoWeather.thedarkinblade.duration === 2) {
					bp = move.basePower * 1.25;
				}
				if (this.field.pseudoWeather.thedarkinblade.duration === 1) {
					bp = move.basePower * 1.5625;
				} 
			}
			this.debug(`BP: ${move.basePower}`);
			return bp;
		},
		onTryMove() {
			if (this.field.pseudoWeather.thedarkinblade) return;
			this.field.addPseudoWeather('thedarkinblade');
		},
		onModifyMove(move, pokemon) {
			if (this.field.pseudoWeather.thedarkinblade.duration === 2 || this.field.pseudoWeather.thedarkinblade.duration === 1) {
				move.target = 'allAdjacentFoes';
			}
		},
		condition: {
			duration: 3,
		},
		flags: {protect: 1, mirror: 1, metronome: 1 },
		secondary: null,
		target: "normal",
		type: "Dark",
		contestType: "Cool",
	},
	infernalchains: {
		num: -003,
		accuracy: 90,
		basePower: 50,
		category: "Physical",
		name: "Infernal Chains",
		pp: 20,
		priority: 0,
		condition: {
			duration: 2,
			onStart(target) {
				this.add('-start', target, 'infernalchains');
			},
			onEnd(target) {
				this.add('-end', target, 'infernalchains');
				const chainPull = {
		         name: "Chain Pull",
		         type: "Fire",
		         basePower: 50,
				  	accuracy: 100,
	            category: "Physical",
	            priority: 0,
					onTryMove() {
						this.attrLastMove('[still]');
					},
					onPrepareHit(target, source, move) {
						this.add('-anim', source, 'High Jump Kick', target);
						this.add('-anim', source, 'Thunder', target);
					},
		         flags: {protect: true},
		      };
				// uses Thunder Kick
		      this.actions.useMove(chainPull, null, target);
				target.addVolatile('stun');
			},
		},
		flags: {protect: 1, mirror: 1, metronome: 1 },
		secondary: null,
		target: "normal",
		type: "Fire",
		contestType: "Cool",
	},
	umbraldash: {
		num: -004,
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		name: "Umbral Dash",
		pp: 20,
		priority: 1,
		flags: { contact: 1, protect: 1, mirror: 1, metronome: 1 },
		secondary: null,
		target: "normal",
		type: "Water",
		contestType: "Cool",
	},
	worldender: {
		num: -005,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "World Ender",
		pp: 1,
		priority: 0,
		flags: { snatch: 1, metronome: 1 },
		volatileStatus: 'worldender',
		condition: {
			duration: 3,
			onStart(pokemon) {
				this.add('-start', pokemon, 'move: World Ender');
				this.boost({ atk: 2 }, pokemon);
				this.boost({ spe: 2 }, pokemon);
			},
			onSourceDamagingHit(damage, target, source, move) {
				this.heal(move.drain[1, 2], source, target, 'drain');
			},
			onSourceAfterFaint(length, target, source, effect) {
				if (effect && effect.effectType === 'Move') {
					this.effectState.duration = 3;
				}
			},
			onEnd(pokemon) {
				this.add('-start', pokemon, 'move: World Ender');
				this.boost({ atk: -2 }, pokemon);
				this.boost({ spe: -2 }, pokemon);
			},
		},
		secondary: null,
		isZ: "aatroxz",
		target: "self",
		type: "Dark",
		zMove: { effect: 'clearnegativeboost' },
		contestType: "Cute",
	},
};
