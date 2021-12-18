import { useContext } from "react";
import { LangContext } from "./App";
import LangSelector from "./LangSelector";
import {Link} from "react-router-dom";

export default function Navbar(props) {
	const lang = useContext(LangContext);
	return <div className="header">
				<h1 style={{color: 'yellow'}}>{lang.dictionary["pagetitle"]}</h1>
				<LangSelector />
				<div className="tabs">
					<Link to="/"><button className="homeTab">{lang.dictionary["hometabbutton"]}</button></Link>
					<Link to="/tictactoe"><button className="tictactoeTab">{lang.dictionary["tictactoetabbutton"]}</button></Link>
					<Link to="/quiz"><button className="quizTab">{lang.dictionary["quiztabbutton"]}</button></Link>
				</div>
			</div>
}