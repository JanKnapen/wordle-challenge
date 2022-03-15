import Input from "./components/Input";
import { useEffect, useReducer, useState } from 'react'
import './App.css'
import Output from "./components/Output";
import allowed_answers from './resources/wordle-answers-alphabetical'
import Notifications from "./components/Notifications";
import ScorePanel from "./components/ScorePanel";
import Popup from "./components/Popup";

export const GAME_DURATION = 600000;

export const STATES = {
  NONE: 'none',
  GUESSING: 'guessing',
  ENDED: 'ended',
}

function notificationsReducer(state, { type, value }) {
  switch (type) {
    case 'add':
      return [...state, value];
    case 'remove':
      return [...state.slice(1)];
    case 'reset':
      return [];
    default:
      return state;
  }
}

function App() {
  const [notifications, notificationsDispatch] = useReducer(notificationsReducer, []);
  const [game, setGame] = useState({
    guesses: [''],
    totalGuessesDone: 0,
    answer: '',
    state: STATES.NONE,
    score: 0,
    deadlineTimer: Date.now(),
    played: 0,
    curStreak: 0,
    maxStreak: 0,
    guess_distribution: {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
    },
  })
  const [popup, setPopup] = useState(false);

  useEffect(() => {
    setGame({
      ...game,
      answer: allowed_answers[Math.floor(Math.random() * allowed_answers.length)]
    });
  }, [])

  return (
    <div className="app">
      <div className="game">
        <div className="top-bar">World Challenge</div>
        <div className="left-top"></div>
        <ScorePanel game={game} setGame={setGame} setPopup={setPopup} notificationsDispatch={notificationsDispatch} />
        <div className="right-top"></div>
        <div className="left-middle"></div>
        <Output game={game} />
        <div className="right-middle"></div>
        <div className="left-bottom"></div>
        <Input game={game} setGame={setGame} notificationsDispatch={notificationsDispatch} />
        <div className="right-bottom"></div>
        <a className="link" href="https://www.nytimes.com/games/wordle/index.html">orginal wordle</a>
      </div>
      <Notifications notifications={notifications} />
      <Popup popup={popup} setPopup={setPopup} game={game} setGame={setGame} notificationsDispatch={notificationsDispatch} />
    </div>
  )
}

export default App;
