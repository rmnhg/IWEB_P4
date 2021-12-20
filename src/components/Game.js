import {useContext, useState} from "react";
import { LangContext } from "./App";

export default function Game(props) {
    const [currentQuiz, setCurrentQuiz] = useState(0);
    const [input, setInput] = useState();
    const lang = useContext(LangContext);
    props.updateTitle(lang.dictionary["pagetitle"], "quiz", props.quizModel.quizzes[currentQuiz].question);

    const questionImg = (img) => {
        if (img !== null && img.url !== null) {
            return(<img src={img.url} width={192} height={108} alt={lang.dictionary["altImgQuiz"]+props.quizModel.quizzes[currentQuiz].question}></img>);
        } else {
            return(<></>);
        }
    }

    const author = (author) => {
        let authorStr = (author !== null && author.username !== null) ? author.username : (author !== null && author.profileName !== null) ? author.profileName : lang.dictionary["anonymous"];
        return(
              <div class="flexbox-container-row" style={{alignContent: "right"}}>
                  <div  style={{marginTop: "20px"}}>
                    <p>{authorStr}</p>
                  </div>
                  <div style={{padding: "20px"}}>
                    {(author !== null && author.photo !== null && author.photo.url !== null) ? <img src={author.photo.url} width={50} height={50} style={{borderRadius: 50/2}} alt={lang.dictionary["altImgAuthor"]+authorStr}></img> : <></>}
                  </div>
              </div>
        );
    }

    const questionButtons = (quizzes) => {
        return(<div class="flexbox-container-column">
            {quizzes.map((_quiz, index) => (index === currentQuiz) ? <div class="flexbox-container-row" key={index}><button onClick={() => clearInput() & setCurrentQuiz(index)} disabled>{index+1}</button></div> : <div class="flexbox-container-row" key={index}><button onClick={() => clearInput() & setCurrentQuiz(index)}>{index+1}</button></div>)}
        </div>);
    }

    const clearInput = () => {
        input.value = "";
    }

    const cheat = () => {
        input.value = props.quizModel.quizzes[currentQuiz].answer;
        props.setUserAnswer(props.quizModel.quizzes[currentQuiz].answer);
    }

    return (
        <div class="flexbox-container-row">
            {questionButtons(props.quizModel.quizzes)}
            <div class="flexbox-container-column">
                <div class="flexbox-container-row">
                    <p>{props.quizModel.quizzes[currentQuiz].question}</p>
                </div>
                <div class="flexbox-container-row">
                    {questionImg(props.quizModel.quizzes[currentQuiz].attachment)}
                </div>
                <div class="flexbox-container-row">
                    <input onKeyPress={(e) => (e.key === "Enter") ? props.checkAnswer(currentQuiz) : (e.key === "Enter")} onChange={(evento) => props.setUserAnswer(evento.target.value)} ref={el => setInput(el)}></input>
                </div>
                <div class="flexbox-container-row">
                    <button onClick={() => props.checkAnswer(currentQuiz)}>{lang.dictionary["checkAnswer"]}</button>
                    <button onClick={() => (currentQuiz - 1 < 0) ? false : (setCurrentQuiz(currentQuiz-1) & clearInput())}>{lang.dictionary["previous"]}</button>
                    <button onClick={() => (currentQuiz + 1 < props.quizModel.quizzes.length) ? (setCurrentQuiz(currentQuiz+1) & clearInput()) : false}>{lang.dictionary["next"]}</button>
                    <button onClick={() => cheat()}>🤑</button>
                </div>
                {author(props.quizModel.quizzes[currentQuiz].author)}
                <div class="flexbox-container-row">
                    <p><b>{lang.dictionary["score"]}</b>{props.quizModel.score}</p>
                </div>
            </div>
        </div>
    );
}