import Game from "./Game";

export default function Navbar(props) {
	return (
        <Game quizModel={props.quizModel} setUserAnswer={props.setUserAnswer} checkAnswers={props.checkAnswers} updateTitle={props.updateTitle} setCurrentQuiz={props.setCurrentQuiz} fetchData={props.fetchData} />
    );
}