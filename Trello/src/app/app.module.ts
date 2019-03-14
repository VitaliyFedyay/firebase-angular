import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }    from '@angular/forms';


import { NgDragDropModule } from 'ng-drag-drop';
import { MaterializeModule } from 'angular2-materialize';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ListsComponent } from './components/lists/lists.component';
import { AppRoutingModule } from './/app-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { BoardsService } from './boards.service';
import { CoreModule } from './core/core.module';
import { UserProfileComponent } from './components/user-profile/user-profile.component';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    DashboardComponent,
    ListsComponent,
    LoginComponent,
    RegisterComponent,
    NotfoundComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    MaterializeModule,
    FormsModule,
    AppRoutingModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase),
    AppRoutingModule,
    NgDragDropModule.forRoot(),
    CoreModule
  ],
  providers: [BoardsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
