import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app.routing.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { RecipeService } from '../recipes/recipe.service';
import { AuthGuard } from '../auth/auth-guard.service';
import { AuthInterceptor } from '../shared/auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoggingInterceptor } from '../shared/logging.interceptor';

@NgModule({
  declarations: [HeaderComponent, HomeComponent, PageNotFoundComponent],
  imports: [SharedModule, AppRoutingModule],
  exports: [AppRoutingModule, HeaderComponent, PageNotFoundComponent],
  providers: [
    ShoppingListService,
    RecipeService,
    AuthGuard,
    // order of providers here, determines the order in which the interceptors are called
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true }
  ]
})
export class CoreModule {}
