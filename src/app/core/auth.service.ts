import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router, private fireauth: AngularFireAuth) { }

  logout(){
    this.fireauth.auth.signOut();
    this.router.navigate([``]);
  }

  isLoggedIn(){
    return !!this.fireauth.auth.currentUser;
  }
}
