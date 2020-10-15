import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './security/login-page/login-page.component';
import { AuthGuard } from './security/guards/auth.guard';
import { CitizenPageComponent } from './citizen-page/citizen-page.component';
import { IssueVueComponent } from './components/issue-vue/issue-vue.component';
import { IssueCreationComponent } from './components/issue-creation/issue-creation.component';
import { IssueDetailComponent } from './components/issue-detail/issue-detail.component';
import { IssueUpdateComponent } from './components/issue-update/issue-update.component';

const routes: Routes = [
  // Add this default route to redirect to dummy
  { path: "", redirectTo: "citizen", pathMatch: "full" },
  { path: "login", component: LoginPageComponent },
  { path: "citizen", 
    component: CitizenPageComponent, canActivate:[AuthGuard], 
    children: [
      { path: 'show', component: IssueVueComponent },
      { path: 'new', component: IssueCreationComponent},
      { path: 'detail', component: IssueDetailComponent},
      { path: 'update', component: IssueUpdateComponent},
      { path: '', component: IssueVueComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
