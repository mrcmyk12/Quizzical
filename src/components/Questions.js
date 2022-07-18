import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchQuestions, getSessionKey } from "../actions";
import RenderQuestions from "./RenderQuestions";

const Questions = (props) => {
	useEffect(() => {
		props.getSessionKey();
		props.fetchQuestions(props.difficulty,props.category, props.sessionKey);
		console.log(props);
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
	return {
		questions: state.questions,
		answers: state.answers,
		category: state.category,
		difficulty: state.difficulty,
		sessionKey: state.sessionKey
	};
};

export default connect(mapStateToProps, {
	fetchQuestions: fetchQuestions,
	getSessionKey: getSessionKey
})(Questions);
