import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { AttemptSignUp } from '../store/auth.actions';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.signUpForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        this.minLengthValidator
      ])
    });
    console.log(this.signUpForm.controls.password);
    (this.signUpForm.controls.password as FormControl).statusChanges.subscribe(
      status => console.log('password = ' + status)
    );
  }

  onSignUp() {
    const email = this.signUpForm.value.email;
    const password = this.signUpForm.value.password;
    this.store.dispatch(new AttemptSignUp({ username: email, password }));
  }

  minLengthValidator(control: FormControl): { [key: string]: boolean } {
    // there exists an built-in MinLenghtValidator https://angular.io/api/forms/Validators#minLength, but for learning purposes, this one is implemented manually
    return control.touched && control.value.length < 8
      ? {
          tooShort: true
        }
      : null;
  }
}
