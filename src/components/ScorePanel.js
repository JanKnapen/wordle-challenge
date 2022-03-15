import { Button } from '@mui/material';
import React from 'react'
import Countdown from 'react-countdown'
import { GAME_DURATION, STATES } from '../App'
import { NONE_COLOR } from '../resources/colors';
import allowed_answers from '../resources/wordle-answers-alphabetical';
import './ScorePanel.css'

export default function ScorePanel({ game, setGame, setPopup, notificationsDispatch }) {
    function getFontStyle() {
        return {

        }
    }

    function addNotification(text, withDelay=true, delay=1000) {
        notificationsDispatch({ type: 'add', value: text});
        if (withDelay) {
            setTimeout(() => {
                notificationsDispatch({ type: 'remove' });
            }, delay);
        }
    }

    function renderer({ hours, minutes, seconds, completed }) {
        if (completed) {
            addNotification(game.answer.toUpperCase(), false);
            setPopup(true);
            setGame({
                ...game,
                state: STATES.ENDED,
            })
            return <div style={getFontStyle()} className='countdown'>Remaining time: 00:00</div>;
        } else {
            return <div style={getFontStyle()} className='countdown'>Remaining time: {(minutes < 10 ? '0' + minutes : minutes)}:{(seconds < 10 ? '0' + seconds : seconds)}</div>;
        }
    }

    function getCountdown() {
        if (game.state === STATES.GUESSING) {
            return <Countdown 
                date={game.deadlineTimer}
                renderer={renderer}
            />
        } else {
            return <div style={getFontStyle()} className='countdown'>Remaining time: 10:00</div>;
        }
    }

    function startGame() {
        if (game.state === STATES.NONE) {
            setGame({
                ...game,
                state: STATES.GUESSING,
                deadlineTimer: Date.now() + GAME_DURATION,
                answer: allowed_answers[Math.floor(Math.random() * allowed_answers.length)],
            })
        }
    }

    function stopGame() {
        if (game.state === STATES.GUESSING) {
            setGame({
                ...game,
                state: STATES.NONE,
                deadlineTimer: Date.now(),
                score: 0,
                guesses: [''],
                totalGuessesDone: 0,
            })
        }
    }

    return (
        <div className='score-panel'>
            <div className='information'>
                {getCountdown()}
                <div style={getFontStyle()}>Score: {game.score}</div>
            </div>
            <Button variant="contained" onClick={startGame} style={{backgroundColor: NONE_COLOR}} >START</Button>
            <Button variant="contained" onClick={stopGame} style={{backgroundColor: NONE_COLOR}} >STOP</Button>
        </div>
    )
}
