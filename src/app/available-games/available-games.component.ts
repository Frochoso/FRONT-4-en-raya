import { Component } from '@angular/core';
import { GameService } from '../services/game/game.service';
import { PlayerService } from '../services/player/player.service';
import { GameOutputDto } from '../dto/GameOutputDto';
import { Routes } from '../home/routes.enum'
import { Router } from '@angular/router';
import { RouteService } from '../services/route.service';
import { PlayerOutputDto } from '../dto/PlayerOutputDto';

@Component({
  selector: 'app-available-games',
  templateUrl: './available-games.component.html',
  styleUrls: ['./available-games.component.css']
})
export class AvailableGamesComponent {

  games: GameOutputDto[] = [];
  players: PlayerOutputDto[] = [];
  player2Id!: number;


  constructor(
    private gameService: GameService,
    private playerService: PlayerService,
    private _routeService: RouteService,
    private router: Router
  ) {
    this._routeService.getRouteParams().subscribe((params: any) => {

      this.player2Id = params.player2Id;

      console.log(params);

    });
  }

  ngOnInit(): void {
    this.gameService.findAllGames().subscribe(
      (data) => {
        this.games = data;
        for (let i = 0; i < this.games.length; i++) {
          this.playerService.getPlayerById(this.games[i]?.player1Id).subscribe((nPlayer) => {
            this.players.push(nPlayer)
          })
        }

      },
      (error) => {
        console.error('Error al obtener las partidas disponibles:', error);
      }
    );
  }

  joinGame(gameId: number): void {
    this.gameService.addPlayer2(gameId, this.player2Id).subscribe((response) => {
      this.router.navigate([`${Routes.BOARD}/${response.id}/${Routes.PLAYER_ID}/${response.player1Id}`]);
    }, (error) => {

      console.error('Error al unirse a partida:', error);
    });

  }

}
