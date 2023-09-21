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



  ngOnInit() {
    this.board.size = this.htmlBoard;
  }

}


