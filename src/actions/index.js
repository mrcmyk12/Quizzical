import triviaDB from "../apis/triviaDB";
import axios from "axios";

//https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple

export const fetchQuestions = (category, difficulty) => {
	return async (dispatch) => {
		const response = await axios.get(
			`https://opentdb.com/api.php?amount=1&category=${category}&difficulty=${difficulty}&type=multiple`
		);
		dispatch({ type: "FETCH_QUESTIONS", payload: response.data.results });
		randomizeQuestions(response.data.results[0].incorrect_answers, response.data.results[0].correct_answer)
		
	};
	
	
};

	const randomizeQuestions = (incorrectAnswers, correctAnswer) => {
	const newArray = [...incorrectAnswers, correctAnswer]

	

	const questions = shuffle(newArray)

	console.log(questions)

	return {
		type: "SELECTED_ANSWERS",
		payload: questions
	}
}

function shuffle(a) {
	var j, x, i;
	for (i = a.length - 1; i > 0; i--) {
		 j = Math.floor(Math.random() * (i + 1));
		 x = a[i];
		 a[i] = a[j];
		 a[j] = x;
	}
	return a;
}

// const randomGenerator = (answer, sortedArray)=> {
// 	const randNumber = Math.floor(Math.random() * 4)
		
// 		if(sortedArray[randNumber] === ""){
// 			sortedArray[randNumber] = answer
// 		}

// 		if(sortedArray[randNumber] === answer){
// 			return
// 		}

// 		return

// }



export const updateScore = (currentPoints, addedPoints) => {

	const	newPoints = currentPoints * addedPoints

	return{
		type:'POINTS',
		payload: newPoints
	}
}



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
