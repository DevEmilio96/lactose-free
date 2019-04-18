import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CercaService } from '../../providers/service/CercaService';

/**
 * Generated class for the CercaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cerca',
  templateUrl: 'cerca.html',
})
export class CercaPageComponent {
  locations: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private DBistance: CercaService ) {
  }

  ionViewDidEnter() {
    console.log('ionViewDidLoad RecipesPage');
    this.retrieveCollectionProducs();
  }

  retrieveCollectionProducs(): void {
    this.DBistance.getProducs("Producs")
       .then((data) => {

          this.locations = data;
       })
       .catch();
 }


}
