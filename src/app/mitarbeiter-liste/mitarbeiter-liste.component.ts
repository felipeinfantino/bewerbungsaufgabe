import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import {Mitarbeiter} from '../model/mitarbeiter-model';

@Component({
  selector: 'app-mitarbeiter-liste',
  templateUrl: './mitarbeiter-liste.component.html',
  styleUrls: ['./mitarbeiter-liste.component.scss']
})
export class MitarbeiterListeComponent implements OnInit {

  current_mitarbeiterlist: Mitarbeiter[];
  all_mitarbeiterlist: Mitarbeiter[] = [];

  language_search = "";

  constructor(private  dataservice: DataService) { 

    this.dataservice.getMitarbeiter().subscribe(mitarbeiter =>{
      if(!this.current_mitarbeiterlist){
        this.current_mitarbeiterlist = [];
      }
      this.current_mitarbeiterlist.push(...mitarbeiter);
      this.all_mitarbeiterlist.push(...mitarbeiter);
      console.log(this.current_mitarbeiterlist);
    })
  }


  ngOnInit() {
  }

  filter(){
    this.current_mitarbeiterlist = this.all_mitarbeiterlist.filter((mitarbeiter) =>{
      for(const lang of mitarbeiter.languages){
        if(lang['language'] === this.language_search)return mitarbeiter;
      }
    })

     this.current_mitarbeiterlist.sort((a,b) => {
       // a has more projects
       let projectsFromA = 0;
       for(const proj of a.languages){
         if(proj['language'] === this.language_search){
           projectsFromA = proj['counter'];
           break;
         }
       }

       let projectsFromB = 0;
       for(const proj of b.languages){
         if(proj['language'] === this.language_search){
           projectsFromB = proj['counter'];
           break;
         }
       }

       if(projectsFromA > projectsFromB)return -1;
       if(projectsFromA < projectsFromB) return 1;
       return 0;
     })

  }

  clear(){
    this.language_search = "";
    this.current_mitarbeiterlist = [...this.all_mitarbeiterlist];
  }

}
