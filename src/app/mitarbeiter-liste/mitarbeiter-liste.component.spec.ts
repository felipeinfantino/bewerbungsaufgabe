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
          mitarbeiter.addLanguages(["Javascript"])
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
    const m1 = createMitarbeiter(["Python", "Python"], "Bob");
    const m2 = createMitarbeiter(["Python"], "Carl");
    const m3 = createMitarbeiter(["Java"], "John");

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
    // the order should be Bob and then Carl
    expect(mitarbeiterListeComponent.component.current_mitarbeiterlist[0]).toEqual(m1);
    expect(mitarbeiterListeComponent.component.current_mitarbeiterlist[1]).toEqual(m2);

  });

  it("Clear function should work", () => {
    // we add 3 mitarbeiter, 2 that can python and 1 that can Java
    const m1 = createMitarbeiter(["Python"], "Bob");
    const m2 = createMitarbeiter(["Python"], "Carl");
    const m3 = createMitarbeiter(["Java"], "John");

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
  it("filterByLanguage should return the mitarbeiter if he has the required language", () => {
    // we add 3 mitarbeiter, 2 that can python and 1 that can Java
    const mitarbeiter = createMitarbeiter(["Python", "Java"], "Bob");
    mitarbeiterListeComponent.component.language_search = "Python";
    const result = mitarbeiterListeComponent.component.filterByLanguage(mitarbeiter);
    expect(result).toBeTruthy();

  });
  it("filterByLanguage should return undefined if the mitarbeiter doesnt have the required language", () => {
    // we add 3 mitarbeiter, 2 that can python and 1 that can Java
    const mitarbeiter = createMitarbeiter(["Perl", "Javascript"], "Carl");
    mitarbeiterListeComponent.component.language_search = "Python";
    const result = mitarbeiterListeComponent.component.filterByLanguage(mitarbeiter);
    expect(result).toBeFalsy();
  });
  it("getNumberOfProjects should return the correct number of projects", () => {
    // we add 3 mitarbeiter, 2 that can python and 1 that can Java
    const mitarbeiter = createMitarbeiter(["Perl", "Javascript", "Perl"], "Carl");
    const perlProjects = mitarbeiterListeComponent.component.getNumberOfProjects(mitarbeiter, "Perl");
    const javascriptProjects = mitarbeiterListeComponent.component.getNumberOfProjects(mitarbeiter, "Javascript");
    const pythonProjecs = mitarbeiterListeComponent.component.getNumberOfProjects(mitarbeiter, "Python");
    expect(perlProjects).toEqual(2);
    expect(javascriptProjects).toEqual(1);
    expect(pythonProjecs).toEqual(0);
  });
  it("sortDescendingByProject should return a positive number if the first mitarbeiter has less projects", () => {
    // we add 3 mitarbeiter, 2 that can python and 1 that can Java
    const mitarbeiter1 = createMitarbeiter(["Perl", "Javascript", "Perl"], "Carl");
    const mitarbeiter2 = createMitarbeiter(["Javascript", "Javascript", "Perl"], "Carl");
    mitarbeiterListeComponent.component.language_search = "Javascript";
    const result = mitarbeiterListeComponent.component.sortDescendingByProject(mitarbeiter1, mitarbeiter2);
    expect(result).toBeGreaterThan(0);
  });


});

function createMitarbeiter(languages = ["Javascript"], name= "Felipe") {
  const newMitarbeiter = new Mitarbeiter("", "");
  newMitarbeiter.name = name;
  newMitarbeiter.addLanguages(languages);
  return newMitarbeiter;
}
