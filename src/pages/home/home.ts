import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { RegistrationPageComponent } from '../registration/registration';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  tab1Root = LoginPage;
  tab2Root = RegistrationPageComponent;
  //tab3Root = Ricette;
  //tab4Root = Cerca;


  constructor(public navCtrl: NavController) {

  }

}
