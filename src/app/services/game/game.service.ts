import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
import { Board } from "../../model/Game";
import { GameOutputDto } from "../../dto/GameOutputDto"
import { Player } from "../../model/player";
import { IdManager } from "../../model/idManager";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private baseUrl = 'http://localhost:8080/game';
  private newUrl!: string;

  public gameId!: number;
  constructor(private http: HttpClient) { }

  setGameId(newGameId: number): void {
    this.gameId=newGameId;
  }

  getGameId():number{
    return this.gameId;
  }

  createGame(playerId: number): Observable<GameOutputDto> {
    this.newUrl = `${this.baseUrl}/${playerId}`;
    return this.http.post<any>(this.newUrl, null);
  }

  getGameById(id: number): Observable<GameOutputDto> {
    this.newUrl = `${this.baseUrl}/getGame/${id}`;
    return this.http.get<any>(this.newUrl);
}

newMovement(idManager: IdManager): Observable<any> {
    this.newUrl = `${this.baseUrl}/movement`;
    return this.http.post<any>(this.newUrl, idManager);
}

checkPlayerTurn(gameId: number, playerId: number): Observable<any> {
    this.newUrl = `${this.baseUrl}/checkTurn/${gameId}/${playerId}`;
    return this.http.get<any>(this.newUrl);
}

addPlayer2(gameId: number, playerId: number): Observable<any> {
    this.newUrl = `${this.baseUrl}/${gameId}/addPlayer2/${playerId}`;
    return this.http.post<any>(this.newUrl, null);
}
}
