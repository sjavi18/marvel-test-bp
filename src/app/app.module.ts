import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from './shared.module';
import { routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { ExternalAssetsConfig, ExternalAssetsModule } from '@pichincha/angular-sdk/external-assets';
import { HttpModule } from '@pichincha/angular-sdk/http';

const assets: Array<ExternalAssetsConfig> = [{
  type: 'stylesheet',
  url: '/assets/bootstrap.css'
}]


@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    SharedModule,
    RouterModule.forRoot(routes),
    HttpModule.forRoot({ api_url: 'http://localhost:3000' }),
    ExternalAssetsModule.forRoot(assets)
  ],
  providers: [
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
