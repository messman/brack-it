import { Player, Matchup, Bracket } from "../data";

export interface BracketSelectionSorter {
	(p1: Player, p2: Player): number
}

export interface BracketCreationOptions {
	selectionSort: BracketSelectionSorter,
	selectionMod: (input: Player[]) => Player[],
}

let matchupId: number = 0;

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
	selectionSort: null,
	selectionMod: randomizer,
}

type Input = {
	player: number,
	matchup: number
};

export class BracketCreator {

	public static createPlayersBracket(players: Player[], options?: BracketCreationOptions): Bracket {

		if (options)
			options = { ...defaultBracketCreationOptions, ...options };
		else
			options = defaultBracketCreationOptions;

		if (options.selectionSort)
			players = players.sort(options.selectionSort);

		if (options.selectionMod)
			players = options.selectionMod(players);

		if (!players || players.length < 2)
			throw new Error("insufficient player input");

		const length = players.length;

		const overall: Matchup[][] = [];
		let tree: Matchup[][] = [];
		const n = BracketCreator.firstRoundMatches(length);

		// Starting with n < x <= n*2 matchups
		// Trying to get to n matchups in as few extra games and rounds as possible

		const inputs = players.map<Input>(function (player, index) {
			return {
				player: index,
				matchup: -1
			}
		});

		if (length == n * 2) {
			tree = BracketCreator.createMatchupTree(inputs, true);
		}
		else {
			const dif = length - n;
			let additional: Input[] = [];
			for (let i = 0; i < dif * 2; i++) {
				additional.push(inputs.pop());
			}
			const additionalTree = BracketCreator.createMatchups(additional);
			overall.push(additionalTree);
			let additionalInputs = additionalTree.map<Input>(function (matchup, index) {
				return {
					matchup: index,
					player: -1
				}
			});
			tree = BracketCreator.createMatchupTree([...additionalInputs, ...inputs], true);
		}

		for (let i = 0; i < tree.length; i++)
			overall.push(tree[i]);

		return {
			matchups: overall
		};
	}

	private static createMatchupTree(inputs: Input[], recursive: boolean, grouping: number = 2): Matchup[][] {
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

	private static createMatchups(inputs: Input[], grouping: number = 2): Matchup[] {
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