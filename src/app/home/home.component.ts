import { Component } from '@angular/core';
import { GameService } from '../services/game/game.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  onClearButton() {}

    constructor(private gameService: GameService) { }

    createGame(playerId: number) {
      // Aquí debes obtener el playerId de alguna manera,
      // ya sea desde una variable o como sea necesario en tu aplicación.
      // Luego, llama al servicio para crear una partida.
      this.gameService.createGame(playerId).subscribe(
        (response) => {
          // Manejar la respuesta del backend (puede ser la partida creada)
          console.log('Partida creada:', response);
          // Redirigir a la vista de la partida creada, si es necesario
        },
        (error) => {
          // Manejar errores
          console.error('Error al crear la partida:', error);
        }
      );
    }

}
