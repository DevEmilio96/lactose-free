import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { CercaService } from '../../providers/service/CercaService';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

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
  upload: boolean = true;
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
    /*this.form = this._FB.group({
      Titolo: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.pattern('^[a-zA-Z0-9]+$')])],
    });*/
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

  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }

  searchProduct(evento): void {
   /* if (this.form.status == "INVALID") {
      this.markFormGroupTouched(this.form);
      console.log("Form Invalido:", this.form)
      return;
    }*/
    this.tempnome = new Array;
    this.tempintolleranza = new Array;
    this.tableCheck = false;
    this.cerca = evento.value;
    console.log(evento.value)
    this.controllaLunghezza = this.cerca.length;
    var str: String;

    for (let i = 0; i < this.locations.length; i++) {
      str = this.locations[i].nome;

      if (this.cerca.localeCompare(str.substring(0, this.controllaLunghezza)) == 0) {
        this.tempnome.push(this.locations[i].nome)
        
        if(this.locations[i].intolleranza == true){
          this.tempintolleranza.push("Si")
        }else {
          this.tempintolleranza.push("No")
        }

        this.elementiCercati = {
          nome: this.tempnome,
          intolleranza: this.tempintolleranza,
        }
        console.log(this.elementiCercati.nome + "coppie di valori cercati" + this.elementiCercati.intolleranza)
        if(this.cerca.length>0){
          this.tableCheck = true;
        }
     
        this.alertNuovaRecensione = true;
       
     
      }
    }
    if(this.elementiCercati != undefined ){
    for (let i = 0; i < this.elementiCercati.nome.length; i++) {
      this.lunghezzaElementiCercati[i] = i;
    }
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
