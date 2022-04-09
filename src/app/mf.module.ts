import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from "@angular/common";
import { SharedModule } from './shared.module';
import { routes } from './app-routing.module';
import { ExternalAssetsModule, ExternalAssetsConfig } from '@pichincha/angular-sdk/external-assets';
import { HttpModule } from '@pichincha/angular-sdk/http';

const assets: Array<ExternalAssetsConfig> = [{
  type: 'stylesheet',
  url: ''
}]

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    HttpModule.forRoot({ api_url: 'http://localhost:3000' }),
    ExternalAssetsModule.forRoot(assets)
  ],
  providers: [
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MFModule { }
