import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { RegistrationPageComponent } from '../pages/registration/registration';
import firebase from 'firebase';
import { AccountService } from '../providers/service/accountService';

@Component({
  templateUrl: 'app.html'
})
export class MyAppComponent {
  @ViewChild(Nav) nav: Nav;
  //root page
  rootPage: any;
  //check login
  logged: boolean;
  //check verified email
  verified: boolean;
  //email of logged user
  loggedEmail: String;
  //type of logged user
  userType: String;
  //list of pages
  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform, 
              public statusBar: StatusBar, 
              public splashScreen: SplashScreen,
              public accountService: AccountService) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage },
      { title: 'Login', component: LoginPage },
      { title: 'Registrazione', component: RegistrationPageComponent }
    ];

  }
  initializeApp() {
    this.statusBar.styleDefault();
    this.splashScreen.hide();

    this.loginLogic();
  }

  loginLogic() {

      //set logged variable
      this.accountService.afAuth.authState
      .subscribe(
        user => {
              
          console.log("authenticated",user);
    
          //user logged
          if (user != null) {
          
            this.logged = true;

            //user logged & verified
            if (user.emailVerified == true) {

              this.verified = true;
              this.userIsLogged(user, this.verified);
            }

            //user logged & not verified
            else {

              this.verified = false;
              this.userIsLogged(user, this.verified);
            }
          }  
            
          //user unlogged
          else {
            
            this.logged = false;
            this.userIsNotLogged();
          }
        },
      );
  }

  userIsLogged(user, verified) {

    this.rootPage = HomePage;
    this.loggedEmail = firebase.auth().currentUser.email;

    //check the type of logged user
    this.accountService.getTypeAccount("Account", user.email)
    .then(
      type => {

        //tutor & verified
        if (type == "tutor" && verified == true) {

          this.userType = "Tutor Account";

          this.pages = [
            { title: 'Home', component: HomePage },
         
          ];
        }

        //tutor & not verified
        else if (type == "tutor" && verified == false) {

          this.userType = "Tutor Account";

          this.pages = [
            { title: 'Home', component: HomePage },
          ];
        }
        
        //student & verified
        else if (type == "student" && verified == true) {

          this.userType = "Student Account";

          this.pages = [
            { title: 'Home', component: HomePage },
          ];
        }

        //student & not verified
        else if (type == "student" && verified == false) {
          
          this.userType = "Student Account";

          this.pages = [
            { title: 'Home', component: HomePage },
          ];
        }

        //admin
        else if (type == "admin") {

          this.userType = "Admin Account";

          this.pages = [];
        }

        //error
        else {

          this.userIsNotLogged();
          this.logout();
        }
      },
    );
  }

  userIsNotLogged() {

    this.rootPage = LoginPage;
    this.verified = false;
    this.loggedEmail = "Guest@erasmussmart.org";
    this.userType = "Guest Account";
        
    this.pages = [
      { title: 'Login', component: LoginPage},
      { title: 'Home', component: HomePage },
    ];
  }

  logout() {

    firebase.auth().signOut();
    localStorage.clear();

    this.rootPage = LoginPage;
    this.logged = false;
    this.verified = false;
    this.loggedEmail = "Guest@erasmussmart.org";
    this.userType = "Guest Account";
    
    this.nav.popToRoot;
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
