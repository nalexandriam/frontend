import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable()
export class ApiService {
    private api = "http://127.0.0.1:3000/api/v1/";

    private headers= new HttpHeaders()
    .set('X-User-Email', 'teste@teste')
    .set('X-User-Token', 'teste');

    private headerJsonContent = new HttpHeaders()
    .set('X-User-Email', 'teste@teste')
    .set('X-User-Token', 'teste')
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {}

  loginEmpresa(){
      return this.http.get(`${this.api}empresas.json`,{'headers':this.headers});
  }


cadastroCaracteristica(body:Object){
  
  return this.http.post(`${this.api}caracteristicas.json`,body,{'headers':this.headers})
}

getCaracteristicas(){
  return this.http.get(`${this.api}caracteristicas.json`,{'headers':this.headers})
}

getEmpresa(){
  return this.http.get(this.api+'empresas/'+sessionStorage.getItem('id'),{'headers': this.headers})
}

cadastroEmpresa(body:Object){
  return this.http.post(`${this.api}empresas.json`,body,{'headers':this.headers});
}

}