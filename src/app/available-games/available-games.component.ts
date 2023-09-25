import { Component } from '@angular/core';
import { GameService } from '../services/game/game.service';
import { PlayerService } from '../services/player/player.service';
import { GameOutputDto } from '../dto/GameOutputDto';
import { Player } from '../model/player';

@Component({
  selector: 'app-available-games',
  templateUrl: './available-games.component.html',
  styleUrls: ['./available-games.component.css']
})
export class AvailableGamesComponent {

  games: GameOutputDto[] = [];
  player: Player[]=[];


  constructor(
    private gameService: GameService,
    private playerService: PlayerService
  ) { }

  ngOnInit(): void {
    this.gameService.findAllGames().subscribe(
      (data) => {
        this.games = data;
       // for 
        //Bucle para asignar nombre al jugador:
        //this.playerService.getPlayerById()
      },
      (error) => {
        console.error('Error al obtener las partidas disponibles:', error);
      }
    );
  }

}
