import { Component, OnInit, Input } from '@angular/core';
import { Mitarbeiter } from '../model/mitarbeiter-model';

@Component({
  selector: 'app-mitarbeiter',
  templateUrl: './mitarbeiter.component.html',
  styleUrls: ['./mitarbeiter.component.scss']
})
export class MitarbeiterComponent implements OnInit {

  constructor(){}
  @Input() mitarbeiter : Mitarbeiter;

  ngOnInit() {
  }

  navigate(){
    window.location.href = this.mitarbeiter.repoUrl;
  }

}
