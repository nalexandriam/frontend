import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api/api.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-empresa-dados',
  templateUrl: './empresa-dados.component.html',
  styleUrls: ['./empresa-dados.component.scss'],
})
export class EmpresaDadosComponent implements OnInit {
  empresa = new Object({});
  dadosEmpresaRecebidos: boolean = false;
  constructor(private apiService: ApiService, private router:Router) { }

  dadosEmpresa(){
    this.apiService.getEmpresa().subscribe(data => {
      this.empresa['logo'] = data['logo'];
      this.empresa['descricao'] = data['descricao'];
      this.empresa['mapa'] = data['mapa'];
      this.empresa['login'] = data['login'];
      console.log(this.empresa['login']+"------"+data['login']);
      this.dadosEmpresaRecebidos = true;
    },
    error => {
      console.log('houve um erro na requisição..');
      this.router.navigate(['login']);
    });
  }

  sair(){
    sessionStorage.removeItem('id');
    this.router.navigate(['login']);
  }

  ngOnInit() {
    if(sessionStorage.getItem('id'))
      this.dadosEmpresa();
    else
      this.router.navigate(['login']);
  }

}
