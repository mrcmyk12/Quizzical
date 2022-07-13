import triviaDB from "../apis/triviaDB";
import axios from "axios";

//https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple

export const fetchQuestions = (category, difficulty) => {
	return async (dispatch) => {
		const response = await axios.get(
			`https://opentdb.com/api.php?amount=1&category=${category}&difficulty=${difficulty}&type=multiple`
		);
		dispatch({ type: "FETCH_QUESTIONS", payload: response.data.results });
		
	};
	
	
};



export const jumbleAnswers = (wrongAnswers, correctAnswer) => {

	const finalArray = [];
	wrongAnswers = ["hello"]

	wrongAnswers.map((answer) => {
		finalArray.push(answer)
	})

	finalArray.push(correctAnswer)

	return {
		type: "SELECTED_ANSWERS",
		payload: finalArray
	}
}

export const selectDifficulty = (difficulty) => {
   return {
      type: "SELECTED_DIFFICULTY",
      payload: difficulty
   }
}

export const selectCategory = (category) => {
	return {
		type: 'SELECTED_CATEGORY',
		payload: category
	}
}
