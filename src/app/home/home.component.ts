import { Component } from '@angular/core';
import { GameService } from '../services/game/game.service';
import { PlayerService } from '../services/player/player.service';
import { Router } from '@angular/router';
import { Routes } from './routes.enum';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  onClearButton() {}

    constructor(private gameService: GameService, private playerService: PlayerService, private router: Router) { }

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

}
