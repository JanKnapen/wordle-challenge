import { Box } from '@mui/material'
import React from 'react'
import { CORRECT_COLOR, INCORRECT_COLOR, WRONG_PLACE_COLOR, NONE_COLOR } from '../resources/colors'
import './Output.css'

export default function Output({ game }) {
  function getBoxColor(row, column) {
    return (game.totalGuessesDone > row ? (
      game.guesses[row].charAt(column) === game.answer.charAt(column) ? CORRECT_COLOR : (
        game.answer.includes(game.guesses[row].charAt(column)) ? WRONG_PLACE_COLOR
      : INCORRECT_COLOR)
    ) : 'none');
  }

  function letterInBox(row, column) {
    return game.guesses.length > row && game.guesses[row].length > column;
  }

  function getBoxStyle(row, column) {
    let color = getBoxColor(row, column);
    return {
      border: '1px solid ' + (color === 'none' ? (letterInBox(row, column) ? INCORRECT_COLOR : NONE_COLOR) : color),
      backgroundColor: color,
      fontSize: "2vh",
      color: (color === 'none' ? 'black' : 'white'),
    }
  }

  function getLetter(row, column) {
    if (game.guesses.length > row) {
      return game.guesses[row].charAt(column).toUpperCase();
    }
  }

  return (
    <div className='output'>
      <div className='output-grid'>
        <Box sx={getBoxStyle(0,0)}>{getLetter(0, 0)}</Box>
        <Box sx={getBoxStyle(0,1)}>{getLetter(0, 1)}</Box>
        <Box sx={getBoxStyle(0,2)}>{getLetter(0, 2)}</Box>
        <Box sx={getBoxStyle(0,3)}>{getLetter(0, 3)}</Box>
        <Box sx={getBoxStyle(0,4)}>{getLetter(0, 4)}</Box>

        <Box sx={getBoxStyle(1,0)}>{getLetter(1, 0)}</Box>
        <Box sx={getBoxStyle(1,1)}>{getLetter(1, 1)}</Box>
        <Box sx={getBoxStyle(1,2)}>{getLetter(1, 2)}</Box>
        <Box sx={getBoxStyle(1,3)}>{getLetter(1, 3)}</Box>
        <Box sx={getBoxStyle(1,4)}>{getLetter(1, 4)}</Box>
        
        <Box sx={getBoxStyle(2,0)}>{getLetter(2, 0)}</Box>
        <Box sx={getBoxStyle(2,1)}>{getLetter(2, 1)}</Box>
        <Box sx={getBoxStyle(2,2)}>{getLetter(2, 2)}</Box>
        <Box sx={getBoxStyle(2,3)}>{getLetter(2, 3)}</Box>
        <Box sx={getBoxStyle(2,4)}>{getLetter(2, 4)}</Box>
        
        <Box sx={getBoxStyle(3,0)}>{getLetter(3, 0)}</Box>
        <Box sx={getBoxStyle(3,1)}>{getLetter(3, 1)}</Box>
        <Box sx={getBoxStyle(3,2)}>{getLetter(3, 2)}</Box>
        <Box sx={getBoxStyle(3,3)}>{getLetter(3, 3)}</Box>
        <Box sx={getBoxStyle(3,4)}>{getLetter(3, 4)}</Box>
        
        <Box sx={getBoxStyle(4,0)}>{getLetter(4, 0)}</Box>
        <Box sx={getBoxStyle(4,1)}>{getLetter(4, 1)}</Box>
        <Box sx={getBoxStyle(4,2)}>{getLetter(4, 2)}</Box>
        <Box sx={getBoxStyle(4,3)}>{getLetter(4, 3)}</Box>
        <Box sx={getBoxStyle(4,4)}>{getLetter(4, 4)}</Box>
        
        <Box sx={getBoxStyle(5,0)}>{getLetter(5, 0)}</Box>
        <Box sx={getBoxStyle(5,1)}>{getLetter(5, 1)}</Box>
        <Box sx={getBoxStyle(5,2)}>{getLetter(5, 2)}</Box>
        <Box sx={getBoxStyle(5,3)}>{getLetter(5, 3)}</Box>
        <Box sx={getBoxStyle(5,4)}>{getLetter(5, 4)}</Box>
      </div>
    </div>
  )
}
