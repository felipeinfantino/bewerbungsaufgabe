import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { MitarbeiterComponent } from './mitarbeiter.component';

describe('MitarbeiterComponent', () => {
  let mitarbeiterComponent: Spectator<MitarbeiterComponent>; 

  const createComponent = createComponentFactory({
      component:MitarbeiterComponent,
      imports:[],
  });

  beforeEach(() => mitarbeiterComponent = createComponent({
    props: {
      name: "Felipe",
      languages: [],
      avatar_url : "",
      url: "",
    }
  }))

  it("Should render mitarbeiter", () =>{
    // create mitarbeiter

    mitarbeiterComponent.component.languages.push({ language :"Javascript", counter: 1 });
    let divWithContent = mitarbeiterComponent.query("#Felipe");
    expect(divWithContent).toExist();

  })
});
