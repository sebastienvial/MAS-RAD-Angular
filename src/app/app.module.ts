import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { ApiTokenInterceptorService } from "./api/api-token-interceptor.service";

import { SecurityModule } from './security/security.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { AlertModule } from 'ngx-bootstrap/alert';
import { SidebarModule } from 'ng-sidebar';
import { FormsModule } from '@angular/forms';
import { IssueCreationComponent } from './components/issue-creation/issue-creation.component';
import { IssueVueComponent } from './components/issue-vue/issue-vue.component';
import { CitizenPageComponent } from './citizen-page/citizen-page.component';
import { MapComponent } from './components/map/map.component';
import { IssueDetailComponent } from './components/issue-detail/issue-detail.component';
import { HeaderComponent } from './components/header/header.component';
import { IssueUpdateComponent } from './components/issue-update/issue-update.component';

// import { FileSelectDirective } from 'ng2-file-upload';



@NgModule({
  declarations: [
    AppComponent,
    IssueCreationComponent,
    IssueVueComponent,
    CitizenPageComponent,
    MapComponent,
    IssueDetailComponent,
    HeaderComponent,
    IssueUpdateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SecurityModule,
    BrowserAnimationsModule,
    LeafletModule,
    AlertModule.forRoot(),
    SidebarModule.forRoot(),
    FormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiTokenInterceptorService,
      multi: true,
    },],
  bootstrap: [AppComponent]
})
export class AppModule { }
