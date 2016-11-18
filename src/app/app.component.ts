import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { StorageProvider } from '../providers/storage';
import { LoginPage } from '../pages/login/login';
import  {CookiesAddPage} from '../pages/cookies-add/cookies-add';


@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage:any;

  constructor(platform: Platform, public storage: StorageProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
      
      
      this.storage.get('auth')
        .then(auth => {           
          if (!auth) {
            this.rootPage = LoginPage;
          }
          else {
            this.rootPage = CookiesAddPage
          }
      });
    });
  }
}
