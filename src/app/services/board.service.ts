import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Board } from "../model/board";
import { Player } from "../model/player";
import { IdManager } from "../model/idManager";

@Injectable({
    providedIn: 'root',
})
export class BoardService {
    // apiUrl = 'http://localhost:8080';

    // constructor(private http: HttpClient) { }

    // async newMovement(idManager: IdManager) {
    //     const urlBackend = `${this.apiUrl}/game/movement`;
    //     return this.http.post<any>(urlBackend, idManager).toPromise();
    // }
}