import React, { useState, useEffect, useContext } from "react";
import Navbar from "./Navbar";
import Info from "./Info";
import MovieInfo from "./MovieInfo";
import MovieForm from "./MovieForm";
import { myInitialMovies } from "../constants/constants";
import {postAPI, getAPI, updateAPI} from "../api";

import { Routes, Route} from "react-router-dom";
import {useNavigate} from "react-router-dom";

import es from '../lang/es.json';
import en from '../lang/en.json';

//TIC TAC TOE imports and constants
import TicTacToe from './TicTacToe'

//Quiz imports and costants
import Quiz from './Quiz'

const dictionaryList = { en, es };

export const LangContext = React.createContext({userLang: 'es', dictionary: es});

export default function App() {
	const [loading, setLoading] = useState(false);
	const [mymovies, setMymovies] = useState([]);
	const [nextid, setNextid] = useState(3);
	const [downloaded, setDownloaded] = useState(null);
	const [uploaded, setUploaded] = useState(null);
	const [lang, setLang] = useState('en');
	const mylang = useContext(LangContext);

	//TIC TAC TOE
	const [turn, setTurn] = useState('X');
	const [moves, setMoves] = useState(0);
	const [values, setValues] = useState([
		['-', '-', '-'],
		['-', '-', '-'],
		['-', '-', '-']
		]);

	const navigate = useNavigate();

	/**
	 * Cambia el título de la página en función del juego en el que se esté, si se está jugando
	 * @param {string} currentGame el juego en el que se está, si se está en alguno
	 */
	const updateTitle = (pagetitle, currentGame, turnof) => {
		// Update the document title using the browser API
		if (currentGame == "tictactoe") {
    		document.title = `${pagetitle} - ${turnof}`;
		} else if (currentGame == "quiz") {
			document.title = `${pagetitle} - Quiz`;
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

	const update = (updatedmovie) => {
		setMymovies(mymovies.map((movie, index) => updatedmovie.id === movie.id ? updatedmovie : movie));
		navigate('/');
	}

	const erase = (idtoerase) => {
		setMymovies(mymovies.filter((movie) => movie.id !== idtoerase));
		navigate('/');
	}	

	const create = (movie)  => {
		movie.id = nextid;
		setMymovies([...mymovies, movie]);
		setNextid(nextid + 1);
		navigate('/');
	}

	const download = async () => {
		let downloadedMovies = await getAPI();
		setMymovies(downloadedMovies);
		setDownloaded(new Date());
	}

	const upload = async () => {
		await updateAPI(mymovies);
		setUploaded( new Date());
	}

	const reset = () => {
		setMymovies(myInitialMovies);
		setDownloaded(null);
		setUploaded(null);
		navigate('/');
	}

	useEffect(() => {
		async function fetchData() {
		const res = await fetch("http://myjson.dit.upm.es/api/bins/ccr5");
		const myjson = await res.json();
		console.log(myjson);
		setTurn(myjson.turn.includes('X') ? 'X' : '0');
		setMoves(myjson.moves);
		setValues(myjson.values);
		}

		fetchData();
  }, []);
	
	  	return (
					<div className="root">
						<LangContext.Provider value={{handleLanguageChange: handleLanguageChange, userLang: lang, dictionary: dictionaryList[lang]}}>
						<Navbar/>
						{loading ? <img src={process.env.PUBLIC_URL + "/spinner.gif"} className="spinner" alt="spinner" />: <Routes>
								<Route path="/add" element={<MovieForm themovie={{}} create={create} new/>}/>
								<Route path="/edit/:movieId"element={<MovieForm themovies={mymovies} update={update}/>}/>
								<Route path="/show/:movieId" element={<MovieInfo themovies={mymovies} />}/>
								<Route path="/"element={<Info updateTitle={updateTitle} />}/>
								<Route path="/tictactoe" element={<TicTacToe turn={turn} values={values} appClick={appClick} moves={moves} resetClick={resetClick} updateTitle={updateTitle} new/>}/>
								<Route path="/quiz" element={<Quiz themovie={{}} create={create} updateTitle={updateTitle}  new/>}/>
							</Routes>}
						</LangContext.Provider>
					</div>
	  );
	}


