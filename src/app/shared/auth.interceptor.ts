import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { switchMap, flatMap, take } from 'rxjs/operators';
import * as fromAuth from '../auth/store/auth.reducer';
import { AppState } from '../store/app.reducer';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private store: Store<AppState>) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.store.select('auth').pipe(
      take(1),
      switchMap((authState: fromAuth.State) => {
        const clonedRequest = request.clone({
          params: request.params.set('auth', authState.token)
        });
        return next.handle(clonedRequest);
      })
    );
  }
}
