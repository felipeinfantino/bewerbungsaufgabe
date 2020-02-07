import { Injectable } from "@angular/core";
import { Mitarbeiter } from "./model/mitarbeiter-model";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class DataService {
  ApiUrl = "https://api.github.com/orgs/codecentric/members";
  params = {
    access_token: "7647a2051a2a90dc0b0a55dca33e257b63beb0d8",
    per_page: "50"
  };

  constructor(private http: HttpClient) {}

  getMitarbeiter(): Observable<Mitarbeiter[]> {
    return this.http
      .get(this.ApiUrl, { params: this.params })
      .pipe(
        map(this.createMitarbeiter),
        map(this.addName.bind(this)),
        map(this.addLanguages.bind(this))
      );
  }

  createMitarbeiter(responseArray: Array<Object>) {
    return responseArray.map(generalInfo => {
      return new Mitarbeiter(
        generalInfo["avatar_url"],
        generalInfo["url"],
        generalInfo["login"]
      );
    });
  }

  async addName(mitarbeitern: Mitarbeiter[]) {
    for(const mitarbeiter of mitarbeitern){
      const mitarbeiterInfo = await this.getName(mitarbeiter);
      mitarbeiter.name = mitarbeiterInfo["name"];
    }
    return mitarbeitern;
  }

  async addLanguages(mitarbeitern: Mitarbeiter[]) {
    for(const mitarbeiter of mitarbeitern){
      const repos = await this.getRepos(mitarbeiter) as Array<Object>;
      const languages = [];
      for (const repo of repos) {
        if (repo["language"]) {
          languages.push(repo["language"]);
        }
      }
      mitarbeiter.addLanguages(languages);
    }
    return mitarbeitern;
  }

  // Isolate the http request for easier testing
  getRepos(mitarbeiter: Mitarbeiter){
    return this.http
    .get(`${mitarbeiter["apiUrl"]}/repos`, { params: this.params })
    .toPromise();
  }

  getName(mitarbeiter: Mitarbeiter){
    return this.http
        .get(`${mitarbeiter["apiUrl"]}`, { params: this.params })
        .toPromise();
  }
}
