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
