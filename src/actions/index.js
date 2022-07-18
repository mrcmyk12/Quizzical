import axios from "axios";

//https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple

export const getSessionKey = ()=>{
	return async (dispatch) => {
		const response = await axios.get(
			`https://opentdb.com/api_token.php?command=request`
		);
		console.log(response.data.token)
		dispatch({type:"SESSION_KEY", payload: response.data.token})
	}
}

export const fetchQuestions = (difficulty, category) => {
	return async (dispatch) => {
		const response = await axios.get(
			`https://opentdb.com/api.php?amount=1&category=${category}&difficulty=${difficulty}&type=multiple`
		);
		console.log(response)
		dispatch({ type: "FETCH_QUESTIONS", payload: response.data.results });
		dispatch({ type: "RESPONSE_CODE", payload: response.data.response_code})
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

export const updateScore = (currentPoints, addedPoints, multiplier) => {
	const intCurrentPoints = parseInt(currentPoints);
	const intAddedPoints = parseInt(addedPoints);
	const intMultiplier = parseInt(multiplier);

	const newPoints = intCurrentPoints + (intAddedPoints * intMultiplier);

	return {
		type: "POINTS",
		payload: newPoints
	};
};


export const selectDifficulty = (difficulty) => {
	console.log(difficulty)
	return {
		type: "SELECTED_DIFFICULTY",
		payload: difficulty
	};
};

export const selectCategory = (category) => {
	console.log(category)
	return {
		type: "SELECTED_CATEGORY",
		payload: category
	};
};
