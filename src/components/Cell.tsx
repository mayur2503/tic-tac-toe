import React, { Dispatch, SetStateAction, useRef, useState } from 'react'
import { GameState } from '../types';

interface iCellProps {
    value: number;
    setGameState: Dispatch<SetStateAction<GameState>>;
    gameState: GameState;
    activePlayer: boolean
}

const Cell: React.FC<iCellProps> = ({ value, setGameState, gameState }) => {
    const cellRef = useRef<HTMLDivElement>(null)
    const handleCellClick = () => {
        const isDisabled = cellRef.current?.classList.contains('disabled')
        if (!isDisabled) {
            cellRef.current?.classList.add('disabled')
            cellRef.current?.classList.add(gameState.xTurn ? 'x' : 'o')
            setGameState((prevState) => {
                return {
                    ...prevState,
                    xTurn: !prevState.xTurn
                }
            })
            if (gameState.xTurn) {
                setGameState((prevState) => {
                    return {
                        ...prevState,
                        xState: [...prevState.xState, value.toString()]
                    }
                })
            }
            else {
                setGameState((prevState) => {
                    return {
                        ...prevState,
                        oState: [...prevState.oState, value.toString()]
                    }
                })
            }
        }

    }
    return (
        <div ref={cellRef} onClick={() => handleCellClick()} className="grid-cell" ></div>
    )
}

export default Cell