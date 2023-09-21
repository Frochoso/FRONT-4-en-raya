import { Component, OnDestroy } from '@angular/core';
import { PlayerService } from '../services/player/player.service';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy {

  playerName: string = '';

  private unsubscribe$ = new Subject<void>(); // Usamos un subject para realizar una desuscripción adecuada

  constructor(private playerService: PlayerService, private router: Router) { }

  onSubmit() {
    if (this.playerName.trim() !== '') {
      // Llamar al servicio para crear un jugador
      this.playerService
        .createPlayer(this.playerName)
        .pipe(takeUntil(this.unsubscribe$)) // Realizamos la suscripción temporal
        .subscribe(
          (response) => {
            // Manejar la respuesta del backend (puede ser un jugador creado)
            console.log('Jugador creado:', response);
            console.log(this.playerName); // Mover esta línea aquí

            this.router.navigate(['/home']); // Se registra el jugador y pasa a la siguiente vista
          },
          (error) => {
            // Manejar errores, como si el nombre de usuario ya existe
            console.error('Error al crear el jugador:', error);
          }
        );
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
