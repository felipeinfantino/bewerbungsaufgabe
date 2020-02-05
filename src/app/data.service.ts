import { Injectable } from '@angular/core';
import { Mitarbeiter } from './model/mitarbeiter-model';
import { HttpClient } from '@angular/common/http';
import { map, mergeMap } from 'rxjs/operators';
import { Observable, merge } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  API_PAGE_1 = "https://api.github.com/orgs/codecentric/members";
  API_PAGE_2 = "https://api.github.com/orgs/codecentric/members?page=2";
  params = { "access_token": "b79b570e82bebc08652464b0d122369729e66e77"}

  constructor(private http : HttpClient) { }

  private getGeneralData(): Observable<Mitarbeiter[]>{
    const fistPage = this.http.get(this.API_PAGE_1, {params: this.params}).pipe(
      map( (a : Array<Object>) =>{
        console.log(a);
        return a.map( mit =>{
          return new Mitarbeiter(mit['avatar_url'], mit['url']);
        });
      })
    );
    const secondPage = this.http.get(this.API_PAGE_2, {params: this.params}).pipe(
      map( (a : Array<Object>) =>{
        console.log(a);
        return a.map( mit =>{
          return new Mitarbeiter(mit['avatar_url'], mit['url']);
        });
      })
      );
      return merge(
        fistPage,
        secondPage,
        );
        
        
      }
      
      
      getMitarbeiter(){
        return this.getGeneralData().pipe(
          map(mitarbeite =>{
            mitarbeite.map(async mitarbeiter =>{
              const mitarbeiterInfo = await this.http.get(`${mitarbeiter['url']}`, {params: this.params}).toPromise();
              mitarbeiter.name = mitarbeiterInfo['name'];
              const repos = (await this.http.get(`${mitarbeiter['url']}/repos`, {params: this.params}).toPromise()) as Array<Object>;
              const languages =[]
              for(const repo of repos){
                if(repo['language']){
                  languages.push(repo['language']);
                }
              }
              const usernameArr = mitarbeiter['url'].split("/");
              const username = usernameArr[usernameArr.length -1];
              mitarbeiter.url = `https://github.com/${username}/`;
              mitarbeiter.addLanguages(languages);
            })
            return mitarbeite;
          })
        )        
  }
  
}
