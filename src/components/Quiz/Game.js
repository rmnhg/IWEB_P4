import {useContext, useState} from "react";
import { LangContext } from "../App";
import QuizzesColumn from "./QuizzesColumn";
import QuizImage from "./QuizImage";
import Author from "./Author";

export default function Game(props) {
    const [input, setInput] = useState();
    const lang = useContext(LangContext);
    const quizzes = props.quizModel.quizzes;
    const currentQuiz = props.quizModel.currentQuiz;
    props.updateTitle(lang.dictionary["pagetitle"], "quiz", props.quizModel.quizzes[props.quizModel.currentQuiz].question);

    const setUserInput = (value) => {
        input.value = value;
    }

    if (input !== undefined) {
        setUserInput(props.quizModel.answeredQuizzes[props.quizModel.currentQuiz]);
    }

    const cheat = () => {
        input.value = quizzes[currentQuiz].answer;
        props.setUserAnswer(quizzes[currentQuiz].answer);
    }

    return (
        <div className="flexbox-container-row">
                <QuizzesColumn currentQuiz={currentQuiz} quizzes={quizzes} setUserInput={setUserInput} setCurrentQuiz={props.setCurrentQuiz}/>
            <div className="flexbox-container-column">
                <div className="flexbox-container-row">
                    <p>{quizzes[currentQuiz].question}</p>
                </div>
                <div className="flexbox-container-row">
                    <QuizImage img={quizzes[currentQuiz].attachment} question={quizzes[currentQuiz].question}/>
                </div>
                <div className="flexbox-container-row">
                    {props.quizModel.finished ? <input disabled ref={el => setInput(el)}></input> : <input onKeyPress={(e) => (e.key === "Enter" && currentQuiz < quizzes.length-1) ? props.setCurrentQuiz(currentQuiz+1) : (e.key === "Enter") ? props.checkAnswers(lang.dictionary["finishAlert"]) : (e.key === "Enter")} onChange={(evento) => props.setUserAnswer(evento.target.value)} ref={el => setInput(el)}></input>}
                </div>
                <div className="flexbox-container-row">
                    {props.quizModel.finished ? <button onClick={() => props.fetchData()}>{lang.dictionary["restart"]}</button> : <button onClick={() => props.checkAnswers(lang.dictionary["finishAlert"])}>{lang.dictionary["checkAnswers"]}</button>}
                    <button onClick={() => (currentQuiz - 1 < 0) ? false : setUserInput(props.setCurrentQuiz(currentQuiz-1))}>{lang.dictionary["previous"]}</button>
                    <button onClick={() => (currentQuiz + 1 < props.quizModel.quizzes.length) ? setUserInput(props.setCurrentQuiz(currentQuiz+1)) : false}>{lang.dictionary["next"]}</button>
                    {props.quizModel.finished ? <button disabled >🤑</button> : <button onClick={() => cheat()}>🤑</button>}
                </div>
                <Author author={quizzes[currentQuiz].author}/>
                <div className="flexbox-container-row">
                    <p><b>{lang.dictionary["score"]}</b>{props.quizModel.score}</p>
                </div>
            </div>
        </div>
    );
}