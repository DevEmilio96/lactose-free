import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { CercaService } from '../../providers/service/CercaService';
import { FormBuilder, Validators } from '@angular/forms';

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
  title: string = "Cerca";
  locations: any;
  form: any;
  cerca: String;
  temp: { titolo: any; };
  alertNuovaRecensione: boolean;
  controllaLunghezza: any;
  elementiCercati: { nome: Array<String>; intolleranza: Array<boolean> };
  tempnome = new Array;
  tempintolleranza = new Array;
  lunghezzaElementiCercati = new Array;
  tableCheck: boolean;
  
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private DBistance: CercaService,
    private _FB: FormBuilder,
    private alertCtrl: AlertController) {
    this.form = this._FB.group({
      'Titolo': ['', Validators.required],
    });
    this.alertNuovaRecensione = false;
    this.tableCheck = false;



  }

  ionViewDidEnter() {
    console.log('ionViewDidLoad RecipesPage');
    this.retrieveCollectionProducs();

  }

  retrieveCollectionProducs(): void {
    this.DBistance.getProducs("Products")
      .then((data) => {

        this.locations = data;
      })
      .catch();
  }

  searchProduct(): void {
    this.tempnome = new Array;
    this.tempintolleranza = new Array;
    this.tableCheck = false;
    this.cerca = this.form.controls["Titolo"].value;
    this.controllaLunghezza = this.cerca.length;
    console.log(this.cerca + "parola cercata ");
    console.log(this.controllaLunghezza + "  lunghezza elemento cercato")
    console.log(this.locations[0].nome + "  this.locations[0].nome ")
    var str: String;

    for (let i = 0; i < this.locations.length; i++) {
      str = this.locations[i].nome;

      if (this.cerca.localeCompare(str.substring(0, this.controllaLunghezza)) == 0) {
        this.tempnome.push(this.locations[i].nome)
        this.tempintolleranza.push(this.locations[i].intolleranza)
        this.elementiCercati = {
          nome: this.tempnome,
          intolleranza: this.tempintolleranza,
        }
        console.log(this.elementiCercati.nome + "coppie di valori cercati" + this.elementiCercati.intolleranza)
        this.tableCheck = true;
        this.alertNuovaRecensione = true;
      }
    }
    for (let i = 0; i < this.elementiCercati.nome.length; i++) {
      this.lunghezzaElementiCercati[i] = i;
    }

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
        title: 'Errore',
        subTitle: 'L ' + ' alimento non è disponibile nel catalogo',
        buttons: ['Ok']
      });
      alert.present();
    };
  }


}
