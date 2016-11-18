import { Component } from '@angular/core';
import { FormBuilder,  FormGroup, Validators, AbstractControl, FormGroupDirective} from '@angular/forms';
import { NavController, LoadingController, ToastController} from 'ionic-angular';
import { UserData} from '../../providers/user-data';
import { CookiesAddPage} from '../../pages/cookies-add/cookies-add';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  authForm: FormGroup;
  username: AbstractControl;
  password: AbstractControl;
  submited = false;
  constructor(public navCtrl: NavController, public fb: FormBuilder, private loadingCtrl: LoadingController, private userData: UserData, private toastCtrl: ToastController) {
  	this.authForm = fb.group({  
            'username': ['', Validators.compose([Validators.required])],
            'password': ['', Validators.compose([Validators.required])]
        });
      this.username = this.authForm.controls['username'];     
      this.password = this.authForm.controls['password']; 
  }
   onSubmit(value): void { 
    this.submited = true;
   	console.log(value);
	   	if (this.authForm.valid) {
	   		let loading = this.loadingCtrl.create({
        		content: 'Пожалуйста подождите...',
        
        	});
        	loading.present();
        	this.userData.login(value)
        		.then(() => {
        			loading.dismiss()
			            .then(() => {
			               this.navCtrl.setRoot(CookiesAddPage);
			            })
        		},
        		err => {
        			loading.dismiss()
			            .then(() => {
			            	let toast = this.toastCtrl.create({
						        message: err,
						        duration: 10000,
						        position: 'bottom',
						        showCloseButton: true,
						        closeButtonText: "Закрыть",
						        dismissOnPageChange: true,                    
						    });
					      	toast.present();
			            })
        		})
	   	}
   }

}
