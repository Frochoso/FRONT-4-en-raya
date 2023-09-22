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

    this.isLoading = true;
    if (this.gameService.checkPlayerTurn(this.board.id, this.player1.id)) {
      this.idManager = { playerId: this.player1.id, gameId: this.board.id, column: colIndex, row: rowIndex };
      this.gameService.newMovement(this.idManager);

      this.gameService.getGameById(this.board.id).subscribe((gameData: Board) => {
        this.board = gameData;
        this.htmlBoard = this.board.size;
        this.isLoading = false;
      });
    } else {
      this.isLoading = false;
      this._messageService.add({

        key: 'templateToast',
  
        severity: 'error',
  
        summary: 'ERROR',
  
        detail: 'Not your turn'
  
      });
    }

  }

  ngAfterViewChecked(): void {

    this.cdRef.detectChanges();

  }

}


