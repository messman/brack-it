import * as Redux from "redux";
import * as ReactRedux from "react-redux";

/** Represents an action with a type and a payload, meant to be consumed by a reducer. */
interface Action<Type, Payload> extends Redux.Action<Type> {
	type: Type;
	payload: Payload;
}

/** Represents an action that takes a separate input and returns a regular Action. */
interface ActionFactory<Type, Payload, Input> extends Redux.ActionCreator<Action<Type, Payload>> {
	(input: Input): Action<Type, Payload>;
	type: Type,
}

/** Creates an action that may take a special input that does not match its payload. */
export function defineActionFactory<Type, Payload>(type: Type): ActionFactory<Type, Payload, Payload>;
export function defineActionFactory<Type, Payload, Input>(type: Type, processor?: (input: Input) => Payload): ActionFactory<Type, Payload, Input>;
export function defineActionFactory<Type, Payload, Input>(type: Type, processor?: (input: Input) => Payload): ActionFactory<Type, Payload, Input> {
	var f: any;
	if (processor !== undefined)
		f = (function (input: Input) { return { type, payload: processor(input) } } as ActionFactory<Type, Payload, Input>);
	else
		f = (function (payload: Payload) { return { type, payload } } as ActionFactory<Type, Payload, Payload>)
	f.type = type;
	return f;
}

export enum Flags {
	none = 0,
	highlight = 1,
}

export const FlagUtils = {
	has: function has(value: Flags, flags: Flags): boolean {
		return (value & flags) === flags;
	},
	toggle: function toggle(value: Flags, flags: Flags, onOff?: boolean): Flags {
		if (onOff === undefined)
			return value & flags; // Toggle
		if (onOff)
			return value | flags; // On
		return value & ~flags; // Off
	},
}