import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, IonicPage } from 'ionic-angular';
import { AccountService } from '../../providers/service/accountService'
import CodiceFiscale from 'codice-fiscale-js'
import { COMUNI } from 'codice-fiscale-js/src/geo-data.js'
import firebase from 'firebase';
import { HomePage } from '../home/home';

@IonicPage()

@Component({
	selector: 'page-registration',
	templateUrl: './registration.html'
})
export class RegistrationPageComponent {
	upload: boolean = true;
	all: boolean = true;
	signupError: string;
	form: FormGroup;
	public gender: any;
	data: any;
	errorMessageEmail: string;
	errorMessagePassword: string;
	acs: firebase.auth.ActionCodeSettings;

	constructor(
		private navCtrl: NavController,
		private serviceProv: AccountService,
		fb: FormBuilder
	) {
		this.form = fb.group({
			email: ['', Validators.compose([Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])],
			password: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.pattern('^[a-zA-Z0-9]+$')])],
			name: ['', Validators.compose([Validators.required, Validators.maxLength(16), Validators.pattern('^[a-zA-Z]+$')])],
			surname: ['', Validators.compose([Validators.required, Validators.maxLength(16), Validators.pattern('^[a-zA-Z]+$')])],			
			gender: ['M', Validators.required],
			confirmPassword: ['', Validators.required],
			privacyCheck: ['false', Validators.requiredTrue]
		});

		/* Notate bene il .reload(). Senza questo anche se l'utente ha cliccato 
			sull'email verificata le modifiche non vengono visualizzate finchè l'utente non rilogga 
			oppure finchè non viene ricaricata L'APP.

			Per controllare se un utente ha verificato la propria email, usate:
			firebase.auth().currentUser.emailVerified

		
			console.log("User:", firebase.auth().currentUser)
			
			if (firebase.auth().currentUser != null)
				firebase.auth().currentUser.reload().then(() => {
					if (firebase.auth().currentUser.emailVerified)
						console.log("LOG:", "Hai verificato l'email")
					else
						console.log("LOG:", "NON HAI VERIFICATO L'EMAIL")
				});
			else
				console.log("LOG:", "Prima devi loggare!")
		 */
	}


	signup() {

		this.data = this.form.value;


		//Verifica i validators  
		if (this.form.status == "INVALID") {
			this.markFormGroupTouched(this.form);
			console.log("Form Invalido:", this.form)
			return;
		}


		//Verifica che non esista un account già registrato con l'email inserita
		this.serviceProv.getAccount('Account', this.data.email).then((result) => {
			if (result.data() != undefined) {
				console.log("EMAIL INVALIDA!!!")
				this.errorMessageEmail = "Account già esistente. Inserire un'email diversa";
				return;
			}
			else {
				console.log("EMAIL VALIDA !!!")
				this.errorMessageEmail = undefined
			}
		});

		//Verifica che le due password inserite sono uguali
		if (this.data.password != this.data.confirmPassword) {
			console.log("PASS DIVERSE!!!");
			this.errorMessagePassword = "Password diverse, inserire la stessa password"
			return;
		}
		else
			this.errorMessagePassword = undefined

		//Crea l'account da salvare nel DB
		let credentials = {
			email: this.data.email,
			password: this.data.password,
			name: this.data.name,
			surname: this.data.surname,
			gender: this.data.gender,
		};

		//Salva l'account nel DB nella collection Account con ID l'email inserita
		this.serviceProv.registration("Account", this.data.email, credentials).then(
			() => this.navCtrl.setRoot(HomePage),
			error => this.signupError = error.message
		);


		firebase.auth().createUserWithEmailAndPassword(this.data.email, this.data.password).then(() => {
			firebase.auth().signInWithEmailAndPassword(this.data.email, this.data.password);
			let user = firebase.auth().currentUser;
			//console.log("Email:", user.email); FUNZIONA!
			user.sendEmailVerification().then(() => {
				alert("Inviata un' e-mail di verifica a " + user.email)
			});
		});

	}

	//Imposta tutti i form "touched" per la visualizzazione degli errori se l'utente non ha cliccato su uno dei form
	private markFormGroupTouched(formGroup: FormGroup) {
		(<any>Object).values(formGroup.controls).forEach(control => {
			control.markAsTouched();

			if (control.controls) {
				this.markFormGroupTouched(control);
			}
		});
	}
}
