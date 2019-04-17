import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { RegistrationPageComponent } from '../registration/registration';
import { RecipesPageComponent } from '../recipes/recipes';
import { GalleriaPageComponent } from '../galleria/galleria';
import { CercaPageComponent } from '../cerca/cerca';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  tab1Root = LoginPage;
  tab3Root = RecipesPageComponent;
  tab2Root = GalleriaPageComponent;
  tab4Root = CercaPageComponent;


  constructor(public navCtrl: NavController) {

  }

}
