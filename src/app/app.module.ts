import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { ApiTokenInterceptorService } from "./api/api-token-interceptor.service";
import { DummyPageComponent } from './dummy-page/dummy-page.component';

import { SecurityModule } from './security/security.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProvideIssuePageComponent } from './provide-issue-page/provide-issue-page.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { AlertModule } from 'ngx-bootstrap/alert';
import { SidebarModule } from 'ng-sidebar';
import { ChoicePositionPageComponent } from './choice-position-page/choice-position-page.component';
import { FormsModule } from '@angular/forms';
import { IssueCreationComponent } from './components/issue-creation/issue-creation.component';
import { IssueVueComponent } from './components/issue-vue/issue-vue.component';
import { IssueComponent } from './components/issue/issue.component';
import { CitizenPageComponent } from './citizen-page/citizen-page.component';
import { MapComponent } from './components/map/map.component';
import { IssueDetailComponent } from './components/issue-detail/issue-detail.component';
import { HeaderComponent } from './components/header/header.component';

// import { FileSelectDirective } from 'ng2-file-upload';



@NgModule({
  declarations: [
    AppComponent,
    DummyPageComponent,
    ProvideIssuePageComponent,
    ChoicePositionPageComponent,
    IssueCreationComponent,
    IssueVueComponent,
    IssueComponent,
    CitizenPageComponent,
    MapComponent,
    IssueDetailComponent,
    HeaderComponent,
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
    // FileSelectDirective,
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
