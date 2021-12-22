import React, {useState, useEffect} from "react";
import Navbar from "./Navbar";
import Info from "./Info";

import { Routes, Route} from "react-router-dom";

import es from '../lang/es.json';
import en from '../lang/en.json';

//TIC TAC TOE imports and constants
import TicTacToe from './TicTacToe/TicTacToe'

//Quiz imports and constants
import Quiz from './Quiz/Quiz'
import {quizzes} from "../assets/mock-data";
class QuizModel {
	constructor() {
		this.initialState = {
			score: 0,
			finished: false,
			currentQuiz: 0,
			answeredQuizzes: [],
			quizzes: [...quizzes]
		}
		this.reset();
	}

	reset() {
		this.score = this.initialState.score;
		this.finished = this.initialState.finished;
		this.currentQuiz = this.initialState.currentQuiz;
		this.answeredQuizzes = [];
		for (let i in this.initialState.quizzes) {
			this.answeredQuizzes[i] = "";
		}
		this.quizzes = this.initialState.quizzes;
	}

	setQuizzes(quizzes) {
		this.quizzes = [...quizzes];
		this.initialState.quizzes = [...quizzes];
	}
}

const dictionaryList = { en, es };

export const LangContext = React.createContext({userLang: 'es', dictionary: es});

export default function App() {
	const [loading, setLoading] = useState(true);
	const [lang, setLang] = useState('en');

	//TIC TAC TOE
	const [turn, setTurn] = useState('X');
	const [moves, setMoves] = useState(0);
	const [values, setValues] = useState([
		['-', '-', '-'],
		['-', '-', '-'],
		['-', '-', '-']
		]);

	//QUIZ
	const [quizModel, setQuizModel] = useState(new QuizModel());

	const setUserAnswer = (answer) => {
		let nuevoQM = new QuizModel();
		nuevoQM.score = quizModel.score;
		nuevoQM.finished = quizModel.finished;
		nuevoQM.currentQuiz = quizModel.currentQuiz;
		nuevoQM.answeredQuizzes = [];
		for (let i in quizModel.answeredQuizzes) {
			nuevoQM.answeredQuizzes[i] = quizModel.answeredQuizzes[i] || "";
		}
		nuevoQM.answeredQuizzes[quizModel.currentQuiz] = answer;
		nuevoQM.quizzes = [...quizModel.quizzes];
		setQuizModel(nuevoQM);
	}

	const checkAnswers = (alertMessage) => {
		let nuevoQM = new QuizModel();
		let score = 0;
		for (let qi in quizModel.answeredQuizzes) {
			score += (quizModel.answeredQuizzes[qi].toLowerCase() === quizModel.quizzes[qi].answer.toLowerCase()) ? 1 : 0;
		}
		nuevoQM.score = score;
		nuevoQM.finished = true;
		nuevoQM.currentQuiz = quizModel.currentQuiz;
		nuevoQM.answeredQuizzes = [];
		for (let i = 0; i < quizModel.quizzes.length; i++) {
			nuevoQM.answeredQuizzes[i] = quizModel.answeredQuizzes[i] || "";
		}
		nuevoQM.quizzes = [...quizModel.quizzes];
		setQuizModel(nuevoQM);
		alert(alertMessage+score);
	}

	const setCurrentQuiz = (currentQuiz) => {
		let nuevoQM = new QuizModel();
		nuevoQM.score = quizModel.score;
		nuevoQM.finished = quizModel.finished;
		nuevoQM.currentQuiz = currentQuiz;
		nuevoQM.quizzes = [...quizModel.quizzes];
		nuevoQM.answeredQuizzes = [...quizModel.answeredQuizzes];
		setQuizModel(nuevoQM);
		return quizModel.answeredQuizzes[currentQuiz] || "";
	}

	/**
	 * Cambia el título de la página en función del juego en el que se esté, si se está jugando
	 * @param {string} currentGame el juego en el que se está, si se está en alguno
	 */
	const updateTitle = (pagetitle, currentGame, extra) => {
		// Update the document title using the browser API
		if (currentGame === "tictactoe") {
    		document.title = `${pagetitle} - ${extra}`;
		} else if (currentGame === "quiz") {
			document.title = `${pagetitle} - Quiz - ${extra}`;
		} else {
			document.title = `${pagetitle}`
		}
	}

	/**
	 * Reinicia la partida del tres en raya
	 */
	function resetClick(){
		setTurn('X');
		setMoves(0);
		setValues([
		  ['-', '-', '-'],
		  ['-', '-', '-'],
		  ['-', '-', '-']
		]);
	}

	function appClick(rowNumber, columnNumber) {
		let valuesCopy = JSON.parse(JSON.stringify(values));
		let newMovement = turn;
		valuesCopy[rowNumber][columnNumber] = newMovement;
		setTurn(turn === 'X' ? '0' : 'X');
		setValues(valuesCopy);
		setMoves(moves + 1);
	}

	const handleLanguageChange = (event) => {
		setLang(event.target.value);
	}

	async function fetchData() {
		setLoading(true);
		quizModel.reset();
		const url_base = "https://core.dit.upm.es/api";
		const token = "e176550118dd9de9e5f0";
		try {
			const res = await fetch(url_base+"/quizzes/random10wa?token="+token);
			const quiz_json = await res.json();
			quizModel.setQuizzes(quiz_json);
		} catch (e) {
			quizModel.setQuizzes(quizzes);
		}
		setLoading(false);
	}

	useEffect(() => {
		async function fetchAllData() {
			setLoading(true);
			try {
				const res = await fetch("http://myjson.dit.upm.es/api/bins/ccr5");
				const myjson = await res.json();
				setTurn(myjson.turn.includes('X') ? 'X' : '0');
				setMoves(myjson.moves);
				setValues(myjson.values);
				await fetchData();
			} catch (e) {}
		}

		fetchAllData();
		setLoading(false);
		// eslint-disable-next-line
	}, []);
	
	  	return (
					<div className="root">
						<LangContext.Provider value={{handleLanguageChange: handleLanguageChange, userLang: lang, dictionary: dictionaryList[lang]}}>
						<Navbar/>
						{loading ? <img src={process.env.PUBLIC_URL + "/spinner.gif"} className="spinner" alt="spinner" />: <Routes>
								<Route path="/"element={<Info updateTitle={updateTitle} />}/>
								<Route path="/tictactoe" element={<TicTacToe turn={turn} values={values} appClick={appClick} moves={moves} resetClick={resetClick} updateTitle={updateTitle} new/>}/>
								<Route path="/quiz" element={<Quiz quizModel={quizModel} updateTitle={updateTitle} setUserAnswer={setUserAnswer} checkAnswers={checkAnswers} setCurrentQuiz={setCurrentQuiz} fetchData={fetchData} new/>}/>
							</Routes>}
						</LangContext.Provider>
					</div>
	  );
	}


