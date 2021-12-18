import { useContext } from "react";
import { LangContext } from "./App";

import Header from './Header.jsx';
import Board from './Board.jsx';
import Reset from './Reset.jsx';

export default function Navbar(props) {
	const lang = useContext(LangContext);
    let currentTurnStr = lang.dictionary["turnof"] + (props.turn === 'X' ? lang.dictionary["PLAYERX"] : lang.dictionary["PLAYER0"]);
    props.updateTitle(lang.dictionary["pagetitle"], "quiz", null);
	return <div>
        <p>¡Hola! Soy el Quiz. Me tienes que programar todavía 💻.</p>
    </div>
}