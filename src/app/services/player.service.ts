import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PlayerInputDto } from '../dto/PlayerInputDto';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private baseUrl = 'http://localhost:8080/player';

  constructor(private http: HttpClient) { }

  playerInputDto: PlayerInputDto = { playerName: '' };


  createPlayer(playerName: string): Observable<any> {
    console.log('Valor de playerName:',playerName);
    this.playerInputDto.playerName = playerName;
    return this.http.post<PlayerInputDto>(this.baseUrl, this.playerInputDto);

  }
}