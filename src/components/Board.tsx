import React, { useEffect, useRef, useState, RefObject, Fragment } from 'react'
import { GameState } from '../types';
import Cell from './Cell';



const Board = () => {
    const boardRef = useRef<HTMLDivElement>(null)
    const gameOverRef = useRef<HTMLDivElement>(null)
    const [gameOverText, setGameOverText] = useState("")
    const [gameState, setGameState] = useState<GameState>({
        xTurn: true,
        xState: [],
        oState: [],
        winningStates: [
            // Rows
            ['0', '1', '2'],
            ['3', '4', '5'],
            ['6', '7', '8'],

            // Columns
            ['0', '3', '6'],
            ['1', '4', '7'],
            ['2', '5', '8'],

            // Diagonal
            ['0', '4', '8'],
            ['2', '4', '6']
        ]
    })

    const handleReset = () => {
        setGameState((prevState) => {
            return {
                ...prevState,
                xTurn: true,
                xState: [],
                oState: [],
            }
        })
        gameOverRef.current?.classList.remove('visible');
        boardRef.current?.querySelectorAll('.grid-cell').forEach(cell => {
            cell.classList.remove('disabled', 'x', 'o')
        })
    }
 
    const checkForWin = () => {
        gameState.winningStates.forEach(winningState => {
            const xWins = winningState.every(state => gameState.xState.includes(state))
            const oWins = winningState.every(state => gameState.oState.includes(state))
            if (xWins || oWins) {
                boardRef.current?.querySelectorAll('.grid-cell').forEach(cell => cell.classList.add('disabled'))
                gameOverRef.current?.classList.add('visible')
                setGameOverText(xWins ? 'X wins!' : 'O wins!')
            }
        })
    }

    useEffect(() => {
        if (!boardRef.current?.querySelectorAll('.grid-cell:not(.disabled)').length) {
            console.log(gameOverRef.current)
            gameOverRef.current?.classList.add('visible');
            setGameOverText("Draw !")
        }
        checkForWin()
    }, [gameState])
    return (
        <Fragment>
            <div id="game" ref={boardRef}>
                {
                    Array.from(Array(9).keys()).map((item) => {
                        return (
                            <Cell key={item} value={item} activePlayer={gameState.xTurn} setGameState={setGameState} gameState={gameState} />
                        )
                    })
                }
            </div>
            <div ref={gameOverRef} className="game-over">
                <span className="game-over-text">{gameOverText}</span>
                <button onClick={() => handleReset()} className="restart">Restart</button>
            </div>
        </Fragment>
    )
}

export default Board