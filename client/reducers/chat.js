import { TOGGLE_CHAT_WINDOW } from '../actions/constants.js';

const chat = (state = false, { type }) => {
	switch (type) {
	case TOGGLE_CHAT_WINDOW:
		return !state;
	default:
		return state;
	}
};

export default { chat };
