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
import { MapCpnComponent } from './components/map-cpn/map-cpn.component';

import { AlertModule } from 'ngx-bootstrap/alert';
import { SidebarModule } from 'ng-sidebar';
import { ChoicePositionPageComponent } from './choice-position-page/choice-position-page.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    DummyPageComponent,
    ProvideIssuePageComponent,
    MapCpnComponent,
    ChoicePositionPageComponent,
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
