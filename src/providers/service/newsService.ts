import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'firebase/firestore';
import { SingletonDatabase } from '../../model/Database';

@Injectable()

export class NewsService {

  DBistance: any;
  Domande: any;
  constructor() {
    console.log('Hello DatabaseProvider Provider');

    this.DBistance = SingletonDatabase.getInstance();


    this.DBistance.settings({ timestampsInSnapshots: true });
  }


  getProducs(collectionObj: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.DBistance.collection(collectionObj)
        .get()
        .then((querySnapshot) => {
          let obj: any = [];
          querySnapshot
            .forEach((doc: any) => {
              obj.push({
                id: doc.id,
                nome: doc.data().nome,
                intolleranza: doc.data().intolleranza,

              });
            });

          resolve(obj);
        })
    });
  }

  insertProducs(collectionObj: string,
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