import { NgModule } from '@angular/core';
import { RouterModule,Routes} from '@angular/router';
import { HomeComponent } from './screens/home/home/home.component';
import { AddPlayersComponent } from './screens/add-players/add-players/add-players.component';

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"add-players",component:AddPlayersComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
