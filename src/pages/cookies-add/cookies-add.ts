import { Component } from '@angular/core';
import { FormBuilder,  FormGroup, Validators, AbstractControl, FormGroupDirective} from '@angular/forms';
import { NavController, LoadingController, ToastController} from 'ionic-angular';
import { UserData} from '../../providers/user-data';
import { Transfer } from 'ionic-native';
import { ImagePicker } from 'ionic-native';
import { LoginPage} from '../../pages/login/login';

@Component({
  selector: 'page-cookies-add',
  templateUrl: 'cookies-add.html'
})
export class CookiesAddPage {
  cookiesAddForm: FormGroup;
  title: AbstractControl;
  description: AbstractControl;
  img = null;
  submited = false;
  constructor(public navCtrl: NavController, public fb: FormBuilder, private loadingCtrl: LoadingController, private userData: UserData, private toastCtrl: ToastController) {
  	
  	this.initForm();

  }
  initForm() {
  	this.cookiesAddForm = this.fb.group({  
            'title': ['', Validators.compose([Validators.required])],
            'description': ['', Validators.compose([Validators.required])]
        });
      this.title = this.cookiesAddForm.controls['title'];     
      this.description = this.cookiesAddForm.controls['description']
  }
  onSubmit(value): void { 
   	this.submited = true;
	   	if (this.cookiesAddForm.valid) {
	   		console.log("valid");
	   		if (this.img != null) {	   			   						            
	   			console.log("not null");
	   			let loading = this.loadingCtrl.create({
        			content: 'Пожалуйста подождите...',
        
        		});
        		loading.present();

	   			const fileTransfer = new Transfer();
  				var options: any;
			  	options = {
				     fileKey: 'photo_file',
				     fileName: 'IMG.jpg'
				}
				fileTransfer.upload(this.img, "http://138.68.97.250:8000/api/add-cookies", options)
				   .then((data) => {
				   	loading.dismiss()
			            .then(() => {
			              this.showToast("Картинка успешно добавлена");				      
					   	  this.initForm();
					      this.clearImg();
					      this.submited = false;
			            })
				   	   

				   }, 
				   (err) => {
				   	loading.dismiss()
			            .then(() => {
			               if (err.status == 401) {
					   	 	this.userData.logOut()
					   	 		.then(() => {
					   	 			this.navCtrl.setRoot(LoginPage);
					   	 			this.showToast("Ошибка авторизации");
					   	 		})
						   	 }
						   	 else {
								this.showToast("Извините, произошла ошибка. Проверьте подключение к интернету.");
						   	 }	
			            })
					   				     
				   })
	   		}
	   	}
  }
  openGallery() {
	let options = {
	    maximumImagesCount: 1
	};

	ImagePicker.getPictures(options).then(
	   file_uris => {
	   	this.img = file_uris[0];	      
	   },
	   err => {
	      this.showToast("Извините, произошла ошибка");
	   });
  }
  clearImg() {
  	this.img = null;
  }
  showToast(mess) {
  	let toast = this.toastCtrl.create({
		message: mess,
		duration: 10000,
		position: 'bottom',
		showCloseButton: true,
		closeButtonText: "Закрыть",
		dismissOnPageChange: true,                    
	});
	toast.present();
  }

}
