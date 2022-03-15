import { Button } from '@mui/material'
import BackspaceIcon from '@mui/icons-material/Backspace'
import React, { useEffect } from 'react'
import { CORRECT_COLOR, INCORRECT_COLOR, WRONG_PLACE_COLOR, NONE_COLOR } from '../resources/colors'
import allowed_answers from '../resources/wordle-answers-alphabetical'
import allowed_guesses from '../resources/wordle-allowed-guesses'
import './Input.css'
import { STATES } from '../App'

export default function Input({ game, setGame, notificationsDispatch }) {
    useEffect(() => {
        const keydownEventListener = (e) => {
            if (!e.repeat) {
                if (e.key.length === 1 && e.key.match(/[a-z]/i)) {
                    buttonClicked(e.key);
                } else if (e.key === 'Enter') {
                    enter();
                } else if (e.key === 'Backspace') {
                    backspace();
                }
            }
        }

        document.addEventListener('keydown', keydownEventListener)

        return () => {
            document.removeEventListener('keydown', keydownEventListener)
        }
    }, [])

    function addNotification(text, delay=1000) {
        notificationsDispatch({ type: 'add', value: text});
        setTimeout(() => {
            notificationsDispatch({ type: 'remove' });
        }, delay);
    }

    function buttonClicked(letter) {
        setGame((prevGame) => {
            if (prevGame.state === STATES.NONE) {
                addNotification('Start the timer');
                return prevGame;
            } else if (prevGame.state === STATES.GUESSING) {
                const curGuess = prevGame.guesses[prevGame.guesses.length - 1];
                if (curGuess.length < 5) {
                    return {
                        ...prevGame,
                        guesses: [
                            ...prevGame.guesses.slice(0, -1),
                            curGuess + letter
                        ]
                    }
                } else {
                    return prevGame;
                }
            } else {
                return prevGame;
            }
        })
    }

    function backspace() {
        setGame((prevGame) => {
            if (prevGame.state === STATES.NONE) {
                addNotification('Start the timer');
                return prevGame;
            } else if (prevGame.state === STATES.GUESSING) {
                const curGuess = prevGame.guesses[prevGame.guesses.length - 1];
                if (curGuess === '') return prevGame;
                if (curGuess.length > 0) {
                    return {
                        ...prevGame,
                        guesses: [
                            ...prevGame.guesses.slice(0, -1),
                            curGuess.substring(0, curGuess.length - 1)
                        ]
                    }
                }
            } else {
                return prevGame;
            }
        })
        
    }

    function enter() {
        setGame((prevGame) => {
            if (prevGame.state === STATES.NONE) {
                addNotification('Start the timer');
                return prevGame;
            } else if (prevGame.state === STATES.GUESSING) {
                const curGuess = prevGame.guesses[prevGame.guesses.length - 1];
                if (curGuess.length < 5) {
                    addNotification('Not enough letters');
                    return prevGame;
                } else if (!allowed_answers.includes(curGuess) && !allowed_guesses.includes(curGuess)) {
                    addNotification('Not in word list');
                    return prevGame;
                } else {
                    if (curGuess === prevGame.answer) {
                        addNotification('That was correct', 2000);
                        const newTotalGuessesDone = prevGame.totalGuessesDone + 1;
                        var newGuessDistribution = {
                            ...prevGame.guess_distribution,
                        };
                        newGuessDistribution[newTotalGuessesDone] = prevGame.guess_distribution[prevGame.totalGuessesDone + 1] + 1;
                        return {
                            ...prevGame,
                            score: prevGame.score + 1,
                            guesses: [''],
                            answer: allowed_answers[Math.floor(Math.random() * allowed_answers.length)],
                            totalGuessesDone: 0,
                            played: prevGame.played + 1,
                            curStreak: prevGame.curStreak + 1,
                            maxStreak: Math.max(prevGame.maxStreak, prevGame.curStreak + 1),
                            guess_distribution: newGuessDistribution,
                        }
                    } else if (prevGame.totalGuessesDone === 5) {
                        addNotification(prevGame.answer.toUpperCase(), 2000);
                        return {
                            ...prevGame,
                            guesses: [''],
                            answer: allowed_answers[Math.floor(Math.random() * allowed_answers.length)],
                            totalGuessesDone: 0,
                            played: prevGame.played + 1,
                            curStreak: 0,
                        }
                    } else {
                        return {
                            ...prevGame,
                            guesses: [
                                ...prevGame.guesses,
                                '',
                            ],
                            totalGuessesDone: prevGame.totalGuessesDone + 1,
                        }
                    }
                }
            } else {
                return prevGame;
            }
        })
    }

    function letterOnCorrectLocation(letter, guess) {
        for (var i=0; i<guess.length; i++) {
            if (guess[i] === letter && game.answer[i] === letter) return true;
        }
        return false;
    }

    function getLetterColor(letter) {
        return (!game.answer.includes(letter) ? (game.guesses.slice(0, game.totalGuessesDone).some((guess) => guess.includes(letter)) ? INCORRECT_COLOR : NONE_COLOR)
            : (game.guesses.slice(0, game.totalGuessesDone).some((guess) => letterOnCorrectLocation(letter, guess)) ? CORRECT_COLOR
                : (game.guesses.slice(0, game.totalGuessesDone).some((guess) => guess.includes(letter)) ? WRONG_PLACE_COLOR
                    : NONE_COLOR
                )
            )
        )
    }

    function getButtonStyle(buttonType) {
        return {
            minWidth: "0px",
            minHeight: "0px",
            backgroundColor: getLetterColor(buttonType),
            color: (getLetterColor(buttonType) === NONE_COLOR ? 'black' : 'white'),
        };
    }

    return (
        <div className='input'>
            <div className='input-grid'>
                <Button variant="contained" onClick={() => buttonClicked('q')} style={getButtonStyle('q')}>Q</Button>
                <Button variant="contained" onClick={() => buttonClicked('w')} style={getButtonStyle('w')}>W</Button>
                <Button variant="contained" onClick={() => buttonClicked('e')} style={getButtonStyle('e')}>E</Button>
                <Button variant="contained" onClick={() => buttonClicked('r')} style={getButtonStyle('r')}>R</Button>
                <Button variant="contained" onClick={() => buttonClicked('t')} style={getButtonStyle('t')}>T</Button>
                <Button variant="contained" onClick={() => buttonClicked('y')} style={getButtonStyle('y')}>Y</Button>
                <Button variant="contained" onClick={() => buttonClicked('u')} style={getButtonStyle('u')}>U</Button>
                <Button variant="contained" onClick={() => buttonClicked('i')} style={getButtonStyle('i')}>I</Button>
                <Button variant="contained" onClick={() => buttonClicked('o')} style={getButtonStyle('o')}>O</Button>
                <Button variant="contained" onClick={() => buttonClicked('p')} style={getButtonStyle('p')}>P</Button>
                <div></div>
                <Button variant="contained" onClick={() => buttonClicked('a')} style={getButtonStyle('a')}>A</Button>
                <Button variant="contained" onClick={() => buttonClicked('s')} style={getButtonStyle('s')}>S</Button>
                <Button variant="contained" onClick={() => buttonClicked('d')} style={getButtonStyle('d')}>D</Button>
                <Button variant="contained" onClick={() => buttonClicked('f')} style={getButtonStyle('f')}>F</Button>
                <Button variant="contained" onClick={() => buttonClicked('g')} style={getButtonStyle('g')}>G</Button>
                <Button variant="contained" onClick={() => buttonClicked('h')} style={getButtonStyle('h')}>H</Button>
                <Button variant="contained" onClick={() => buttonClicked('j')} style={getButtonStyle('j')}>J</Button>
                <Button variant="contained" onClick={() => buttonClicked('k')} style={getButtonStyle('k')}>K</Button>
                <Button variant="contained" onClick={() => buttonClicked('l')} style={getButtonStyle('l')}>L</Button>
                <Button variant="contained" onClick={enter} style={getButtonStyle('enter')} className='span-three'>ENTER</Button>
                <Button variant="contained" onClick={() => buttonClicked('z')} style={getButtonStyle('z')}>Z</Button>
                <Button variant="contained" onClick={() => buttonClicked('x')} style={getButtonStyle('x')}>X</Button>
                <Button variant="contained" onClick={() => buttonClicked('c')} style={getButtonStyle('c')}>C</Button>
                <Button variant="contained" onClick={() => buttonClicked('v')} style={getButtonStyle('v')}>V</Button>
                <Button variant="contained" onClick={() => buttonClicked('b')} style={getButtonStyle('b')}>B</Button>
                <Button variant="contained" onClick={() => buttonClicked('n')} style={getButtonStyle('n')}>N</Button>
                <Button variant="contained" onClick={() => buttonClicked('m')} style={getButtonStyle('m')}>M</Button>
                <Button variant="contained" onClick={backspace} className='span-three' style={getButtonStyle('backspace')}><BackspaceIcon/></Button>
            </div>
        </div>
    )
}
