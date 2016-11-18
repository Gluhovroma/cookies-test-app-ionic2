import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import  { CookiesAddPage } from '../pages/cookies-add/cookies-add';
import { StorageProvider } from '../providers/storage';
import { Storage } from '@ionic/storage';
import {FormBuilder,  FormGroup, Validators, AbstractControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {UserData} from '../providers/user-data';


@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    CookiesAddPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    ReactiveFormsModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    CookiesAddPage
  ],
  providers: [StorageProvider, Storage, UserData]
})
export class AppModule {}
