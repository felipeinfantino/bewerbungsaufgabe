import {
  Spectator,
  createComponentFactory,
  mockProvider
} from "@ngneat/spectator";
import { MitarbeiterListeComponent } from "./mitarbeiter-liste.component";
import { DataService } from "../data.service";
import { of } from "rxjs";
import { Mitarbeiter } from "../model/mitarbeiter-model";
import { MitarbeiterComponent } from "../mitarbeiter/mitarbeiter.component";
import { FormsModule } from "@angular/forms";

describe("MitarbeiterListComponent", () => {
  let mitarbeiterListeComponent: Spectator<MitarbeiterListeComponent>;

  const createComponent = createComponentFactory({
    component: MitarbeiterListeComponent,
    imports: [FormsModule],
    declarations: [MitarbeiterComponent],
    providers: [
      mockProvider(DataService, {
        getMitarbeiter: () => {
          const mitarbeiter = new Mitarbeiter("", "");
          mitarbeiter.name = "Felipe";
          mitarbeiter.languages = [{ language: "Javascript", counter: 1 }];
          return of([mitarbeiter]);
        }
      })
    ]
  });

  beforeEach(() => (mitarbeiterListeComponent = createComponent()));

  it("Should render 1 mitarbeiter", () => {
    const mitarbeiter = mitarbeiterListeComponent.queryAll("app-mitarbeiter");
    expect(mitarbeiter.length).toEqual(1);
  });

  it("Should render 2 mitarbeiter, after pushing mitarbeiter", () => {
    const newMitarbeiter = createMitarbeiter();

    mitarbeiterListeComponent.component.current_mitarbeiterlist.push(
      newMitarbeiter
    );
    mitarbeiterListeComponent.detectChanges();
    const mitarbeiter = mitarbeiterListeComponent.queryAll("app-mitarbeiter");
    expect(mitarbeiter.length).toEqual(2);
  });

  it("Filter function should work", () => {
    // we add 3 mitarbeiter, 2 that can python and 1 that can Java
    const m1 = createMitarbeiter([{ language: "Python", counter: 1 }], "Bob");
    const m2 = createMitarbeiter([{ language: "Python", counter: 1 }], "Carl");
    const m3 = createMitarbeiter([{ language: "Java", counter: 1 }], "John");

    mitarbeiterListeComponent.component.all_mitarbeiterlist.push(m1,m2,m3)
    mitarbeiterListeComponent.component.current_mitarbeiterlist.push(m1,m2,m3)
    mitarbeiterListeComponent.detectChanges();
    let mitarbeiter = mitarbeiterListeComponent.queryAll("app-mitarbeiter");
    expect(mitarbeiter.length).toEqual(4);
    // we filter through python, we should only find 2 mitarbeiter 
    mitarbeiterListeComponent.component.language_search = "Python";
    mitarbeiterListeComponent.component.filter();
    mitarbeiterListeComponent.detectChanges();
    mitarbeiter = mitarbeiterListeComponent.queryAll("app-mitarbeiter");
    expect(mitarbeiter.length).toEqual(2);

  });

  it("Clear function should work", () => {
    // we add 3 mitarbeiter, 2 that can python and 1 that can Java
    const m1 = createMitarbeiter([{ language: "Python", counter: 1 }], "Bob");
    const m2 = createMitarbeiter([{ language: "Python", counter: 1 }], "Carl");
    const m3 = createMitarbeiter([{ language: "Java", counter: 1 }], "John");

    mitarbeiterListeComponent.component.all_mitarbeiterlist.push(m1,m2,m3)
    mitarbeiterListeComponent.component.current_mitarbeiterlist.push(m1,m2,m3)
    mitarbeiterListeComponent.detectChanges();
    let mitarbeiter = mitarbeiterListeComponent.queryAll("app-mitarbeiter");
    expect(mitarbeiter.length).toEqual(4);
    // we filter through python, we should only find 2 mitarbeiter 
    mitarbeiterListeComponent.component.language_search = "Python";
    mitarbeiterListeComponent.component.filter();
    mitarbeiterListeComponent.detectChanges();
    mitarbeiter = mitarbeiterListeComponent.queryAll("app-mitarbeiter");
    expect(mitarbeiter.length).toEqual(2);

    mitarbeiterListeComponent.component.clear();
    mitarbeiterListeComponent.detectChanges();
    mitarbeiter = mitarbeiterListeComponent.queryAll("app-mitarbeiter");
    expect(mitarbeiter.length).toEqual(4);


  });
});

function createMitarbeiter(languages = [{ language: "Javascript", counter: 1 }], name= "Felipe") {
  const newMitarbeiter = new Mitarbeiter("", "");
  newMitarbeiter.name = name;
  newMitarbeiter.languages = languages;
  return newMitarbeiter;
}
