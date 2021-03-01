import { NgModule, ErrorHandler } from "@angular/core";
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ApiService } from './api/api.service';
import {FormCadastroComponent} from './cadastro/form-cadastro/form-cadastro.component';
import { EmpresaDadosComponent } from './empresa/empresa-dados/empresa-dados.component'
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

@NgModule({
  declarations: [AppComponent,FormCadastroComponent, EmpresaDadosComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, FormsModule, ReactiveFormsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },ApiService, FormsModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
