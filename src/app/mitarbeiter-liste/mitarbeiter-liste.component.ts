import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import {Mitarbeiter} from '../model/mitarbeiter-model';

@Component({
  selector: 'app-mitarbeiter-liste',
  templateUrl: './mitarbeiter-liste.component.html',
  styleUrls: ['./mitarbeiter-liste.component.scss']
})
export class MitarbeiterListeComponent implements OnInit {

  current_mitarbeiterlist: Mitarbeiter[] = [];
  all_mitarbeiterlist: Mitarbeiter[] = [];
  language_search = "";

  constructor(private  dataservice: DataService) { 
    this.dataservice.getMitarbeiter().subscribe(mitarbeiter =>{
      this.current_mitarbeiterlist.push(...mitarbeiter);
      this.all_mitarbeiterlist.push(...mitarbeiter);
    })
  }


  ngOnInit() {
  }

  filter(){
    // binding to this to access the this.language_search in the function
    this.current_mitarbeiterlist = this.all_mitarbeiterlist.filter(this.filterByLanguage.bind(this));
    this.current_mitarbeiterlist.sort(this.sortDescendingByProject.bind(this));
  }

  clear(){
    this.language_search = "";
    this.current_mitarbeiterlist = [...this.all_mitarbeiterlist];
  }

  sortDescendingByProject(mitarbeiter1: Mitarbeiter, mitarbeiter2: Mitarbeiter): number{
    const projectsFromMitarbeiter1 = this.getNumberOfProjects(mitarbeiter1, this.language_search);
    const projectsFromMitarbeiter2 = this.getNumberOfProjects(mitarbeiter2, this.language_search);
    return projectsFromMitarbeiter2 - projectsFromMitarbeiter1;
  }

  filterByLanguage(mitarbeiter: Mitarbeiter){
    for(const lang of mitarbeiter.languages){
      if(lang['language'] === this.language_search)return mitarbeiter;
    }
  }

  getNumberOfProjects(mitarbeiter: Mitarbeiter, language: string): number{
    for(const proj of mitarbeiter.languages){
      if(proj['language'] === language){
        return proj['counter'];
      }
    }
    return 0;
  }

}
