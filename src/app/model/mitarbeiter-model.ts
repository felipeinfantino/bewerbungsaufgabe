export class Mitarbeiter{
    name: string;
    avatar_url: string;
    url : string;
    languages = [];

    constructor(avatar_url, url){
      this.avatar_url = avatar_url;
      this.url = url;
    }

    addLanguages(languages : string[]){
        this.languages = [... new Set(languages)];
    }

    setName(name){
        this.name = name;
    }

  }