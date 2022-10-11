import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

//import * as Realm from 'realm-web';

@Injectable()
export class ValidTokenGuard implements CanActivate {
  constructor(public router: Router,private _snackBar: MatSnackBar) { }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      const app = environment.application
      const user = app.allUsers[sessionStorage.getItem("userId")]
      //console.log(user.refreshToken)
      if (user.refreshToken==null) {
        const redirectUrl = '/login';
  
          // Redirect the user
          this.router.navigate([redirectUrl]);
          this.openSnackBar("Votre session a expiré, veuillez vous reconnecter.","Fermer")
        return false
      }
      else {
    return true;}
  }
}
