import { Player } from "./player";

export interface Board {
    id: number;

    player1Id: number;

    player2Id: number;

    size: number[][];

    winner: number;

    turn: number;
}