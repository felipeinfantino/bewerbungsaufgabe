import { DataService } from './data.service';
import { createServiceFactory, SpectatorService, mockProvider } from '@ngneat/spectator';
import { HttpClient } from 'selenium-webdriver/http';
import {jsonArray} from '../app/data.service.testData';
import { Mitarbeiter } from './model/mitarbeiter-model';
import { HttpClientModule } from '@angular/common/http';

describe('DataService', () => {
    let dataService : SpectatorService<DataService>;
    const createService = createServiceFactory({
        service: DataService,
        imports: [HttpClientModule],
        providers: [mockProvider(HttpClient)]
    });

    beforeEach(() => dataService = createService( ));

    it("createMitarbeiter should create an array of Mitarbeiter out of an JSON array ", () => {
        const array = jsonArray;
        const mitarbeiterArray = dataService.service.createMitarbeiter(array);
        // manually created
        const mitarbeiter1 = new Mitarbeiter("https://avatars3.githubusercontent.com/u/5487722?v=4", "https://api.github.com/users/0x4a616e", "0x4a616e");
        const mitarbeiter2 = new Mitarbeiter("https://avatars1.githubusercontent.com/u/1949686?v=4", "https://api.github.com/users/arnehilmann", "arnehilmann");
        expect(mitarbeiterArray).toEqual([mitarbeiter1, mitarbeiter2]);
    })
    it("addName should append the name to every Mitarbeiter", async () => {
        const array = jsonArray;
        let mitarbeiterArray = dataService.service.createMitarbeiter(array);
        const getNameSpy = spyOn<any>(dataService.service, 'getName');
        getNameSpy.and.returnValue(new Promise((res, rej) => res({name:"mockedName"})));
        // wir checken dass alle mitarbeiter kein Name haben
        for(const mitarbeiter of mitarbeiterArray){
            expect(mitarbeiter.name).toBeFalsy();
        }
        mitarbeiterArray = await dataService.service.addName(mitarbeiterArray);
        for(const mitarbeiter of mitarbeiterArray){
            expect(mitarbeiter.name).toEqual("mockedName");
        }
    })
    it("addLanguages should append the languages and counters to every Mitarbeiter", async () => {
        const array = jsonArray;
        let mitarbeiterArray = dataService.service.createMitarbeiter(array);
        const getNameSpy = spyOn<any>(dataService.service, 'getRepos');
        getNameSpy.and.returnValue(new Promise((res, rej) => res([{language: "Java"}, {language: "Java"}, {language: "Python"}])));
        // wir checken dass alle mitarbeiter empty language array haben
        for(const mitarbeiter of mitarbeiterArray){
            expect(mitarbeiter.languages.length).toEqual(0);
        }
        mitarbeiterArray = await dataService.service.addLanguages(mitarbeiterArray);
        for(const mitarbeiter of mitarbeiterArray){
            expect(mitarbeiter.languages).toEqual([{language: "Java", counter: 2}, {language: "Python", counter: 1}]);
        }
    })

});
