import { useContext } from "react";
import { LangContext } from "./App";

import Header from './Header.jsx';
import Board from './Board.jsx';
import Reset from './Reset.jsx';

export default function Navbar(props) {
	const lang = useContext(LangContext);
    let currentTurnStr = lang.dictionary["turnof"] + (props.turn === 'X' ? lang.dictionary["PLAYERX"] : lang.dictionary["PLAYER0"]);
    props.updateTitle(lang.dictionary["pagetitle"], "tictactoe", currentTurnStr);
	return <div>
        <Header turn={lang.dictionary["turn"]} text={currentTurnStr}/>
        <Board values={props.values} appClick={props.appClick} turnof={currentTurnStr} />
        <h3>{lang.dictionary["movements"]+props.moves}</h3>
        <Reset resetClick={props.resetClick}></Reset>
    </div>
}

