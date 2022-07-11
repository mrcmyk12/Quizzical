import triviaDB from "../apis/triviaDB";
import axios from "axios";

//https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple

export const fetchQuestions = (category, difficulty) => {
	return async (dispatch) => {
		const response = await axios.get(
			`https://opentdb.com/api.php?amount=5&category=${category}&difficulty=${difficulty}&type=multiple`
		);

		dispatch({ type: "FETCH_QUESTIONS", payload: response.data.results });
	};
};
