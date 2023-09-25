import { Component } from '@angular/core';
import { GameService } from '../services/game/game.service';
import { PlayerService } from '../services/player/player.service';
import { Router } from '@angular/router';
import { Routes } from './routes.enum';
import { RouteService } from '../services/route.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  playerId!: number;

  constructor(private gameService: GameService, private playerService: PlayerService, private router: Router,
    private _routeService: RouteService
  ) {
    this._routeService.getRouteParams().subscribe((params: any) => {

      this.playerId = params.playerId;

      console.log(params);

    });
  }

  createGame() {
    // Aquí debes obtener el playerId de alguna manera,
    // ya sea desde una variable o como sea necesario en tu aplicación.
    // Luego, llama al servicio para crear una partida.
    this.gameService.createGame(this.playerService.getPlayer1Id()).subscribe(
      (response) => {
        this.gameService.setGameId(response.id); // Setteamos el id de la partida
        // Manejar la respuesta del backend (puede ser la partida creada)
        console.log('Partida creada:', response);
        // Redirigir a la vista de la partida creada, si es necesario
        this.router.navigate([`${Routes.BOARD}/${response.id}/${Routes.PLAYER_ID}/${response.player1Id}`]); // Le pasamos los id a la ruta
      },
      (error) => {
        // Manejar errores
        console.error('Error al crear la partida:', error);
      }
    );
  }

  showAvailableGames() {
    this.router.navigate([`${Routes.AVAILABLE_GAMES}/${Routes.PLAYER_ID}/${this.playerId}`]);
  }

}
