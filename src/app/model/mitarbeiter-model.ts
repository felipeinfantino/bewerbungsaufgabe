export class Mitarbeiter{
    name: string;
    avatar_url: string;
    url : string;
    languages = []; // [{language: "python", counter: 3}]

    constructor(avatar_url, url){
      this.avatar_url = avatar_url;
      this.url = url;
    }

    addLanguages(languages : string[]){
        for(const language of languages){
            this.addLanguage(language);
        }
        console.log(this.languages);
    }

    private addLanguage(language){
        for(const lan of this.languages){
            if(lan['language'] === language){
                lan['counter']++;
                return;
            }
        }
        this.languages.push({language, counter: 1});
    }

    setName(name){
        this.name = name;
    }

  }