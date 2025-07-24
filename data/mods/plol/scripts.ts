export const Scripts: ModdedBattleScriptsData = {
	gen: 9,
	teambuilderConfig: {
		excludeStandardTiers: true,
		customTiers: ["PLOL"],
	},

	init() {
		this.modData('Learnsets', 'aatrox').learnset.basicattack = ['9L1'];
		this.modData('Learnsets', 'aatrox').learnset.thedarkinblade = ['9L1'];
		this.modData('Learnsets', 'aatrox').learnset.infernalchains = ['9L1'];
		this.modData('Learnsets', 'aatrox').learnset.umbraldash = ['9L1'];
		this.modData('Learnsets', 'aatrox').learnset.worldender = ['9L1'];
	},
};
