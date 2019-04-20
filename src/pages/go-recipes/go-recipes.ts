import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RecipesProvider } from '../../providers/service/recipesService';

/**
 * Generated class for the GoRecipesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-go-recipes',
  templateUrl: 'go-recipes.html',
})
export class GoRecipesPageComponent {
  title: string = "Ricette";
  locationId: string;
  locations: any;
  locationSelect: any;
  recipeName: string;
  Ingredienti: any;
  descrizione: any;
  difficolta: any;
  dosi: any;
  preparazione: any;
  urlImmagine: any;
  recipeTime: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private DBistance: RecipesProvider) {
    this.locationId = localStorage.getItem("locationId");
    console.log(this.locationId);
    localStorage.removeItem("locationId");
  }

  ionViewDidEnter() {
    console.log('ionViewDidLoad RecipesPage');
    this.retrieveCollectionRecipes();
  }

  retrieveCollectionRecipes(): void {
    this.DBistance.getRecipes("Recipes")
      .then((data) => {

        this.locations = data;
        for (let i = 0; i < this.locations.length; i++) {
          
          if (this.locationId.localeCompare(this.locations[i].id) == 0) {
            this.locationSelect = this.locations[i];
            console.log(this.locationSelect.recipeName + " Nome") ;
            console.log(this.locationSelect.recipeTime + " Time");
            this.recipeName = this.locationSelect.recipeName;
            this.Ingredienti = this.locationSelect.Ingredienti;
            this.descrizione= this.locationSelect.descrizione;
            this.difficolta= this.locationSelect.difficolta;
            this.dosi= this.locationSelect.dosi;
            this.preparazione= this.locationSelect.preparazione;
            this.recipeName= this.locationSelect.recipeName;
            this.urlImmagine= this.locationSelect.urlImmagine;
            this.recipeTime= this.locationSelect.recipeTime;
            break;
          }
       }
    
      })
      .catch();
  }

}
