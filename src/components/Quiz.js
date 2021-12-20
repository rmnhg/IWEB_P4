import Game from "./Game";

export default function Navbar(props) {
	return (
        <Game quizModel={props.quizModel} setUserAnswer={props.setUserAnswer} checkAnswer={props.checkAnswer} updateTitle={props.updateTitle} />
    );
}