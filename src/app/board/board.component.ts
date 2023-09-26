import { ChangeDetectorRef, Component } from '@angular/core';
import { Board } from '../model/Board'
import { IdManager } from '../model/idManager'
import { Player } from '../model/player'
import { PlayerService } from '../services/player/player.service';
import { GameService } from '../services/game/game.service'
import { PlayerOutputDto } from '../dto/PlayerOutputDto';
import { Subject, takeUntil } from 'rxjs';
import { RouteService } from '../services/route.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {

  board: Board = {} as Board;
  htmlBoard: number[][] = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ];
  player1: Player = {} as Player;
  player2: Player = {} as Player;
  idManager!: IdManager;
  playerTurn = 1;
  private _unsubscribe$ = new Subject<boolean>();
  isLoading: boolean = false;
  playing: boolean = true;
  winner!: number;
  interval!: any;

  constructor(
    private playerService: PlayerService,
    private gameService: GameService,
    private _routeService: RouteService,
    public cdRef: ChangeDetectorRef,
    private _messageService: MessageService
  ) {

    this._routeService.getRouteParams().subscribe((params: any) => {

      this.player1.id = params.player1Id;
      this.board.id = params.id;

      this.interval = setInterval(() => {

        this.gameService.getGameById(this.board.id).subscribe((gameData: Board) => {
          this.board = gameData;
          this.htmlBoard = this.board.size;
          this.isLoading = false;
          this.player2.id = this.board.player2Id
          this.player1.id = this.board.player1Id
          this.winner = gameData.winner;
        });

        if (this.winner >= 0 && this.winner != null) {
          clearInterval(this.interval)
          this.checkWinner()
        }

      }, 1000);

      console.log(params);

    });

  }

  ngOnInit() {

    this.gameService.getGameById(this.board.id).subscribe((gameData: Board) => {
      this.board = gameData;
      console.log(gameData);
    });

    this.playerService.getPlayerById(this.player1.id).subscribe((playerData: PlayerOutputDto) => {
      this.player1 = playerData;
    });

    console.log(this.board);
  }

  onCellClick(rowIndex: number, colIndex: number): void {

    if (this.playing) {

      this.isLoading = true;

      if (this.gameService.checkPlayerTurn(this.board.id, this.player1.id)) {

        this.idManager = { playerId: this.player1.id, gameId: this.board.id, column: colIndex, row: rowIndex };

        if (this.player2.id == null) {
          this.showWaitingForSecondPlayerMessage();

        } else {

          this.gameService.newMovement(this.idManager).subscribe(
            (response) => {

              this.gameService.getGameById(this.board.id).subscribe((gameData: Board) => {
                this.board = gameData;
                this.htmlBoard = this.board.size;
                this.isLoading = false;

                this.playerService.getPlayerById(gameData.player2Id).subscribe((response) => {
                  this.player2 = response;
                })

              });

              this.checkWinner();
            })
        }
      } else {
        this.isLoading = false;
        this._messageService.add({

          key: 'templateToast',

          severity: 'error',

          summary: 'ERROR',

          detail: 'Not your turn'

        });
        console.log(this._messageService);
      }

    } else {

    }

  }

  checkWinner(): void {

    if (this.player1.id == this.board.winner) {
      this.showWinnerMessage(this.player1.id, this.player1.playerName);
      this.playing = false;
    }


    if (this.player2.id == this.board.winner) {
      this.showWinnerMessage(this.player2.id, this.player2.playerName);
      this.playing = false;
    }
    else if (this.board.winner == 0) {
      this.showDrawMessage();
      this.playing = false;
    } else if (this.board.winner == -1) {

    }

  }

  showWaitingForSecondPlayerMessage(): void {
    this._messageService.add({
      key: 'tc',
      severity: 'info',
      summary: 'Esperando al segundo jugador',
      detail: 'Es necesario que se una otro jugador para comenzar la partida.'
    });
  }

  showWinnerMessage(winnerId: number, winnerName: string): void {
    this._messageService.add({
      key: 'tc',
      severity: 'success',
      summary: '¡Victoria!',
      detail: 'El jugador ' + "(" + winnerId + ") " + winnerName + ", ha ganado."
    });
  }

  showDrawMessage(): void {
    this._messageService.add({
      key: 'tc',
      severity: 'info',
      summary: 'Empate',
      detail: 'El juego terminó en empate.'
    });
  }
}


