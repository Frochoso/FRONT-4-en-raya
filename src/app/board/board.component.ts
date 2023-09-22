import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameOutputDto } from '../dto/GameOutputDto';
import { Board } from '../model/Game'
import { IdManager } from '../model/idManager'
import { Player } from '../model/player'
import { PlayerService } from '../services/player/player.service';
import { GameService } from '../services/game/game.service'
import { PlayerOutputDto } from '../dto/PlayerOutputDto';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {

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

  constructor(
    private playerService: PlayerService,
    private gameService: GameService
  ) {

  }

  ngOnInit() {

    this.gameService.getGameById(this.gameService.getGameId()).subscribe((gameData: GameOutputDto) => {
      this.board = gameData;

      this.playerService.getPlayerById(this.playerService.getPlayer1Id()).subscribe((playerData: PlayerOutputDto) => {
        this.player1 = playerData;
      })
    });
  }

  onCellClick(rowIndex: number, colIndex: number): void {

    if (this.gameService.checkPlayerTurn(this.board.id, this.player1.id)) {
      this.idManager = { playerId: this.player1.id, gameId: this.board.id, column: colIndex, row: rowIndex };
      this.gameService.newMovement(this.idManager);

      this.gameService.getGameById(this.board.id).subscribe((gameData: GameOutputDto) => {
        this.board = gameData;
      });
    } else {
      this.idManager = { playerId: this.player2.id, gameId: this.board.id, column: colIndex, row: rowIndex };
      this.gameService.newMovement(this.idManager);

      this.gameService.getGameById(this.board.id).subscribe((gameData: GameOutputDto) => {
        this.board = gameData;
      });
    }

  }

}


