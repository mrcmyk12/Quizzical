import { render } from "@testing-library/react";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchQuestions, updateScore } from "../actions";
import Timer from "./Timer";

const RenderQuestions = ({
	questions,
	fetchQuestions,
	updateScore,
	points,
	answers
}) => {
	const [answerStatus, setAnswerStatus] = useState("");

	if (!questions[0]) {
		return <div></div>;
	}

	const checkAnswer = (answer) => {
		if (answer == questions[0].correct_answer) {
			setAnswerStatus("Correct!");
			fetchQuestions("medium");
			updateScore(points, 10);
			return;
		}

		setAnswerStatus("Incorrect!");
		fetchQuestions("medium");
	};

	const renderAnswers = () => {
		if (!answers) {
			setTimeout(renderAnswers(), 500);
		}

		answers.map((answer) => {
			return <div>{answer}</div>;
		});
	};

	return (
		<div>
			<div>
				<p>{questions[0].question}</p>
			</div>
			<button onClick={() => checkAnswer(answers[0])}>{answers[0]}</button>
			<button onClick={() => checkAnswer(answers[1])}>{answers[1]}</button>
			<button onClick={() => checkAnswer(answers[2])}>{answers[2]}</button>
			<button onClick={() => checkAnswer(answers[3])}>{answers[3]}</button>
			<div>{answerStatus}</div>
			<div>{points}</div>
         <Timer />
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		questions: state.questions,
		points: state.points,
		answers: state.answers
	};
};

export default connect(mapStateToProps, {
	fetchQuestions: fetchQuestions,
	updateScore: updateScore
})(RenderQuestions);
