import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { FormCadastroComponent} from './cadastro/form-cadastro/form-cadastro.component';
import { EmpresaDadosComponent } from './empresa/empresa-dados/empresa-dados.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'cadastro',
    component: FormCadastroComponent
  },
  {
    path: 'empresa',
    component: EmpresaDadosComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
