import React from 'react';

export default function QuizzesColumn(props) {
    return(<div className="flexbox-container-column">
        {props.quizzes.map((_quiz, index) => (index === props.currentQuiz) ? <div className="flexbox-container-row" key={index}><button disabled>{index+1}</button></div> : <div className="flexbox-container-row" key={index}><button onClick={() => props.setUserInput(props.setCurrentQuiz(index))}>{index+1}</button></div>)}
    </div>);
}