import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RecipesProvider } from '../../providers/service/recipesService';

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

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private DBistance: RecipesProvider) {
  }

  ionViewDidEnter() {
    console.log('ionViewDidLoad RecipesPage');
    this.retrieveCollectionRecipes();
    console.log(this.locations + "locations scrittura");
  }

  retrieveCollectionRecipes(): void {
    this.DBistance.getRecipes("Recipes")
       .then((data) => {

          this.locations = data;
       })
       .catch();
 }

}
