import React, { useState } from "react";
import { connect } from "react-redux";
import { fetchQuestions, selectCategory, selectDifficulty } from "../actions";
import { Link } from "react-router-dom";

const Home = ({ fetchQuestions, selectDifficulty, selectCategory }) => {
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

	const [difficulty, setDifficulty] = useState("easy");
	const [category, setCategory] = useState("general");
	const [fetchCategory, setFetchCategory] = useState(9);

	const mapCategories = categoryOptions.map((category) => {
		return (
			<div className="col-2" key={category}>
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
			return selectCategory(categoryObject["MusicalsTheater"]) 
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
      selectDifficulty(level)
	};

	return (
		<div className="container">
			<div className="row">
				<div className="col-3">
					<p className="select_difficulty_text">Select Difficulty</p>
				</div>
				<div className="col-7">
					<p className="subheading_text">
						Difficulty:{" "}
						<b
							className="category_selection"
							style={{ marginRight: "15px" }}>
							{difficulty}
						</b>
						Category: <b className="category_selection">{category}</b>
					</p>
				</div>
				<div className="col-2">
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
				<div className="col">
					<button
						onClick={() => difficultyHandler("easy")}
						className="difficulty_button">
						Easy
					</button>
				</div>
				<div className="col">
					<button
						onClick={() => difficultyHandler("medium")}
						className="difficulty_button">
						Medium
					</button>
				</div>
				<div className="col">
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
		</div>
	);
};

export default connect(null, {
	fetchQuestions: fetchQuestions,
	selectCategory: selectCategory,
	selectDifficulty: selectDifficulty
})(Home);
