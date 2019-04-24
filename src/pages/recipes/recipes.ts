import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RecipesProvider } from '../../providers/service/recipesService';
import { reduce } from 'rxjs/operators';
import { GoRecipesPageComponent } from '../go-recipes/go-recipes';

/**
 * Generated class for the RecipesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPageComponent {
  upload: boolean = true;
  title: string = "Ricette";
    /**
   * @name _COLL
   * @type {string}
   * @private
   * @description      Defines the name of the database collection
   */
  private _COLL: string = "Recipes";

  /**
   * @name locations
   * @type {any}
   * @public
   * @description      Property to store the returned documents from the database collection
   */
  public locations: any;
  public primoArray: Array<any>;
  public secondoArray: Array<any>;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private DBistance: RecipesProvider) {
  }

  ionViewDidEnter() {
    console.log('ionViewDidLoad RecipesPage');
    this.retrieveCollectionRecipes();
  }

  retrieveCollectionRecipes(): void {
    this.DBistance.getRecipes(this._COLL)
       .then((data) => {

          this.locations = data;
       })
       .catch();
 }

 openPageRisposte(location: any) {
  localStorage.setItem("locationId", location);
  this.navCtrl.push(GoRecipesPageComponent);
}

  changeColorEasy(difficolta : string){
    if (difficolta.localeCompare("facile")==0)
      return true;
      else return false;
  }
  changeColorMedium(difficolta : string){
    if (difficolta.localeCompare("media")==0)
      return true;
      else return false;
  }
  changeColorHard(difficolta : string){
    if (difficolta.localeCompare("difficile")==0)
      return true;
      else return false;
  }
}
