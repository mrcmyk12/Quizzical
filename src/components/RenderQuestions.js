import { render } from "@testing-library/react";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchQuestions, randomizeQuestions, updateScore } from "../actions";

const RenderQuestions = ({ questions, fetchQuestions, updateScore, points, answers, randomizeQuestions }) => {
	const [answerStatus, setAnswerStatus] = useState("");

	if (!questions[0]) {
		return <div></div>;
	}

	const checkAnswer = (answer) => {
		if (answer == questions[0].correct_answer) {
			setAnswerStatus("Correct!");
         fetchQuestions("9","hard")
         updateScore(points, 10)
         
         return;
		}

		setAnswerStatus("Incorrect!");
      fetchQuestions("9","hard")
      
	};

	return (
		<div>
			<div><p>{questions[0].question}</p></div>
			<button onClick={() => checkAnswer(questions[0].incorrect_answers[0])}>
				{questions[0].incorrect_answers[0]}
			</button>
			<button onClick={() => checkAnswer(questions[0].incorrect_answers[1])}>
				{questions[0].incorrect_answers[1]}
			</button>
			<button onClick={() => checkAnswer(questions[0].incorrect_answers[2])}>
				{questions[0].incorrect_answers[2]}
			</button>
			<button onClick={() => checkAnswer(questions[0].correct_answer)}>
				{questions[0].correct_answer}
			</button>
			<div>{answerStatus}</div>
         <div>{points}</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	return { questions: state.questions, points: state.points, answers: state.answers };
};

export default connect(mapStateToProps, { fetchQuestions: fetchQuestions,  updateScore: updateScore })(
	RenderQuestions
);

