import { Component } from '@angular/core';
import { GameService } from '../services/game/game.service';
import { GameOutputDto } from '../dto/GameOutputDto';

@Component({
  selector: 'app-available-games',
  templateUrl: './available-games.component.html',
  styleUrls: ['./available-games.component.css']
})
export class AvailableGamesComponent {

  games: any[] = [];

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.gameService.findAllGames().subscribe(
      (data) => {
        this.games = data;
      },
      (error) => {
        console.error('Error al obtener las partidas disponibles:', error);
      }
    );
  }

}
