import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
/*
  Generated class for the Storage provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class StorageProvider {
  
 
  constructor(public storage: Storage) {
    
  }
  
  set(key, value) {
      return new Promise(resolve => {
         value = JSON.stringify(value);
         this.storage.set(key, value).then(() => {
           resolve();
         });        
      })      
  }

  get(key) {
    return new Promise(resolve => {
      this.storage.get(key).then(data => {
        resolve(JSON.parse(data));
      })     
    })
  }
  remove(key) {
    return new Promise(resolve => {
      this.storage.remove(key).then(() => {
        resolve();
      })     
    })
  }
  clear() {
    return new Promise(resolve => {
      this.storage.clear().then(() => {
        resolve();
      })     
    })
  }
}

