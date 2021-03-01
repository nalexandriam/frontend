import { Component } from '@angular/core';
import {FormGroup, FormBuilder, AbstractControl} from '@angular/forms';
import { ApiService } from '../api/api.service';
import {Router} from '@angular/router'



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  empresa = new Object({});
  Data: Object[];
  exibirDados = false;
  loginForm: FormGroup;
  pinVisibleControl: AbstractControl;

  constructor(private fb: FormBuilder, private apiService:ApiService, private router: Router) {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      login: '',
      senha: ''
    });
  }



  

login(loginForm:FormGroup){
  var dataTemp = [];
  
  this.apiService.loginEmpresa().subscribe(data => {
   // console.log(data[0]+"????");
    for(let i=0;data[i];i++){
      dataTemp.push(data[i]);
    }
     
     this.loadEmpresa(dataTemp, loginForm);
  },
  error =>{
    console.log("Ocorreu um problema durante o login.. verifique se digitou corretamente.");
  });
}

loadEmpresa(dataTemp, loginForm){ 
  //console.log(dataTemp[0]['login']);
 // console.log(loginForm.value['login'] === dataTemp[0]['login']);
  var len = dataTemp.length;
  for(let i=0;i<len;i++){console.log('*');
   if (dataTemp[i]['login'] == loginForm.value['login'] && dataTemp[i]['senha'] == loginForm.value['senha']){
     sessionStorage.setItem('id',dataTemp[i]['id']);
     this.router.navigate(['/empresa']);
    /*this.empresa['logo'] = dataTemp[i]['logo'];
    this.empresa['descricao'] = dataTemp[i]['descricao'];
    this.empresa['mapa'] = dataTemp[i]['mapa'];
    this.empresa['login'] = dataTemp[i]['login'];
    this.empresa['senha'] = dataTemp[i]['senha'];*/
   
  }
}
  
}

cadastro(){
  this.router.navigate(['cadastro/']);
}

}