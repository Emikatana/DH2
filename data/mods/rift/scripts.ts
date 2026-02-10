export const Scripts: ModdedBattleScriptsData = {
    gen: 9,
    actions: {
        canZMove(pokemon: Pokemon) {
    		if (pokemon.side.zMoveUsed ||
    			(pokemon.transformed &&
    				(pokemon.species.isMega || pokemon.species.isPrimal || pokemon.species.forme === "Ultra"))
    		) continue;
    		const item = pokemon.getItem();
    		if (!item.zMove) continue;
    		if (item.itemUser && !item.itemUser.includes(pokemon.species.name)) continue;
    		let atLeastOne = false;
    		let mustStruggle = true;
    		const zMoves: ZMoveOptions = [];
    		for (const moveSlot of pokemon.moveSlots) {
    			if (moveSlot.pp <= 0) {
    				zMoves.push(null);
    				continue;
    			}
    			if (!moveSlot.disabled) {
    				mustStruggle = false;
    			}
    			const move = this.dex.moves.get(moveSlot.move);
    			let zMoveName = this.getZMove(move, pokemon, true) || '';
    			if (zMoveName) {
    				const zMove = this.dex.moves.get(zMoveName);
    				if (!zMove.isZ && zMove.category === 'Status') zMoveName = "Z-" + zMoveName;
    				zMoves.push({ move: zMoveName, target: zMove.target });
    			} else {
    				zMoves.push(null);
    			}
    			if (zMoveName) atLeastOne = true;
    		}
    		if (atLeastOne && !mustStruggle) return zMoves;
	    }
      	getZMove(move: Move, pokemon: Pokemon, skipChecks?: boolean): string | undefined {
			const item = pokemon.getItem();
    		if (!skipChecks) {
    			if (pokemon.side.zMoveUsed) return;
    			if (!item.zMove) continue;
    			if (item.itemUser && !item.itemUser.includes(pokemon.species.name)) return;
    			const moveData = pokemon.getMoveData(move);
    			// Draining the PP of the base move prevents the corresponding Z-move from being used.
    			if (!moveData?.pp) return;
    		}
			if (pokemon.species.id === 'aatrox') {
				return this.battle.dex.moves.get('World Ender');
			}
		  	if (pokemon.species.id === 'ahri') {
				return this.battle.dex.moves.get('Spirit Rush');
			}
			if (pokemon.species.id === 'akshan') {
				return this.battle.dex.moves.get('Comeuppance');
			}
			if (pokemon.species.id === 'alistar') {
				return this.battle.dex.moves.get('Unbreakable Will');
			}
			if (pokemon.species.id === 'amumu') {
				return this.battle.dex.moves.get('Curse of the Sad Mummy');
			}
			if (pokemon.species.id === 'anivia') {
				return this.battle.dex.moves.get('Glacial Storm');
			}
			if (pokemon.species.id === 'annie') {
				return this.battle.dex.moves.get('Summon: Tibbers');
			}
			if (pokemon.species.id === 'ashe') {
				return this.battle.dex.moves.get('Enchanted Crystal Arrow');
			}
			if (pokemon.species.id === 'bard') {
				return this.battle.dex.moves.get('Tempered Fate');
			}
			if (pokemon.species.id === 'brand') {
				return this.battle.dex.moves.get('Pyroclasm');
			}
			if (pokemon.species.id === 'braum') {
				return this.battle.dex.moves.get('Glacial Fissure');
			}
			if (pokemon.species.id === 'briar') {
				return this.battle.dex.moves.get('Certain Death');
			}
			if (pokemon.species.id === 'caitlyn') {
				return this.battle.dex.moves.get('Ace in the Hole');
			}
			if (pokemon.species.id === 'cassiopeia') {
				return this.battle.dex.moves.get('Petrifying Gaze');
			}
			if (pokemon.species.id === 'chogath') {
				return this.battle.dex.moves.get('Feast');
			}
			if (pokemon.species.id === 'twitch') {
				return this.battle.dex.moves.get('Spray and Pray');
			}
    		if (item.zMoveFrom) {
    			if (move.name === item.zMoveFrom) return item.zMove as string;
    		} else if (item.zMove === true) {
    			if (move.type === item.zMoveType) {
    				if (move.category === "Status") {
    					return move.name;
    				} else if (move.zMove?.basePower) {
    					return this.Z_MOVES[move.type];
    				}
    			}
    		}
	    }
    },
};
