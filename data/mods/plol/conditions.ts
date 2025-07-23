import {Pokemon} from '../../../sim/pokemon';
import {FS} from '../../../lib';
import {toID} from '../../../sim/dex-data';
const usergroups: {[userid: string]: string} = {};
const usergroupData = FS('config/usergroups.csv').readIfExistsSync().split('\n');
for (const row of usergroupData) {
	if (!toID(row)) continue;

	const cells = row.split(',');
	if (cells.length > 3) throw new Error(`Invalid entry when parsing usergroups.csv`);
	usergroups[toID(cells[0])] = cells[1].trim() || ' ';
}

export function getName(name: string): string {
	const userid = toID(name);
	if (!userid) throw new Error('No/Invalid name passed to getSymbol');

	const group = usergroups[userid] || ' ';
	return group + name;
}

export const Conditions: {[k: string]: ConditionData} = {
  stun: {
    name: 'stun',
		duration: 2,
		onBeforeMovePriority: 11,
		onBeforeMove(pokemon) {
			this.add('cant', pokemon, 'stun');
		  pokemon.removeVolatile('stun');
		  return null;
		},
		onStart(pokemon) {
		  this.add('-stun', pokemon);
		},
		onLockMove: 'stun',
	},
  
};
