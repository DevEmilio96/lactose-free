// import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';



// Import firebase and firestore

//import * as firebase from 'firebase';

import 'firebase/firestore';
import { SingletonDatabase } from '../../model/Database';




/*

  Generated class for the DatabaseProvider provider.



  See https://angular.io/guide/dependency-injection for more info on providers

  and Angular DI.

*/

@Injectable()

export class RecipesProvider {

  //private DBistance: any;
  DBistance: any;
  Domande: any;
  //public http: HttpClient (nel costructor)
  constructor() {
    console.log('Hello DatabaseProvider Provider');
    //this.DBistance = firebase.firestore();

    this.DBistance = SingletonDatabase.getInstance();
  
    // per risolvere l'errore
        this.DBistance.settings({ timestampsInSnapshots: true });
    }

  // 

  /*
   * Return documents from specific database collection
   */

  getRecipes(collectionObj: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.DBistance.collection(collectionObj)
        .get()
        .then((querySnapshot) => {
          let obj: any = [];
          querySnapshot
            .forEach((doc: any) => {
              obj.push({
                id: doc.id,
                Ingredienti: doc.data().Ingredienti,
                descrizione: doc.data().descrizione,
                difficolta: doc.data().difficolta,
                dosi: doc.data().dosi,
                preparazione: doc.data().preparazione,
                recipeName: doc.data().recipeName,
                recipeTime: doc.data().time,
                urlImmagine: doc.data().urlImmagine,
               
              });
            });

          resolve(obj);
        })
    });
  }
  /**
   * Add a new document to a selected database collection
   * ()
   */
  insertRecipes(collectionObj: string,
    docID: String,
    dataObj: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.DBistance
        .collection(collectionObj)
        .doc(docID)
        .set(dataObj, { merge: true })
        .then((data: any) => {
          resolve(data);
        })
    })
  }

  

}