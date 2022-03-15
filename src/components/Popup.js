import { Box, Button } from '@mui/material'
import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import './Popup.css'
import { STATES } from '../App';
import { INCORRECT_COLOR } from '../resources/colors';

export default function Popup({ popup, setPopup, game, setGame, notificationsDispatch }) {
    function getMaxGuessDistribution() {
        const distributions = [game.guess_distribution[1], game.guess_distribution[2], game.guess_distribution[3], game.guess_distribution[4], game.guess_distribution[5], game.guess_distribution[6]];
        return Math.max.apply(Math, distributions);
    }

    function getGuessDistributionForDigit(digit) {
        return <div>
            <div style={{
                width: '15%',
                marginTop: '1%',
                fontWeight: 'normal',
                textAlign: 'right',
                paddingRight: '1%',
            }}>{digit}</div>
            <Box sx={{
                width: (game.guess_distribution[digit] > 0 ? game.guess_distribution[digit] / getMaxGuessDistribution() * 70 : 3) + '%',
                color: 'white',
                backgroundColor: INCORRECT_COLOR,
                marginTop: '1%',
                textAlign: 'left',
                paddingLeft: '1%',
            }}>{game.guess_distribution[digit]}</Box>
        </div>
    }

    function getGuessDistribution() {
        return [1, 2, 3, 4, 5, 6].map((digit) => getGuessDistributionForDigit(digit));
    }

    return (popup) ? (
        <div className='popup'>
            <Box sx={{boxShadow: 10}} className='frame' >
                <Button onClick={(e) => {
                    setPopup(false)
                    notificationsDispatch({ type: 'reset' })
                    setGame({
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
                    });
                }} ><CloseIcon/></Button>
                <div>STATISTICS</div>
                <div className='game-info' >
                    <div>{game.played}</div>
                    <div>{Math.floor(game.score / game.played * 100)}</div>
                    <div>{game.maxStreak}</div>
                </div>
                <div className='game-info-description' >
                    <div>Played</div>
                    <div>Win %</div>
                    <div>Max Streak</div>
                </div>
                <div>GUESS DISTRIBUTION</div>
                <div className='guess-distribution'>
                    {getGuessDistribution()}
                </div>
            </Box>
        </div>
    ) : ''
}
