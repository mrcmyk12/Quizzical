import react from 'React'
import {connect} from 'react-redux'

const RenderAnswers = (props) => {



   return(
      <div></div>
   )
}

const mapStateToProps = (state) => {
   return { questions: state.questions}
}

export default connect(mapStateToProps)(RenderAnswers)