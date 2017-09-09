import { Player, Matchup, Bracket } from "../data";

/** A function used to sort the array of players. */
export interface BracketSelectionSorter {
	(p1: Player, p2: Player): number
}

/** Options used to determine how the bracket will be created. */
export interface BracketCreationOptions {
	/** How many players will play in one matchup. (default 2) */
	grouping: number,
	/** A sort method. (default null) */
	selectionSort: BracketSelectionSorter,
	/** A method to modify player positions post-sorting. (default randomizes) */
	selectionMod: (input: Player[]) => Player[],
}

// React ID for lists
let matchupId: number = 0;

/** A default randomizer function applied to the list of players. */
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
	grouping: 2,
	selectionSort: null,
	selectionMod: randomizer,
}

// Holds the player and matchup index for creating a Matchup.
type Input = {
	player: number,
	matchup: number
};

export class BracketCreator {

	/** Creates a bracket from the list of players and options. */
	public static createPlayersBracket(players: Player[], options?: BracketCreationOptions): Bracket {

		// If no options, apply the defaults.
		if (options)
			options = { ...defaultBracketCreationOptions, ...options };
		else
			options = defaultBracketCreationOptions;

		// If we have a sort function, use it
		if (options.selectionSort)
			players = players.sort(options.selectionSort);

		if (options.selectionMod)
			players = options.selectionMod(players);

		const grouping = options.grouping;
		if (!players || players.length < grouping)
			throw new Error("insufficient player input for grouping " + grouping);

		const length = players.length;

		const overall: Matchup[][] = [];
		let tree: Matchup[][] = [];
		// Get the number of first round matches we should have for a perfect bracket setup with no extra games (n).
		const n = BracketCreator.firstRoundMatches(length, grouping);

		// Starting with n < x <= n*[grouping] matchups...
		// Trying to get to n matchups in as few extra games and rounds as possible.

		// Map each player to an object that can hold their last matchup (none).
		const inputs = players.map<Input>(function (player, index) {
			return {
				player: index,
				matchup: -1
			}
		});

		if (length == n * grouping) {
			// Easiest case. E.g., n=8 and 2 players face off, and we have 16 teams - so each of the 16 can play to 8, then 4, then 2, then 1.
			tree = BracketCreator.createMatchupTree(inputs, true, grouping);
		}
		else {
			// In most cases, it won't be as pretty. To deal, create a play-in round to deal with the extra players.
			// Calculate how many matches we'll need to create here.
			let diff = (length - n) / (grouping - 1);
			let additionalGrouping = grouping;
			// If this number is an integer, we can use it. Otherwise, we'll need to fill in with 2-games instead of (grouping) games.
			if (Math.floor(diff) !== diff) {
				diff = length - n;
				additionalGrouping = 2;
			}
			let additional: Input[] = [];
			// Take enough for the difference *and* the matchup opponents needed.
			for (let i = 0; i < diff * additionalGrouping; i++) {
				additional.push(inputs.pop());
			}
			// Create just the play-in round.
			const additionalTree = BracketCreator.createMatchups(additional, additionalGrouping);
			overall.push(additionalTree);
			// Now that those players have a matchup, use the matchup instead of their original "player" for reference.
			let additionalInputs = additionalTree.map<Input>(function (matchup, index) {
				return {
					matchup: index,
					player: -1
				}
			});

			// Create the overall perfect bracket now.
			tree = BracketCreator.createMatchupTree([...additionalInputs, ...inputs], true, grouping);
		}

		for (let i = 0; i < tree.length; i++)
			overall.push(tree[i]);

		return {
			matchups: overall
		};
	}

	// Inputs.length should be a perfect nth of the grouping.
	/** Creates a perfect bracket (optionally as a tree) from the given inputs. */
	private static createMatchupTree(inputs: Input[], recursive: boolean, grouping: number): Matchup[][] {
		if (inputs.length === 1)
			return [];

		const overall: Matchup[][] = [];
		let newRound: Matchup[] = this.createMatchups(inputs, grouping);
		overall.push(newRound);
		if (recursive) {
			const roundInputs = newRound.map<Input>(function (matchup, index) {
				return {
					matchup: index,
					player: null
				}
			})
			const recur = BracketCreator.createMatchupTree(roundInputs, recursive, grouping);
			for (let i = 0; i < recur.length; i++)
				overall.push(recur[i]);
		}
		return overall;
	}

	/** Creates a single round of matchups from the players. Expects no extras. */
	private static createMatchups(inputs: Input[], grouping: number): Matchup[] {
		if (inputs.length === 1)
			return [];

		let round: Matchup[] = [];
		for (let i = 0; i < inputs.length; i += grouping) {
			let matchups: number[] = [];
			let players: number[] = [];
			for (let j = i; j < i + grouping; j++) {
				const input = inputs[j];
				if (input.matchup > -1)
					matchups.push(input.matchup);
				else if (input.player > -1)
					players.push(input.player);
			}

			round.push({
				preceding: matchups,
				players,
				winner: -1,
				reactId: matchupId++
			});
		}
		return round;
	}

	/** Returns the power of [grouping] less than (and not equal to) the number. E.g., (12, 2) => 8. */
	private static firstRoundMatches(input: number, grouping: number): number {

		// Works by taking log(base [grouping]), floor it, then raise [grouping] to that power.
		// We get can get the log with the base of an arbitrary number by dividing by the same log(e) of that arbitrary number.
		return Math.pow(grouping, Math.floor(Math.log(input) / Math.log(grouping)));

		// Old way for base 2 - bitwise shifting. Keep around just in case.
		//if (grouping === 2) {
		//	// Bitwise shifting
		//	let num = input;
		//	num--;
		//	num |= num >> 1;
		//	num |= num >> 2;
		//	num |= num >> 4;
		//	num |= num >> 8;
		//	num |= num >> 16;
		//	num++;
		//	return num / 2;
		//}
	}
}