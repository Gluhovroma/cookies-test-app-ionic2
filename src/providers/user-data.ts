import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/groupBy';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/filter';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';
import {StorageProvider} from '../providers/storage';


@Injectable()
export class UserData {
  data: any;
  
 


  constructor(private http: Http, private storage: StorageProvider) {
      
  }

  login(loginData) {  

    return new Promise(resolve => { 

       let headers = new Headers();

       headers.set('Content-Type', ['application/json']);
       headers.set('Access-Control-Allow-Origin', ['*']);       
       headers.set('Access-Control-Allow-Credentials', ['true']);
       
      let reqoptions =  new RequestOptions({
        headers: headers
      });

      this.http.post('http://138.68.97.250:8000/auth/login', loginData,reqoptions)
      	.map(res => res.json())
      	.subscribe(data => {
      		console.log(data);
          if(data.state == 'success') { 

            let auth = {
              userName: data.user.login,
              id: data.user.id
            }
                   this.storage.set('auth', auth)
            .then(() => {
              
                resolve();
            })  
          }
          else {
            resolve(Promise.reject("Неверный логин или пароль."));
          }
      	},
      	err => {
          resolve(Promise.reject("Произошла ошибка, проверьте подключение к интернет."));
      	})
      	
      // this.httpProvider.load(data)
      //   .then(data => {  
          
      //     this.storage.set('auth', auth)
      //       .then(() => {
      //         this.storage.set(this.HAS_LOGGED_IN, true);
      //           resolve(auth);
      //       })  
      //   },
      //   err => {
      //     resolve(Promise.reject(err));
      //   })
    });
  }

  
  getAuth() {
    return new Promise(resolve => {
      this.storage.get('auth').then((auth) => {          
        resolve(auth);                
      })
    })
  }
  logOut() {
    return new Promise(resolve => {
      this.storage.remove('auth').then(() => {          
        resolve();                
      })
    })
  }




}

