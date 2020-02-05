import { Component, OnInit, Input } from '@angular/core';



@Component({
  selector: 'app-mitarbeiter',
  templateUrl: './mitarbeiter.component.html',
  styleUrls: ['./mitarbeiter.component.scss']
})
export class MitarbeiterComponent implements OnInit {

  constructor(){}
  @Input() name: string;
  @Input() avatar_url: string;
  @Input() url: string;
  @Input() languages: string[];
 
  ngOnInit() {
   
  }

  navigate(){
    window.location.href = this.url;
  }

}
