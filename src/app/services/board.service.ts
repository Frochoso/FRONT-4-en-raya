import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Board } from "../model/Game";
import { GameOutputDto } from "../dto/GameOutputDto"
import { Player } from "../model/player";
import { IdManager } from "../model/idManager";

@Injectable({
    providedIn: 'root',
})
export class BoardService {
    private baseUrl = 'http://localhost:8080/game';
    private newUrl!: string;

    constructor(private http: HttpClient) { }

    getGameById(idGame: number): Observable<any> {
        this.newUrl = `${this.baseUrl}/getGame/${idGame}`;
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