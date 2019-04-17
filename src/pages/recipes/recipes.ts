import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RecipesProvider } from '../../providers/service/recipesService';
import { reduce } from 'rxjs/operators';

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


  splitArray( arrayIniziale : Array<any>) {
     var n = arrayIniziale.length;
      if(n % 2 == 0){
        for(let i=0; i<arrayIniziale.length; i++ ){
          if(i < arrayIniziale.length/2 ){
            this.primoArray[i] = arrayIniziale[i];
          }else this.secondoArray[i] = arrayIniziale[i];
        }
      } else if(n %2 !=0) {
        for(let i=0; i<arrayIniziale.length; i++ ){
          if(i < (arrayIniziale.length/2)+1 ){
            this.primoArray[i] = arrayIniziale[i];
          }else this.secondoArray[i] = arrayIniziale[i];
      }

      }
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
