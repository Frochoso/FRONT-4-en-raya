import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Board } from '../model/board'
import { IdManager } from '../model/idManager'
import { Player } from '../model/player'

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {

  onColumnClick(column: HTMLElement) { }

  board!: Board;
  htmlBoard: number[][] = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ];
  player1!: Player;
  player2!: Player;
  idManager!: IdManager;
  playerTurn = 1;

  onCellClick(rowIndex: number, colIndex: number): void {
    console.log(`Clic en la celda en la fila ${rowIndex} y columna ${colIndex}`);

    if (this.playerTurn == 1 && (this.htmlBoard[rowIndex][colIndex] != 1 && this.htmlBoard[rowIndex][colIndex] != 2)) {
      this.htmlBoard[rowIndex][colIndex] = 1;
      this.playerTurn = 2;
    } else if (this.playerTurn == 2 && (this.htmlBoard[rowIndex][colIndex] != 1 && this.htmlBoard[rowIndex][colIndex] != 2)) {
      this.htmlBoard[rowIndex][colIndex] = 2;
      this.playerTurn = 1;
    }
  }

  ngOnInit() {
    this.board.size = this.htmlBoard;

  }

}


