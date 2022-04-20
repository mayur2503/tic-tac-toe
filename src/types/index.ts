export interface iCellProps {
    value: number
}

export interface GameState {
    xTurn:boolean;
    xState:string[];
    oState:string[];
    winningStates:string[][]
}