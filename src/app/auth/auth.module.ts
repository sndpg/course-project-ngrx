import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthRoutingModule } from './auth.routing.module';

@NgModule({
  declarations: [SignInComponent, SignUpComponent],
  imports: [SharedModule, ReactiveFormsModule, AuthRoutingModule]
})
export class AuthModule {}
