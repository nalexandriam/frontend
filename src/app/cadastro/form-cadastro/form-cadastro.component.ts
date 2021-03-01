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
  base64ok:boolean = false;
  ImageBase64: any;

  constructor(private apiService: ApiService, private fb: FormBuilder) {
    this.createEmpresaForm();
    this.createCaracteristicaForm();
   }
   createEmpresaForm() {
    this.FormEmpresa = this.fb.group({
      logo: '',
      descricao: '',
      mapa: '',
      login: '',
      senha: ''
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
   
    let tempEmpresaObj = FormEmpresa.getRawValue();
    tempEmpresaObj['logo'] = this.ImageBase64.toString();
    this.bodyEmpresa['empresa'] = tempEmpresaObj; 
    this.bodyEmpresa['empresa']['caracteristica_id'] = this.id_caracteristica;
    this.apiService.cadastroEmpresa(this.bodyEmpresa).subscribe(data =>{
      console.log('data='+data);
    });
  }

  Image(event)
  {
    let file:File = event.target.files[0];
    let base64 = new FileReader();
    base64.readAsDataURL(file);
    base64.onload = data=> {
    //console.log("base64:::::::"+base64.result);
    this.base64ok = true;
    this.ImageBase64 = base64.result;
    };
    base64.onerror = function (error) {
      console.log('Error: ', error);
    };
  }
  ngOnInit() {}

}
