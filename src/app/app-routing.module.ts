import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ListsComponent } from './components/lists/lists.component';
import { LoginComponent } from './components/login/login.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'lists/:id', component: ListsComponent },
  { path: 'user-profile', component: UserProfileComponent },
  { path: '', component: LoginComponent },
  { path: '**', component: NotfoundComponent }
];

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes)
  ],
  declarations: []
})
export class AppRoutingModule { }
