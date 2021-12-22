import React from 'react';
import {useContext} from "react";
import { LangContext } from "../App";

export default function QuizImage(props) {
    const lang = useContext(LangContext);
    if (props.img !== null && props.img.url !== null) {
        return(<img src={props.img.url} width={192} height={108} alt={lang.dictionary["altImgQuiz"]+props.question}></img>);
    } else {
        return(<></>);
    }
}