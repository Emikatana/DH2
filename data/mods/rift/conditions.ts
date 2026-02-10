export const Conditions: import('../../../sim/dex-conditions').ModdedConditionDataTable = {
    brn: {
		name: 'brn',
        // all statuses are changed to allow for variable durations and be volatile statuses
		onStart(target, source, sourceEffect) {
            const duration = this.effectState.duration ?? 3;
            this.effectState.turnsLeft = duration;
			if (sourceEffect && sourceEffect.id === 'flameorb') {
				this.add('-status', target, 'brn', '[from] item: Flame Orb');
			} else if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'brn', '[from] ability: ' + sourceEffect.name, `[of] ${source}`);
			} else {
				this.add('-status', target, 'brn');
			}
		},
		// Damage reduction is handled directly in the sim/battle.js damage function
		onResidualOrder: 10,
		onResidual(pokemon) {
			this.damage(pokemon.baseMaxhp / 16);
            this.effectState.turnsLeft--;

            if (this.effectState.turnsLeft <= 0) {
                this.remove();
            }
		},
	},
	par: {
		name: 'par',
		onStart(target, source, sourceEffect) {
            const duration = this.effectState.duration ?? 3;
            this.effectState.turnsLeft = duration;
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'par', '[from] ability: ' + sourceEffect.name, `[of] ${source}`);
			} else {
				this.add('-status', target, 'par');
			}
		},
		onModifySpePriority: -101,
		onModifySpe(spe, pokemon) {
			// Paralysis occurs after all other Speed modifiers, so evaluate all modifiers up to this point first
			spe = this.finalModify(spe);
			if (!pokemon.hasAbility('quickfeet')) {
				spe = Math.floor(spe * 50 / 100);
			}
			return spe;
		},
		onBeforeMovePriority: 1,
		onBeforeMove(pokemon) {
			if (this.randomChance(1, 4)) {
				this.add('cant', pokemon, 'par');
				return false;
			}
		},
        onResidual(pokemon) {
            this.effectState.turnsLeft--;

            if (this.effectState.turnsLeft <= 0) {
                this.remove();
            }
		},
	},
    psn: {
		name: 'psn',
		onStart(target, source, sourceEffect) {
            const duration = this.effectState.duration ?? 3;
            this.effectState.turnsLeft = duration;
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'psn', '[from] ability: ' + sourceEffect.name, `[of] ${source}`);
			} else {
				this.add('-status', target, 'psn');
			}
		},
		onResidualOrder: 9,
		onResidual(pokemon) {
			this.damage(pokemon.baseMaxhp / 8);
            this.effectState.turnsLeft--;

            if (this.effectState.turnsLeft <= 0) {
                this.remove();
            }
		},
	},
    stun: {
		name: 'stun',
        onTrapPokemon(pokemon) {
			pokemon.tryTrap();
		},
		onStart(target, source, sourceEffect) {
            const duration = this.effectState.duration ?? 3;
            this.effectState.turnsLeft = duration;
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'stun', '[from] ability: ' + sourceEffect.name, `[of] ${source}`);
			} else {
				this.add('-status', target, 'stun');
			}
		},
		onBeforeMovePriority: 10,
		onBeforeMove(pokemon, target, move) {
			this.add('cant', pokemon, 'stun');
			return false;
		},
        onResidual(pokemon) {
            this.effectState.turnsLeft--;

            if (this.effectState.turnsLeft <= 0) {
                this.remove();
            }
		},
	},
};
