import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { MitarbeiterComponent } from './mitarbeiter.component';
import { Mitarbeiter } from '../model/mitarbeiter-model';

describe('MitarbeiterComponent', () => {
  let mitarbeiterComponent: Spectator<MitarbeiterComponent>; 

  const createComponent = createComponentFactory({
      component:MitarbeiterComponent,
      imports:[],
  });

  beforeEach(() => mitarbeiterComponent = createComponent({
    props: {
      mitarbeiter: new Mitarbeiter("", "", "","finfantino", "Felipe", [])
    }
  }))

  it("Should render mitarbeiter", () =>{
    // create mitarbeiter

    mitarbeiterComponent.component.mitarbeiter.addLanguages(["Javascript"]);
    let divWithContent = mitarbeiterComponent.query("#Felipe");
    expect(divWithContent).toExist();

  })
});
