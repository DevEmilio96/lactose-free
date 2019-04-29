import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ItemSliding } from 'ionic-angular';

/**
 * Generated class for the GalleriaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-galleria',
  templateUrl: 'galleria.html',
})
export class GalleriaPageComponent {
  title: string = "Galleria";
  upload: boolean = true;
  ceckupload: boolean = true;
  immagine:string;
  descrizione: string;
itemsettage1 : Array<any> = [
  "assets/imgs/Torta-ricotta-e-pere.jpg",
  "assets/imgs/ricotta.jpg",
  "assets/imgs/Torta-al-latte.jpg",
]
itemsettage2 : Array<any> = [
  "assets/imgs/formaggio.jpg",
  "assets/imgs/tiramisu.jpg",
  "assets/imgs/Torta-di-riso.jpg",
]
itemsettage3 : Array<any> = [
  "assets/imgs/zuppa-zucca-latte.jpg",
  "assets/imgs/cioccolata.jpg",
  "assets/imgs/pankake.jpg",
]

  items : Array<any> = [
   this.itemsettage1,
   this.itemsettage2,
   this.itemsettage3, 
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GalleriaPage');
  }

}
