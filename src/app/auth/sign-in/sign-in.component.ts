import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppState } from 'src/app/store/app.reducer';
import { Store } from '@ngrx/store';
import { AttemptLogin } from '../store/auth.actions';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  signInForm: FormGroup;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.signInForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
    console.log(this.signInForm.controls.password);
    (this.signInForm.controls.password as FormControl).statusChanges.subscribe(
      status => console.log('password = ' + status)
    );
  }

  onSignIn() {
    const email = this.signInForm.value.email;
    const password = this.signInForm.value.password;
    this.store.dispatch(new AttemptLogin({ email, password }));
  }
}
