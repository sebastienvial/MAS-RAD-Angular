import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './security/login-page/login-page.component';
import { DummyPageComponent } from './dummy-page/dummy-page.component';
import { AuthGuard } from './security/guards/auth.guard';

import { ChoicePositionPageComponent } from './choice-position-page/choice-position-page.component';


const routes: Routes = [
  // Add this default route to redirect to dummy
  { path: "", redirectTo: "location", pathMatch: "full" },
  { path: "login", component: LoginPageComponent },
  { path: "dummy", component: DummyPageComponent, canActivate: [AuthGuard], },
  { path: "location", component: ChoicePositionPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
