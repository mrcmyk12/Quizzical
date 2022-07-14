import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchQuestions } from "../actions";
import RenderQuestions from "./RenderQuestions";

const Questions = (props) => {
	useEffect(() => {
		props.fetchQuestions("9", "easy");
		console.log(props.answers);
	}, []);

	if (!props.questions[0]) {
		return <div></div>;
	}

	return (
		<div>
			<RenderQuestions />
		</div>
	);
};

const mapStateToProps = (state) => {
	return { questions: state.questions, answers: state.answers };
};

export default connect(mapStateToProps, {
	fetchQuestions: fetchQuestions
})(Questions);
