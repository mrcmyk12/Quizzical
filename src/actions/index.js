import axios from "axios";

//https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple

export const fetchQuestions = (difficulty) => {
	return async (dispatch) => {
		const response = await axios.get(
			`https://opentdb.com/api.php?amount=1&difficulty=${difficulty}&type=multiple`
		);
		dispatch({ type: "FETCH_QUESTIONS", payload: response.data.results });
		dispatch({type: "SELECTED_ANSWERS", payload: randomizeQuestions(response.data.results[0].incorrect_answers, response.data.results[0].correct_answer)})
	};
};

const randomizeQuestions = (incorrectAnswers, correctAnswer) => {

	if(!incorrectAnswers[0]){
		return
	}

	const newArray = [...incorrectAnswers, correctAnswer];

	const questions = shuffle(newArray);
	return questions
};

const shuffle = (a) => {
	var j, x, i;
	for (i = a.length - 1; i > 0; i--) {
		j = Math.floor(Math.random() * (i + 1));
		x = a[i];
		a[i] = a[j];
		a[j] = x;
	}
	return a;
}

export const updateScore = (currentPoints, addedPoints) => {
	const newPoints = currentPoints * addedPoints;

	return {
		type: "POINTS",
		payload: newPoints
	};
};



export const selectDifficulty = (difficulty) => {
	return {
		type: "SELECTED_DIFFICULTY",
		payload: difficulty
	};
};

export const selectCategory = (category) => {
	return {
		type: "SELECTED_CATEGORY",
		payload: category
	};
};
