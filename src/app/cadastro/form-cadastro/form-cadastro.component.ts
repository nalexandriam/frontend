import { Component, OnInit } from '@angular/core';

import {FormGroup, FormBuilder, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../api/api.service';


@Component({
  selector: 'app-form-cadastro',
  templateUrl: './form-cadastro.component.html',
  styleUrls: ['./form-cadastro.component.scss'],
})
export class FormCadastroComponent implements OnInit {
  bodyCaracteristica:Object = {};
  bodyEmpresa:Object = {};
  FormEmpresa: FormGroup;
  FormCaracteristica: FormGroup;
  caracteristicaOK: boolean = false;
  id_caracteristica: number;

  constructor(private apiService: ApiService, private fb: FormBuilder) {
    this.createEmpresaForm();
    this.createCaracteristicaForm();
   }
   createEmpresaForm() {
    this.FormEmpresa = this.fb.group({
      logo: 'logo',
      descricao: 'descricao',
      mapa: 'mapa',
      login: 'login',
      senha: 'senha'
    });
  }

  createCaracteristicaForm(){
    this.FormCaracteristica = this.fb.group({
      descricao: ''
    });
  }


  cadastrarCaracteristica(FormCaracteristica: FormGroup){
    this.bodyCaracteristica['caracteristica']= FormCaracteristica.getRawValue();
     this.apiService.cadastroCaracteristica(this.bodyCaracteristica).subscribe(data => {
        console.log('id = '+data['id']);
        this.id_caracteristica = data['id'];
        this.caracteristicaOK = true;
    });
  }

  cadastrarEmpresa(FormEmpresa: FormGroup){
    this.bodyEmpresa['empresa'] = FormEmpresa.getRawValue();
    this.bodyEmpresa['empresa']['caracteristica_id'] = this.id_caracteristica;
    this.apiService.cadastroEmpresa(this.bodyEmpresa).subscribe(data =>{
      console.log('data='+data);
    });
  }

  ngOnInit() {}

}
