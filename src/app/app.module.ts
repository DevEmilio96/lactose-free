import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyAppComponent } from './app.component';
import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Firebase } from '@ionic-native/firebase';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestoreModule } from "angularfire2/firestore";
import { AngularFireStorageModule, AngularFireStorage } from "angularfire2/storage";
import { HttpClientModule } from '@angular/common/http';

import { HeaderEsComponent } from '../components/header-es/header-es';
import { FooterEsComponent } from '../components/footer-es/footer-es'
import { LoginPage } from '../pages/login/login';
import { RegistrationPageComponent } from '../pages/registration/registration';
import { AccountService } from '../providers/service/accountService';
import { GalleriaPageComponent } from '../pages/galleria/galleria';
import { ENV } from '../config/env';
import { RecipesPageComponent } from '../pages/recipes/recipes';
import { RecipesProvider } from '../providers/service/recipesService';
import { CercaPageComponent } from '../pages/cerca/cerca'
import { GoRecipesPageComponent } from '../pages/go-recipes/go-recipes';
import { CercaService } from '../providers/service/CercaService'

@NgModule({
  declarations: [
    MyAppComponent,
    HomePage,
    LoginPage,
    RegistrationPageComponent,
    GalleriaPageComponent,
    HeaderEsComponent,
    FooterEsComponent,
    RecipesPageComponent,
    CercaPageComponent,
    GoRecipesPageComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(ENV.firebase),
    IonicModule.forRoot(MyAppComponent),
    AngularFireStorageModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyAppComponent,
    HomePage,
    LoginPage,
    RegistrationPageComponent,
    GalleriaPageComponent,
    RecipesPageComponent,
    CercaPageComponent,
    GoRecipesPageComponent,
  ],
  providers: [
    AngularFireAuth,
    AccountService,
    AngularFireStorage,
    StatusBar,
    SplashScreen,
    Firebase,
    RecipesProvider,
    CercaService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
