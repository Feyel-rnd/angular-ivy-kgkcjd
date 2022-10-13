import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import * as Realm from 'realm-web';
import {ConnexionFormComponent} from '../connexion-form/connexion-form.component'
import { environment } from '../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

//const app = ConnexionFormComponent
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  constructor(public router: Router,private _snackBar: MatSnackBar) { }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
  showFiller = false;
   userRefreshToken : string;
  // bla : any;
   username : string;
   userid : string;
   email : string;
   result : any;
  // app : any
  isOut =  false;
  authorized : boolean;
  connected_users : number;
  app = environment.application

 
  async LogOut(){

    await this.app.allUsers[sessionStorage.getItem("userId")].logOut()
      sessionStorage.clear();
    
    const redirectUrl = '/login';
  
          // Redirect the user
          this.router.navigate([redirectUrl]);
  }
  analyses_actives=""
  ngOnInit() {
    let user : any;
    try {
    user = this.app.allUsers[sessionStorage.getItem("userId")]
    
  } catch(err) {
    console.error("Echec",err)

  }
    //const user = JSON.parse(sessionStorage.getItem("user"))
    
    //this.userRefreshToken = sessionStorage.getItem("userRefreshToken");
    //console.log(this.app.currentUser)
    
    this.authorized = sessionStorage.getItem("userId")=="63429fec8679d1a724204416";
  const mongo =user.mongoClient('Cluster0');
 const Data = mongo.db("Data")
  const Analyses = Data.collection("Analyses");
  const users = Data.collection("users");
  //console.log(this.app.allUsers)
  users.find({"id":user.id}).then((value)=>{
    
    this.username = value[0].username
    this.email = value.user_mail
  })
  
    //console.log(this.app.allUsers[key].isLoggedIn)
  
  //console.log(this.connected_users)
  Analyses.find({active:true}).then((value)=>{
    this.analyses_actives = value.length.toString()
  })
  // collection2.find({}).then((value)=>{
  //   this.result = value[0]["owner_id"]
  // })
    //sessionStorage.getItem("userRefreshToken");
    //sessionStorage.getItem("email");
    //sessionStorage.getItem("username");
  }
  
}