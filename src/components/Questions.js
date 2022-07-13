import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchQuestions, selectDifficulty, selectCategory } from "../actions";
import RenderQuestion from "./RenderQuestion";

const Questions = (props) => {

	useEffect(() => {
		props.fetchQuestions("2","hard")
	},[]);

	console.log(props.questions)

	return (
		<div>
         <div>
				<div>
					<button onClick={()=> props.fetchQuestions("9","hard")}>Start Game</button>
				</div>
            <RenderQuestion questions={props.questions}/>
         </div>
		</div>
	);
};

const mapStateToProps = (state) => {
	return { questions: state.questions };
};

export default connect(mapStateToProps, {
	fetchQuestions: fetchQuestions
})(Questions);
