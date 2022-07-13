import { render } from "@testing-library/react";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchQuestions } from "../actions";

const RenderQuestions = ({ questions, fetchQuestions }) => {
	const [answerStatus, setAnswerStatus] = useState("");

	if (!questions[0]) {
		return <div></div>;
	}

	const checkAnswer = (answer) => {
		if (answer == questions[0].correct_answer) {
			setAnswerStatus("Correct!");
         fetchQuestions("9","hard")
         return;
		}

		setAnswerStatus("Incorrect!");
      fetchQuestions("9","hard")
      
	};

	return (
		<div>
			<div>{questions[0].question}</div>
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
		</div>
	);
};

const mapStateToProps = (state) => {
	return { questions: state.questions };
};

export default connect(mapStateToProps, { fetchQuestions: fetchQuestions })(
	RenderQuestions
);

// const render = () => {

//    if(!questions[0]){
//       return(
//          <div></div>
//       )
//    }
