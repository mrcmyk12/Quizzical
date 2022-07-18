import { render } from "@testing-library/react";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

import { fetchQuestions, updateScore } from "../actions";

const RenderQuestions = ({
	questions,
	fetchQuestions,
	updateScore,
	points,
	answers,
	category,
	difficulty,
	response_code
}) => {
	const [answerStatus, setAnswerStatus] = useState("");
	const [seconds, setSeconds] = useState(0);
	const [minutes, setMinutes] = useState(0);
	const [count, setCount] = useState(1);
	const [modal, setModal] = useState(false);
	const [otherModal, setOtherModal] = useState(false);

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

			if(seconds == "Game Over"){
				setSeconds("Game Over")
			}
			checkTime();
		}, 1000);

		return () => clearInterval(timer);
	});

	if (!questions[0]) {
		return <div></div>;
	}

	const toggleEnd = () => {
		if (count == 2) {
			setSeconds("Game Over")
			setAnswerStatus("Game Over")
			setModal(!modal);
			return;
		}
		return;
	};

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
		setSeconds(0);
	};

	const checkAnswer = (answer) => {
		if (answer == questions[0].correct_answer) {
			setAnswerStatus("correct");
			fetchQuestions(difficulty, category);
			setSeconds(0);
			updateScore(points, 10, difficultyMultiplier[difficulty]);
			console.log(count);
			return;
		}

		setAnswerStatus("wrong");
		fetchQuestions(difficulty, category);
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
						<p className="question_count_text">#{count - 1}</p>
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
									Lorem ipsum dolor sit amet, consectetur adipisicing
									elit, sed do eiusmod tempor incididunt ut labore et
									dolore magna aliqua. Ut enim ad minim veniam, quis
									nostrud exercitation ullamco laboris nisi ut aliquip
									ex ea commodo consequat. Duis aute irure dolor in
									reprehenderit in voluptate velit esse cillum dolore
									eu fugiat nulla pariatur. Excepteur sint occaecat
									cupidatat non proident, sunt in culpa qui officia
									deserunt mollit anim id est laborum.
								</ModalBody>
								<ModalFooter>
									<button className="difficulty_button">
										<Link style={{textDecoration:"none", color:"white"}} to={"/"}>Back to Home Page</Link>
									</button>
								</ModalFooter>
							</Modal>
						</div>
						<div>
							<Modal isOpen={otherModal}>
								<ModalHeader>Oops</ModalHeader>
								<ModalBody>
									Oh no, something went wrong.  Please hit the button below to attempt to fetch the question again
								</ModalBody>
								<ModalFooter>
									<button onClick={()=>{fetchQuestions(difficulty, category) ; setOtherModal(!otherModal)}}>
										Try Again
									</button>
								</ModalFooter>
							</Modal>
						</div>
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
		response_code: state.response_code
	};
};

export default connect(mapStateToProps, {
	fetchQuestions: fetchQuestions,
	updateScore: updateScore
})(RenderQuestions);
