import { Component, VERSION } from '@angular/core';
import * as Realm from 'realm-web';
import { MainPageComponent } from '../main-page/main-page.component';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';


async function loginEmailPassword(email, password,app) {
  // Create an anonymous credential
  
  
  const credentials = Realm.Credentials.emailPassword(email, password);
  
  try {
    // Authenticate the user
    const user = await app.logIn(credentials);
    
    // `App.currentUser` updates to match the logged in user
    console.assert(user.id === app.currentUser.id);
    //this.app = new Realm.App('data-icqqg')
    //this.userRefreshToken = sessionStorage.getItem("userRefreshToken");
    const userRefreshToken = user.refreshToken
    //console.log(app.currentUser)
    const emmail = user.profile.email
    const username = emmail.split("@")[0]
    sessionStorage.setItem("email", emmail);
    sessionStorage.setItem("username", username);
    sessionStorage.setItem("userId", user.id);
    sessionStorage.setItem("user",JSON.stringify(user))

    const mongo =user.mongoClient('Cluster0');
    const collection = mongo.db('Data').collection("users");
    const isfound = await collection.find({'id':user.id})
    const existing_user = isfound[0] != undefined
    
    const moment = new Date();
    if (!existing_user) {
      collection.insertOne({'id':user.id,'username':username,'user_mail':emmail,'created':moment,'last_login':moment,roles:["Jury"]})
    }
    else {
      collection.updateOne({'id':user.id},{$set:{'last_login':moment}})
    }
    return true;
  } catch (err) {
    console.error('Failed to log in', err);
    //return err.__zone_symbol__state
    return false
  }
}
//const user = loginEmailPassword("spalette@feyel-artzner.com", "FeyelR&D");
//console.log("Successfully logged in!", user);

@Component({
  selector: 'app-connexion-form',
  templateUrl: './connexion-form.component.html',
  styleUrls: ['./connexion-form.component.css'],
})
export class ConnexionFormComponent {
  connected = true;
  correctForm = true;
  hide = true;
  redirect = false;
   constructor(public router: Router){

   }
  loginUser() {
    if (
      this.signinForm.controls['email'].status == 'INVALID' ||
      this.signinForm.controls['password'].status == 'INVALID'
    ) {
      this.correctForm = false;
    } else {
      this.correctForm = true;
    }
  }
  signinForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  app = new Realm.App('data-icqqg');
  Log(a: string, b: string) {
    //console.log
    this.loginUser();
    if (this.correctForm) {
      //console.log(this.correctForm)
      const app = environment.application;
      loginEmailPassword(a, b,app).then((authorized) => {
        if (authorized) {
          console.log("Successfully logged in!")
          // this.redirect = true;
          // //console.log(user.__zone_symbol__value)
                  // Usually you would use the redirect URL from the auth service.
          // However to keep the example simple, we will always redirect to `/admin`.

          const redirectUrl = '/dashboard';
  
          // Redirect the user
          this.router.navigate([redirectUrl]);
          //console.log("redirected to",redirectUrl)
        } else {
          this.connected = false;
        }
      })
      //console.log(user.__zone_symbol__value[0])
      
    }
  }
  async insert_doc(collection : string, doc : any) {
    const mongo = this.app.currentUser.mongoClient('Cluster0');
    const collec = mongo.db('Data').collection(collection);
    const result = await collec.insertOne(doc);
    //console.log(result);
  }
}
