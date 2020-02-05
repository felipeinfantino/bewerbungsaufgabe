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
      if(mitarbeiter.languages.includes(this.language_search))return mitarbeiter;
    })

  }

  clear(){
    this.language_search = "";
    this.current_mitarbeiterlist = [...this.all_mitarbeiterlist];
  }

}
