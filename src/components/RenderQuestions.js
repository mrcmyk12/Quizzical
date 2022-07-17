import { render } from "@testing-library/react";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";

import { fetchQuestions, updateScore } from "../actions";

const RenderQuestions = ({
	questions,
	fetchQuestions,
	updateScore,
	points,
	answers,
	category,
	difficulty
}) => {
	const [answerStatus, setAnswerStatus] = useState("");
	const [seconds, setSeconds] = useState(0);
	const [minutes, setMinutes] = useState(0);
	const [count, setCount] = useState(1)

	var timer;

	useEffect(() => {
		timer = setInterval(() => {
			setSeconds(seconds + 1);

			if (seconds === 59) {
				setMinutes(minutes + 1);
				setSeconds(0);
			}

			if (seconds == "Game Paused") {
				setSeconds("Game Paused");
			}
			checkTime();
		}, 1000);

		return () => clearInterval(timer);
	});

	if (!questions[0]) {
		return <div></div>;
	}

	const displayAnswerStatus = (answerStatus) => {
		if (answerStatus === "correct") {
			return setTimeout(() => {
				return <p className={`${answerStatus}`}>{answerStatus}</p>;
			}, 2000);
		}
		if (answerStatus === "wrong") {
			return setTimeout(() => {
				return <p className={`${answerStatus}`}>{answerStatus}</p>;
			}, 2000);
		}

		if (answerStatus === "resumed") {
			return setTimeout(() => {
				return <p className={`${answerStatus}`}>{answerStatus}</p>;
			}, 2000);
		}

		return <p className={`${answerStatus}`}>{answerStatus}</p>;
	};

	const checkTime = () => {
		if (seconds === 15) {
			setAnswerStatus("wrong");
			fetchQuestions(difficulty, category);
			setSeconds(0);
			setCount(count + 1)
		}
	};

	const pause = () => {
		setSeconds("Game Paused");
		setAnswerStatus("paused");
	};

	const play = () => {
		setAnswerStatus("resumed");
		fetchQuestions(difficulty, category);
		setSeconds(0);
	};

	const checkCount = ()=>{
		if(count === 10){
			
		}
	}

	const checkAnswer = (answer) => {
		if (answer == questions[0].correct_answer) {
			setAnswerStatus("correct");
			fetchQuestions(difficulty,category);
			setSeconds(0);
			updateScore(points, 10);
			setCount(count + 1)
			return;
		}

		setAnswerStatus("wrong");
		fetchQuestions(difficulty,category);
		setCount(count + 1)
		setSeconds(0);
	};

	const displayTime = () => {
		if (seconds === "Game Paused") {
			return <p className="game_paused_text">Paused</p>;
		}

		return <p className="time_text">:{seconds}</p>;
	};

	const questionCleaner = (question) => {

		if(!question){
			return <div></div>
		}

		return question.replaceAll(/&quot;|&#039;/g, "'");
	};

	const renderAnswers = () => {
		if (!answers) {
			setTimeout(renderAnswers(), 1000);
		}

		answers.map((answer) => {
			return <div>{answer}</div>;
		});
	};

	return (
		<div>
			<div className="container">
				<div className="row" style={{ marginBottom: "30px" }}>
					<div className="col-3">
						<p className="point_text">{points}</p>
					</div>
					<div className="col-5">
						<p className={`${answerStatus}`}>{answerStatus}</p>
					</div>
					<div className="col-1">
						<a onClick={() => play()}>
							<FontAwesomeIcon
								className="fa-2xl"
								style={{ color: "rgb(248,6,6)", padding: "25" }}
								icon={faPlay}
							/>
						</a>
					</div>
					<div className="col-1">
						<a onClick={() => pause()}>
							<FontAwesomeIcon
								className="fa-2xl"
								style={{ color: "rgb(21,203,17)", padding: "25" }}
								icon={faPause}
							/>
						</a>
					</div>
					<div className="col-1">
						<p className="time_text">{displayTime()}</p>
						<p className="question_count_text">#{count}</p>
					</div>
				</div>
				<div className="row">
					<div className="card question-card">
						<p>{questionCleaner(questions[0].question)}</p>
					</div>
				</div>
				<div className="row">
					<div className="col-6">
						<button
							className="answer_button"
							onClick={() => checkAnswer(answers[0])}>
							{questionCleaner(answers[0])}
						</button>
					</div>
					<div className="col-6">
						<button
							className="answer_button"
							onClick={() => checkAnswer(answers[1])}>
							{questionCleaner(answers[1])}
						</button>
					</div>
					<div className="col-6">
						<button
							className="answer_button"
							onClick={() => checkAnswer(answers[2])}>
							{questionCleaner(answers[2])}
						</button>
					</div>
					<div className="col-6">
						<button
							className="answer_button"
							onClick={() => checkAnswer(answers[3])}>
							{questionCleaner(answers[3])}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		questions: state.questions,
		points: state.points,
		answers: state.answers,
		difficulty: state.difficulty,
		category: state.category
	};
};

export default connect(mapStateToProps, {
	fetchQuestions: fetchQuestions,
	updateScore: updateScore
})(RenderQuestions);
