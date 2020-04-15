import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { firestore } from 'firebase';
import { map, take } from 'rxjs/operators';
import * as firebase from "firebase/app";
import { AngularFirestore } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  error:string;
  loading=false;
  action: 'login'| 'signup' = 'login';
  constructor( private fireAuth: AngularFireAuth, private router: Router) { }

 ngOnInit() {
 }
 async onSubmit(form:NgForm){
   this.loading= true;
   this.error= null;
   const{email, password, firstName, lastName} = form.value;
   let resp;
   try{
     if(this.isSignUp){
     resp= await this.fireAuth.auth.createUserWithEmailAndPassword(email, password);
     await resp.user.updateProfile({displayName: `${firstName} ${lastName}`});
     form.reset();
    }else{
     resp = await this.fireAuth.auth.signInWithEmailAndPassword(email, password);
    }
     const uid = resp.user.uid;
     this.router.navigate([`/profile/${uid}`]);
   }catch(error){
     console.log(error.message);
     this.error = error.message;
   }
   this.loading= false;
    
 }
 get isLogin(){
   return this.action ==='login';
 }
 get isSignUp(){
   return this.action ==='signup';
 }
}