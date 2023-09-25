import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

import { AvailableGamesComponent } from './available-games/available-games.component';
import { BoardComponent } from './board/board.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home/:playerId',
    component: HomeComponent
  },
  {
    path: 'availableGames/playerId/:playerId',
    component: AvailableGamesComponent
  },
  {
    path: 'board/:id/playerId/:player1Id',
    component: BoardComponent
  },
  {
    path: '**',
    redirectTo: 'login'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
