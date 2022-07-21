import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import {
	fetchQuestions,
	selectCategory,
	selectDifficulty,
	updateRound
} from "../actions";
import { Link } from "react-router-dom";

const Home = ({
	fetchQuestions,
	updateRound,
	selectDifficulty,
	selectCategory,
	response_code,
	points,
	round
}) => {
	const categoryObject = {
		General: 9,
		Books: 10,
		Film: 11,
		Music: 12,
		MusicalsTheater: 13,
		Television: 14,
		VideoGames: 15,
		BoardGames: 16,
		ScienceAndNature: 17,
		Computers: 18,
		Mathematics: 19,
		Mythology: 20,
		Sports: 21,
		Geography: 22,
		History: 23,
		Politics: 24,
		Art: 25,
		Celebrities: 26,
		Animals: 27,
		Vehicles: 28,
		Comics: 29,
		Gadgets: 30,
		Anime: 31,
		Cartoons: 32
	};

	const categoryOptions = [
		"General",
		"Books",
		"Film",
		"Music",
		"Musicals & Theater",
		"Television",
		"Video Games",
		"Science and Nature",
		"Computers",
		"Mathematics",
		"Mythology",
		"Sports",
		"Geography",
		"History",
		"Politics",
		"Art",
		"Celebrities",
		"Animals",
		"Vehicles",
		"Comics",
		"Gadgets",
		"Anime & Manga",
		"Cartoons"
	];

	const [difficulty, setDifficulty] = useState("");
	const [category, setCategory] = useState("");
	const [modal, setModal] = useState(false);
	const [endModal, setEndModal] = useState(false);
	const [fetchCategory, setFetchCategory] = useState(9);

	useEffect(() => {
		if (response_code !== 0) {
			setModal(!modal);
		}
	}, [fetchQuestions]);

	useEffect(() => {
		if (round > 2) {
			setEndModal(!endModal)
		}
	},[]);

	const mapCategories = categoryOptions.map((category) => {
		return (
			<div className="col-sm-2" key={category}>
				<button
					onClick={() => categoryHandler(category)}
					className="category_button">
					{category}
				</button>
			</div>
		);
	});

	const getCategory = (category) => {
		if (category === "Musicals & Theater") {
			return selectCategory(categoryObject["MusicalsTheater"]);
		}
		if (category === "Video Games") {
			return selectCategory(categoryObject["VideoGames"]);
		}
		if (category === "Science and Nature") {
			return selectCategory(categoryObject["ScienceAndNature"]);
		}
		if (category === "Anime & Manga") {
			return selectCategory(categoryObject["Anime"]);
		}

		return selectCategory(categoryObject[category]);
	};

	const categoryHandler = (category) => {
		setCategory(category);
		getCategory(category);
	};

	const difficultyHandler = (level) => {
		setDifficulty(level);
		selectDifficulty(level);
	};

	return (
		<div className="container">
			<div className="row">
				<div className="col-sm-7">
					<p className="subheading_text">
						Difficulty:{" "}
						<b
							className="category_selection"
							style={{ marginRight: "15px" }}>
							{difficulty}
						</b>
						Category:{" "}
						<b
							className="category_selection"
							style={{ marginRight: "15px" }}>
							{category}
						</b>
						Round: <b className="category_selection">{round}</b>
					</p>
				</div>
				<div className="col-sm-3">
					<p className="subheading_text">
						Current Point Total:{" "}
						<b className="point_total_text">{points}</b>
					</p>
				</div>
				<div className="col-sm-2">
					<button className="start_button">
						<Link
							style={{ textDecoration: "none", color: "white" }}
							to={"/questions"}>
							Start Game
						</Link>
					</button>
				</div>
			</div>
			<div className="row">
				<div className="col-sm-3">
					<p className="select_difficulty_text">Select Difficulty</p>
				</div>
			</div>
			<div className="row">
				<div className="col-sm-4">
					<button
						onClick={() => difficultyHandler("easy")}
						className="difficulty_button">
						Easy
					</button>
				</div>
				<div className="col-sm-4">
					<button
						onClick={() => difficultyHandler("medium")}
						className="difficulty_button">
						Medium
					</button>
				</div>
				<div className="col-sm-4">
					<button
						onClick={() => difficultyHandler("hard")}
						className="difficulty_button">
						Hard
					</button>
				</div>
			</div>
			<div className="row">
				<p className="select_difficulty_text">Select Category</p>
			</div>
			<div className="row">{mapCategories}</div>
			<div className="row"></div>
			<div>
				<Modal isOpen={modal}>
					<ModalHeader>Welcome to Quizzical</ModalHeader>
					<ModalBody>
						Welcome to Quizzical. Test your trivia knowledge throughout a
						myriad of categories. So be sure to choose a category and
						difficulty and start your journey. Try to rack up a high score
						so that you can be added to our leaderboard.
					</ModalBody>
					<ModalFooter>
						<button
							className="start_button"
							onClick={() => {
								setModal(!modal);
							}}>
							Start
						</button>
					</ModalFooter>
				</Modal>
			</div>
			<div>
				<Modal isOpen={endModal}>
					<ModalHeader>Game Over</ModalHeader>
					<ModalBody>
						Congrats. You have completed our questions challenge. Your
						score is <b>{points}</b> Press restart to start a new game.
					</ModalBody>
					<ModalFooter>
						<button
							onClick={() => setEndModal(!endModal)}
							className="start_button">
							Restart Game
						</button>
					</ModalFooter>
				</Modal>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		response_code: state.response_code,
		points: state.points,
		round: state.round
	};
};

export default connect(mapStateToProps, {
	fetchQuestions: fetchQuestions,
	selectCategory: selectCategory,
	selectDifficulty: selectDifficulty,
	updateRound: updateRound
})(Home);
