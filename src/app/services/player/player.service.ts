import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PlayerInputDto } from '../../dto/PlayerInputDto';
import { PlayerOutputDto } from 'src/app/dto/PlayerOutputDto';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private baseUrl = 'http://localhost:8080/player';
  private newUrl!: string;

  constructor(private http: HttpClient) { }

  playerInputDto: PlayerInputDto = { playerName: '' };

  public idPlayer1!: number;

  setPlayer1Id(newPlayer1id: number): void {
    this.idPlayer1 = newPlayer1id;
  }

  getPlayer1Id(): number {
    return this.idPlayer1;
  }

  getPlayerById(id: number): Observable<PlayerOutputDto> {
    this.newUrl = `${this.baseUrl}/findById/${id}`;
    return this.http.get<any>(this.newUrl);
  }

  createPlayer(playerName: string): Observable<PlayerOutputDto> {
    console.log('Valor de playerName:', playerName);
    this.playerInputDto.playerName = playerName;
    return this.http.post<any>(this.baseUrl, this.playerInputDto);
  }
}