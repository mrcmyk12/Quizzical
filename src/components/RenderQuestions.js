import { render } from "@testing-library/react";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

import { fetchQuestions, updateScore, updateRound } from "../actions";

const RenderQuestions = ({
	questions,
	fetchQuestions,
	updateScore,
	points,
	answers,
	category,
	difficulty,
	response_code,
	updateRound,
	round
}) => {
	const [answerStatus, setAnswerStatus] = useState("");
	const [seconds, setSeconds] = useState(0);
	const [minutes, setMinutes] = useState(0);
	const [count, setCount] = useState(1);
	const [modal, setModal] = useState(false);
	const [otherModal, setOtherModal] = useState(false);
	const [questionQueue, setQuestionQueue] = useState([]);

	var timer;

	const difficultyMultiplier = {
		easy: 1,
		medium: 5,
		hard: 10
	};

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

			if (seconds == "Game Over") {
				setSeconds("Game Over");
			}
			checkTime();
		}, 1000);

		return () => clearInterval(timer);
	});

	if (!questions[0]) {
		return <div></div>;
	}

	const toggleEnd = () => {
		if (count == 10) {
			setSeconds("Game Over");
			setAnswerStatus("Game Over");
			setModal(!modal);
			updateRound(round);
			return;
		}
		return;
	};

	// const checkRedundancy = (question) => {
	// 	const status = questionQueue.find(question);

	// 	if (status) {
	// 		fetchQuestions(difficulty, category);
	// 		setSeconds(0);
	// 		return;
	// 	}

	// 	return;
	// };

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
			setQuestionQueue([questionQueue.push(questions[0].question)]);
			console.log(questionQueue);
			
			setSeconds(0);

			setCount(count + 1);
		}
	};

	const pause = () => {
		setSeconds("Game Paused");
		setAnswerStatus("paused");
	};


	const play = () => {
		setAnswerStatus("resumed");
		fetchQuestions(difficulty, category);
		setQuestionQueue([questionQueue.push(questions[0].question)]);
		console.log(questionQueue);
	
		setSeconds(0);
	};

	const checkAnswer = (answer) => {
		if (answer == questions[0].correct_answer) {
			setAnswerStatus("correct");
			fetchQuestions(difficulty, category);
			setQuestionQueue([questionQueue.push(questions[0].question)]);
			console.log(questionQueue);
		
			setSeconds(0);
			updateScore(points, 10, difficultyMultiplier[difficulty]);
			console.log(count);
			return;
		}

		setAnswerStatus("wrong");
		fetchQuestions(difficulty, category);
		setQuestionQueue([questionQueue.push(questions[0].question)]);
		console.log(questionQueue);
		
		setSeconds(0);
		console.log(count);
	};

	const displayTime = () => {
		if (seconds === "Game Paused") {
			return <p className="game_paused_text">Paused</p>;
		}

		return <p className="time_text">:{seconds}</p>;
	};

	const questionCleaner = (question) => {
		if (!question) {
			return <div></div>;
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
		<div className="container">
			<div className="row" style={{ marginBottom: "30px" }}>
				<div className="col">
					<p className="point_text">{points}</p>
				</div>
				<div className="col">
					<p className={`${answerStatus}`}>{answerStatus}</p>
				</div>
				<div className="row">
					<div className="col">
						<a onClick={() => play()}>
							<FontAwesomeIcon
								className="fa-2xl"
								style={{ color: "rgb(248,6,6)", padding: "25" }}
								icon={faPlay}
							/>
						</a>
					</div>
					<div className="col">
						<a onClick={() => pause()}>
							<FontAwesomeIcon
								className="fa-2xl"
								style={{ color: "rgb(21,203,17)", padding: "25" }}
								icon={faPause}
							/>
						</a>
					</div>
					<div className="col">
						<p className="time_text">{displayTime()}</p>
						<p className="question_count_text">Question #{count - 1}</p>
					</div>
				</div>
				<div className="row">
					<div className="card question-card">
						<p>{questionCleaner(questions[0].question)}</p>
					</div>
				</div>
			</div>
			<div className="row">
				<div className="col-6">
					<button
						className="answer_button"
						onClick={() => {
							setCount(count + 1);
							toggleEnd();
							checkAnswer(answers[0]);
						}}>
						{questionCleaner(answers[0])}
					</button>
				</div>
				<div className="col-6">
					<button
						className="answer_button"
						onClick={() => {
							setCount(count + 1);
							toggleEnd();
							checkAnswer(answers[1]);
						}}>
						{questionCleaner(answers[1])}
					</button>
				</div>
				<div className="col-6">
					<button
						className="answer_button"
						onClick={() => {
							setCount(count + 1);
							toggleEnd();
							checkAnswer(answers[2]);
						}}>
						{questionCleaner(answers[2])}
					</button>
				</div>
				<div className="col-6">
					<button
						className="answer_button"
						onClick={() => {
							setCount(count + 1);
							toggleEnd();
							checkAnswer(answers[3]);
						}}>
						{questionCleaner(answers[3])}
					</button>
				</div>
				<div>
					<div>
						<Modal isOpen={modal}>
							<ModalHeader>Round Over</ModalHeader>
							<ModalBody>
								Awesome. You have finished this round. Go back to the
								home page and select a different category to score some
								more points.
							</ModalBody>
							<ModalFooter>
								<button className="difficulty_button">
									<Link
										style={{
											textDecoration: "none",
											color: "white"
										}}
										to={"/"}>
										Back to Home Page
									</Link>
								</button>
							</ModalFooter>
						</Modal>
					</div>
					<div>
						<Modal isOpen={otherModal}>
							<ModalHeader>Oops</ModalHeader>
							<ModalBody>
								Oh no, something went wrong. Please hit the button below
								to attempt to fetch the question again
							</ModalBody>
							<ModalFooter>
								<button
									onClick={() => {
										fetchQuestions(difficulty, category);
										setOtherModal(!otherModal);
									}}>
									Try Again
								</button>
							</ModalFooter>
						</Modal>
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
		category: state.category,
		response_code: state.response_code,
		round: state.round
	};
};

export default connect(mapStateToProps, {
	fetchQuestions: fetchQuestions,
	updateScore: updateScore,
	updateRound: updateRound
})(RenderQuestions);
