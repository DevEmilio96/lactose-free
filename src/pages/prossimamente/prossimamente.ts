import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { NewsPageComponent } from '../news/news';
import { HomePage } from '../home/home';

/**
 * Generated class for the ProssimamentePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-prossimamente',
  templateUrl: 'prossimamente.html',
})
export class ProssimamentePageComponent {
  alertNuovaRecensione: boolean;
  upload: boolean = true;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController) {
      
      this.alertNuovaRecensione=false;
      this.presentAlert();
      this.navCtrl.setRoot(HomePage, null , {
        duration: 5000,
    });
   
  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProssimamentePage');
  }
  presentAlert() {
    if (this.alertNuovaRecensione == true) {
      let alert = this.alertCtrl.create({
        title: 'Successo',
        subTitle: 'Alimento disponibile',
        buttons: ['Ok'],
      });
      alert.present();
      this.alertNuovaRecensione = false;
    } else {
      let alert = this.alertCtrl.create({
        title: 'Work In Progress',
        subTitle: 'Questa funzionalità verrà implementata prossimamente',
        buttons: ['Ok']
      });
      alert.present();
    };
  }

}
