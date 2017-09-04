import { Player } from "../data";

export interface BracketSelectionSorter {
	(p1: Player, p2: Player): number
}

export interface BracketCreationOptions {
}

export interface BracketCreationPlayerOptions extends BracketCreationOptions {
	selectionSort: BracketSelectionSorter,
	selectionMod: (input: Player[]) => Player[],
}

const randomizer = function randomizer(players: Player[]): Player[] {
	// Do the Durstenfeld shuffle (in-place)
	for (let i = players.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		const temp = players[i];
		players[i] = players[j];
		players[j] = temp;
	}
	return players;
}

export const defaultBracketCreationOptions: BracketCreationOptions = {
}

export const defaultBracketCreationPlayerOptions: BracketCreationPlayerOptions = {
	selectionSort: null,
	selectionMod: randomizer,
	...defaultBracketCreationOptions
}

export interface Matchup {
	players: Matchup[],
	winner: Player,
}

export class BracketCreator {

	public static createPlayersBracket(players: Player[], options?: BracketCreationPlayerOptions): Matchup[] {

		if (options)
			options = { ...defaultBracketCreationPlayerOptions, ...options };
		else
			options = defaultBracketCreationPlayerOptions;

		if (options.selectionSort)
			players = players.sort(options.selectionSort);

		if (options.selectionMod)
			players = options.selectionMod(players);

		const initialMatchups = players.map<Matchup>(function (player) {
			return {
				players: null,
				winner: player
			}
		});

		return BracketCreator.createBracket(initialMatchups, options);
	}

	public static createBracket(initial: Matchup[], options?: BracketCreationOptions): Matchup[] {

		if (options)
			options = { ...defaultBracketCreationOptions, ...options };
		else
			options = defaultBracketCreationOptions;

		if (!initial || initial.length === 0)
			throw new Error("cannot create bracket with no input");

		const length = initial.length;
		if (length === 1)
			return initial;

		const overall: Matchup[] = [];
		const n = BracketCreator.firstRoundMatches(length);

		// Starting with n < x <= n*2 matchups
		// Trying to get to n matchups in as few extra games and rounds as possible

		if (length == n * 2) {
			return BracketCreator.fillProper(initial, true);
		}
		else {
			const dif = length - n;
			let additional: Matchup[] = [];
			for (let i = 0; i < dif * 2; i++) {
				additional.push(initial.pop());
			}
			const additionalProper = BracketCreator.fillProper(additional, false);
			return BracketCreator.fillProper([...additionalProper, ...initial], true);
		}
	}

	private static fillProper(input: Matchup[], recursive: boolean, grouping: number = 2): Matchup[] {
		console.log("input", input);
		if (input.length === 1)
			return [];

		const overall: Matchup[] = [];
		for (let i = 0; i < input.length; i += grouping) {
			let matchups: Matchup[] = [];
			for (let j = i; j < i + grouping; j++)
				matchups.push(input[j]);

			overall.push({
				players: matchups,
				winner: null
			});
		}
		if (recursive) {
			const recur = BracketCreator.fillProper(overall, recursive, grouping);
			console.log("recur", recur);
			for (let i = 0; i < recur.length; i++)
				overall.push(recur[i]);
		}
		console.log("overall", overall);
		return overall;
	}

	private static firstRoundMatches(input: number, grouping: number = 2): number {
		if (grouping === 2) {
			// Bitwise shifting
			let num = input;
			num--;
			num |= num >> 1;
			num |= num >> 2;
			num |= num >> 4;
			num |= num >> 8;
			num |= num >> 16;
			num++;
			return num / 2;
		}
		else {
			throw new Error("not implemented");
		}
	}
}