export default (state = [], action) => {
	switch (action.type) {
		case "RESPONSE_CODE":
			return action.payload;
		default:
			return state;
	}
};
